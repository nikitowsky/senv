import fs from 'fs';
import chalk from 'chalk';
import { generateEncryptionKey } from '@senv/core';

import { MASTER_KEY_NAME } from '../config';
import { logger, withPrefix } from '../utils';

export const init = (environment = '') => {
  const publicKey = generateEncryptionKey();

  const withEnvironmentPrefix = withPrefix(environment);
  const masterKeyFileName = withEnvironmentPrefix(MASTER_KEY_NAME);

  const isMasterKeyFileExists = fs.existsSync(masterKeyFileName);

  if (isMasterKeyFileExists) {
    logger.error(`File ${chalk.dim(masterKeyFileName)} already exists.`);

    return;
  }

  try {
    fs.writeFileSync(masterKeyFileName, publicKey);

    logger.success(`Public key ${chalk.dim(masterKeyFileName)} generated.`);
  } catch (e) {
    logger.error(
      `Cannot save ${chalk.dim(masterKeyFileName)}, something went wrong.`,
    );
  }
};
