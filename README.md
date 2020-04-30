# SENV

[WIP] Encrypted environment variables for Node.js done right.

**TODO: Add better documentation.**

## Available commands

> **Note**: `default` environment name will be resolved as unnamed environment, for example `senv init default` will generate `.env.enc` file, while `senv init production` will generate `.env.production.enc` file.

| Command     | Arguments                         | Description                                                                                        |
| ----------- | --------------------------------- | -------------------------------------------------------------------------------------------------- |
| `senv init` | `<environment>`                   | Initialize environment variables <br /> using pattern `.env.<environment>.enc`.                    |
| `senv edit` | `<environment> --editor [editor]` | Start editing your environment variables <br /> in selected `[editor]` (by default – `vi`).        |
| `senv load` | `<environment> [command]`         | Loads environment variables into `process.env`. <br /> Example: `senv load production yarn build`. |
| `senv view` | `<environment>`                   | Prints your decrypted environment variables in console.                                            |
