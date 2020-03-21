#!/usr/bin/env node

import commander from 'commander';

import { init, edit, view } from './commands';

const packageJson = require('../package.json') as { [key: string]: any };
commander.version(packageJson.version);

commander
  .command('init [environment]')
  .description('Init environment variables')
  .action(init);

commander
  .command('edit [environment]')
  .option('-e --editor <editor>', 'Editor', 'vim')
  .description('Edit environment variables')
  .action(edit);

commander
  .command('view [environment]')
  .description('View environment variables decrypted value')
  .action(view);

commander.parse(process.argv);
