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
  .command('edit')
  .option('-e --editor <editor>', 'Editor', 'vi')
  .option('-f, --file <file>', 'File to open', '.env')
  .description('Edit environment variables')
  .action(edit);

commander.parse(process.argv);
