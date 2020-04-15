import { DOTENV_KEY_VALUE_PAIR_REGEXP } from '../config';

export type KeyValueTuple = [string, string];

/**
 * Parses and returns tuple of parsed key and value
 *
 * @param pair .env-like key-value pair (example: `NODE_ENV=production`)
 */
export const parseKeyValuePair = (pair: string): KeyValueTuple => {
  const match = pair.match(DOTENV_KEY_VALUE_PAIR_REGEXP);

  if (match) {
    const key = match[1];
    const value = match[2];

    return [key, value];
  }

  return null;
};
