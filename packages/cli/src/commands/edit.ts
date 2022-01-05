import fs from 'fs';
import execa from 'execa';
import chalk from 'chalk';
import { join } from 'path';
import { tmpdir } from 'os';
import { encrypt, decrypt } from '@senv/core';

import {
  AVAILABLE_EDITORS,
  DOTENV_FILE_PREFIX,
  TEMPORARY_FILE_EXTENSION,
  ENCRYPTED_FILE_EXTENSION,
  MASTER_KEY_NAME,
} from '../config';
import { logger, isFileNameValid, withExtension, withPrefix } from '../utils';

/**
 * @param filename File name.
 * @param content File content as string.
 * @returns Path to temporary file.
 */
const createTemporaryFile = (filename: string, content: string) => {
  const fileName = `${DOTENV_FILE_PREFIX}${filename}${TEMPORARY_FILE_EXTENSION}`;
  const pathToWrite = join(tmpdir(), fileName);

  try {
    fs.writeFileSync(pathToWrite, content);

    return pathToWrite;
  } catch (e) {
    logger.error(e.message);
  }
};

const isFileAccessable = (path: fs.PathLike, mode?: number) => {
  try {
    fs.accessSync(path, mode);

    return true;
  } catch {
    return false;
  }
};

export const edit = async (environment = '', editor: string) => {
  try {
    isFileNameValid(environment);
  } catch (error) {
    logger.error(error.message);

    return;
  }

  // Available editors are stricted, because we need editor events such as
  // 'close' or 'exit'
  if (!AVAILABLE_EDITORS.includes(editor)) {
    const options = AVAILABLE_EDITORS.join(', ');

    logger.error(
      `Unavailable editor, please use one of these options: ${chalk.cyan(
        options,
      )}.`,
    );

    return;
  }

  const fileName = withPrefix(DOTENV_FILE_PREFIX)(environment);
  let temporaryFilePath = null;

  // Look up for master key
  const masterKeyFileName = withPrefix(environment)(MASTER_KEY_NAME);
  const isMasterKeyAccessable = isFileAccessable(
    masterKeyFileName,
    fs.constants.R_OK,
  );

  if (!isMasterKeyAccessable) {
    logger.error(
      `Cannot read file ${chalk.dim(
        masterKeyFileName,
      )}, probably it doesn't exist.`,
    );

    return;
  }

  const encryptedFileName = withExtension(ENCRYPTED_FILE_EXTENSION)(fileName);
  const isEncryptedFileAccessable = isFileAccessable(
    encryptedFileName,
    fs.constants.R_OK | fs.constants.W_OK,
  );

  if (!isEncryptedFileAccessable) {
    logger.error(`Cannot read/write to file ${chalk.dim(encryptedFileName)}`);

    return;
  }

  const publicKey = fs.readFileSync(masterKeyFileName).toString();

  // If there is an original file, we attempt to decrypt it and save
  // to temporary file to edit it.
  const encryptedFileContent = fs.readFileSync(encryptedFileName, 'utf8');

  try {
    const decryptedData = decrypt(encryptedFileContent, publicKey);

    temporaryFilePath = createTemporaryFile(environment, decryptedData);
  } catch (e) {
    logger.error(e.message);

    return;
  }

  try {
    const beforeEditorModifiedTime = fs
      .statSync(temporaryFilePath)
      .mtime.getTime();

    const editorProcess = execa(editor, [temporaryFilePath], {
      stdio: 'inherit',
    });

    editorProcess.on('close', () => {
      const afterEditorModifiedTime = fs
        .statSync(temporaryFilePath)
        .mtime.getTime();

      if (beforeEditorModifiedTime !== afterEditorModifiedTime) {
        const temporaryFileContent = fs.readFileSync(temporaryFilePath, 'utf8');
        const encryptedData = encrypt(temporaryFileContent, publicKey);

        fs.writeFileSync(encryptedFileName, encryptedData);
        fs.unlinkSync(temporaryFilePath);

        logger.success(`File ${chalk.dim(encryptedFileName)} updated.`);
      }

      return;
    });
  } catch (e) {
    logger.error(e.message);
  }
};
