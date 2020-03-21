import fs from 'fs';

import {
  DOTENV_FILE_PREFIX,
  ENCRYPTED_FILE_EXTENSION,
  MASTER_KEY_NAME,
} from '../config';
import { withPrefix, withExtension, isFileNameValid } from '../utils';
import { decrypt } from '@senv/core';

export const view = (environment = ''): string | void => {
  try {
    isFileNameValid(environment);
  } catch (error) {
    console.error(error.message);

    return;
  }

  const fileName = withPrefix(DOTENV_FILE_PREFIX)(environment);
  const encryptedFileName = withExtension(ENCRYPTED_FILE_EXTENSION)(fileName);
  const masterKeyFileName = withPrefix(environment)(MASTER_KEY_NAME);

  const isEncryptedFileExists = fs.existsSync(encryptedFileName);

  if (!isEncryptedFileExists) {
    console.error(`File ${encryptedFileName} was not found.`);

    return;
  }

  try {
    const publicKey = fs.readFileSync(masterKeyFileName).toString();
    const encryptedFile = fs.readFileSync(encryptedFileName).toString();
    const decrypted = decrypt(encryptedFile, publicKey);

    console.log(`Loading ${encryptedFileName}...\n`);

    if (!Boolean(decrypted)) {
      console.info("File exists, but it's empty.");
    } else {
      console.log(decrypted);
    }
  } catch {
    console.error(`Cannot find ${masterKeyFileName} master key`);

    return;
  }
};
