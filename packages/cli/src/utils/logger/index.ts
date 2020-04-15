import chalk from 'chalk';

import { createLogger } from './createLogger';

export const logger = {
  warn: createLogger('warn', chalk.yellow),
  success: createLogger('success', chalk.green),
  info: createLogger('info', chalk.blue),
  error: createLogger('error', chalk.redBright),
};
