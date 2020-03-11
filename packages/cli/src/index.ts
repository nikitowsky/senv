#!/usr/bin/env node

import commander from 'commander';

import { init, edit } from './commands';

const packageJson = require('../package.json') as { [key: string]: any };
commander.version(packageJson.version);

commander
  .command('init')
  .description('Init environment variables')
  .action(init);

commander
  .command('edit [environment]')
  .option('-e --editor <editor>', 'Editor', 'vim')
  .description('Edit environment variables')
  .action(edit);

commander.parse(process.argv);
