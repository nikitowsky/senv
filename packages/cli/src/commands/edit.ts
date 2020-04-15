import fs from 'fs';
import execa from 'execa';
import { encrypt, decrypt } from '@senv/core';

import {
  AVAILABLE_EDITORS,
  DOTENV_FILE_PREFIX,
  TEMPORARY_FILE_EXTENSION,
  ENCRYPTED_FILE_EXTENSION,
  MASTER_KEY_NAME,
  DEFAULT_ENVIRONMENT_NAME,
  Environment,
} from '../config';
import { isFileNameValid, withExtension, withPrefix } from '../utils';

export const edit = async (environment: Environment, editor: string) => {
  if (environment === DEFAULT_ENVIRONMENT_NAME) {
    environment = '';
  }

  try {
    isFileNameValid(environment);
  } catch (error) {
    console.error(error.message);

    return;
  }

  // Available editors are stricted, because we need editor events such as
  // 'close' or 'exit'
  if (!AVAILABLE_EDITORS.includes(editor)) {
    const options = AVAILABLE_EDITORS.join(', ');

    // TODO: Highlight options
    console.error(
      `Unavailable editor, please use one of these options: ${options}.`,
    );

    return;
  }

  const fileName = withPrefix(DOTENV_FILE_PREFIX)(environment);
  const encryptedFileName = withExtension(ENCRYPTED_FILE_EXTENSION)(fileName);
  const temporaryFileName = withExtension(TEMPORARY_FILE_EXTENSION)(fileName);

  const isEncryptedFileExists = fs.existsSync(encryptedFileName);
  let isTemporaryFileExists = fs.existsSync(temporaryFileName);

  // Look up for master key
  const masterKeyFileName = withPrefix(environment)(MASTER_KEY_NAME);

  let publicKey: string;

  try {
    publicKey = fs.readFileSync(masterKeyFileName).toString();
  } catch {
    console.error(`Master key ${masterKeyFileName} not found.`);

    return;
  }

  // If there is an original file, we attempt to decrypt it and save
  // to temporary file to edit it.
  if (isEncryptedFileExists) {
    const encryptedFile = fs.readFileSync(encryptedFileName, 'utf8');

    try {
      const decryptedData = decrypt(encryptedFile, publicKey);

      fs.writeFileSync(temporaryFileName, decryptedData);
      console.log(`... Temporary created ${temporaryFileName}`);
    } catch (error) {
      console.error(error.message);

      return;
    }

    isTemporaryFileExists = fs.existsSync(temporaryFileName);
  }

  try {
    const editorProcess = execa(editor, [temporaryFileName], {
      stdio: 'inherit',
    });

    editorProcess.on('close', () => {
      isTemporaryFileExists = fs.existsSync(temporaryFileName);

      if (isTemporaryFileExists) {
        const temporaryFile = fs.readFileSync(temporaryFileName, 'utf8');
        const encryptedData = encrypt(temporaryFile, publicKey);

        fs.writeFileSync(encryptedFileName, encryptedData);
        console.log(`... Saved as ${encryptedFileName}.`);

        fs.unlinkSync(temporaryFileName);
        console.log(`... File ${temporaryFileName} deleted.`);
        console.log(`File ${encryptedFileName} successfully updated.`);

        return;
      } else {
        // For cases when we didn't saved our file at initial creation
        console.error(`You didn't saved ${temporaryFileName} file.`);

        return;
      }
    });
  } catch (error) {
    console.error(error.message);
  }
};
