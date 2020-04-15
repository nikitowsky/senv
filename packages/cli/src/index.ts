#!/usr/bin/env node

import yargs from 'yargs';

import { init, edit, view, load } from './commands';

yargs.scriptName('senv').command(
  'init <environment>',
  'Initialize environment variables',
  (yargs) => {
    yargs.positional('environment', {
      type: 'string',
      describe: 'Environment',
    });
  },
  (argv) => {
    init(argv.environment as string);
  },
);

yargs.scriptName('senv').command(
  'edit <environment> [options]',
  'Edit environment variables',
  (yargs) => {
    yargs.positional('environment', {
      type: 'string',
      describe: 'Environment',
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
  'view <environment>',
  'View environment variables',
  (yargs) => {
    yargs.positional('environment', {
      type: 'string',
      describe: 'Environment',
    });
  },
  (argv) => {
    view(argv.environment as string);
  },
);

yargs.scriptName('senv').command(
  'load <environment>',
  'Load environment variables',
  (yargs) => {
    yargs.positional('environment', {
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
