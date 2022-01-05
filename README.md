# SENV

[WIP] Encrypted environment variables for Node.js done with focus on DX.

**TODO: Add better documentation.**

## Available commands

> **Note**: `default` environment name will be resolved as unnamed environment, for example `senv init default` will generate `.env.enc` file, while `senv init production` will generate `.env.production.enc` file.

| Command     | Available options                 | Description                                                                                                                                 |
| ----------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `senv init` | `--environment `                  | Initialize environment variables.                                                                                                           |
| `senv edit` | `--environment` <br /> `--editor` | Edit environment variables.                                                                                                                 |
| `senv load` | `--environment`                   | Load environment variables into `process.env` and executes passing script. <br /> Example: `senv load --environment production yarn build`. |
| `senv view` | `--environment`                   | Prints your decrypted environment variables in console.                                                                                     |
