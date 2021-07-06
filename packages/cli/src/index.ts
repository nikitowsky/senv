#!/usr/bin/env node

import yargs from 'yargs';

import { init, edit, view, load } from './commands';

yargs.scriptName('senv').command(
  'init',
  'Initialize environment variables',
  (yargs) => {
    yargs.option('environment', {
      type: 'string',
      describe: 'Environment',
      default: '',
    });
  },
  (argv) => {
    init(argv.environment as string);
  },
);

yargs.scriptName('senv').command(
  'edit [options]',
  'Edit environment variables',
  (yargs) => {
    yargs.option('environment', {
      type: 'string',
      describe: 'Environment',
      default: '',
    });

    yargs.option('editor', {
      alias: 'e',
      default: 'vi',
      describe: 'Terminal editor',
    });
  },
  (argv) => {
    edit(argv.environment as string, argv.editor as string);
  },
);

yargs.scriptName('senv').command(
  'view',
  'View environment variables',
  (yargs) => {
    yargs.option('environment', {
      type: 'string',
      describe: 'Environment',
      default: '',
    });
  },
  (argv) => {
    view(argv.environment as string);
  },
);

yargs.scriptName('senv').command(
  'load',
  'Load environment variables',
  (yargs) => {
    yargs.option('environment', {
      type: 'string',
      describe: 'Environment',
    });
  },
  (argv) => {
    const [, ...postCommands] = argv._;

    load(argv.environment as string, postCommands);
  },
);

yargs.help().argv;
