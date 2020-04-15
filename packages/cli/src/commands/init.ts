import fs from 'fs';
import chalk from 'chalk';
import { generateEncryptionKey } from '@senv/core';

import {
  MASTER_KEY_NAME,
  DEFAULT_ENVIRONMENT_NAME,
  Environment,
} from '../config';
import { logger, withPrefix } from '../utils';

export const init = (environment: Environment) => {
  if (environment === DEFAULT_ENVIRONMENT_NAME) {
    environment = '';
  }

  const publicKey = generateEncryptionKey();

  const withEnvironmentPrefix = withPrefix(environment);
  const masterKeyFileName = withEnvironmentPrefix(MASTER_KEY_NAME);

  const isMasterKeyFileExists = fs.existsSync(masterKeyFileName);

  if (isMasterKeyFileExists) {
    logger.warn(`File ${chalk.dim(masterKeyFileName)} already exists.`);

    return;
  }

  try {
    fs.writeFileSync(masterKeyFileName, publicKey);
    logger.success(
      `Public key ${chalk.dim(masterKeyFileName)} successfully generated!`,
    );
  } catch (e) {
    logger.error(
      `Cannot save ${chalk.dim(masterKeyFileName)}, something went wrong.`,
    );
  }
};
