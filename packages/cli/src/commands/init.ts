import fs from 'fs';
import { generateEncryptionKey } from '@senv/core';

import {
  MASTER_KEY_NAME,
  DEFAULT_ENVIRONMENT_NAME,
  Environment,
} from '../config';
import { withPrefix } from '../utils';

export const init = (environment: Environment) => {
  if (environment === DEFAULT_ENVIRONMENT_NAME) {
    environment = '';
  }

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
