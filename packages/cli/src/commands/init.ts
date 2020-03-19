import fs from 'fs';
import { generateEncryptionKey } from '@senv/core';

import { MASTER_KEY_NAME } from '../config';
import { withPrefix } from '../utils';

export const init = (environment = '') => {
  const publicKey = generateEncryptionKey();

  const withEnvironmentPrefix = withPrefix(environment);
  const masterKeyFileName = withEnvironmentPrefix(MASTER_KEY_NAME);

  const isMasterKeyFileExists = fs.existsSync(masterKeyFileName);

  if (isMasterKeyFileExists) {
    console.warn(`File ${masterKeyFileName} already exists.`);

    return;
  }

  try {
    fs.writeFileSync(masterKeyFileName, publicKey);
    console.log(`Public key ${masterKeyFileName} successfully generated!`);
  } catch (e) {
    console.error(`Cannot save ${masterKeyFileName}, something went wrong.`);
  }
};
