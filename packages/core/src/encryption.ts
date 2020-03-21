import crypto, { Cipher, Decipher } from 'crypto';

import { ENCRYPTION_ALGORITHM, KEY_LENGTH } from './config';

export class InvalidPublicKeyError extends Error {
  constructor() {
    super();

    this.message = 'Invalid public key';
  }
}

/**
 * Split master key into two strings: encryption key and initialization vector
 *
 * @param masterkey Master key
 */
export const parseMasterkey = (masterkey: string) => {
  const encryptionKey = masterkey.slice(0, KEY_LENGTH);
  const initializationVector = masterkey.slice(KEY_LENGTH);

  return { encryptionKey, initializationVector };
};

/**
 * Encrypt input
 *
 * @param string Stringified data
 * @param masterkey Master key
 */
export const encrypt = (string: string, masterkey: string) => {
  const { encryptionKey, initializationVector } = parseMasterkey(masterkey);

  let cipher: Cipher;

  try {
    cipher = crypto.createCipheriv(
      ENCRYPTION_ALGORITHM,
      encryptionKey,
      initializationVector,
    );
  } catch {
    throw new InvalidPublicKeyError();
  }

  const encrypted = cipher
    .update(string, 'utf8', 'base64')
    .concat(cipher.final('base64'));

  return encrypted;
};

/**
 * Decrypt input
 *
 * @param encryptedString Encrypted data as string
 * @param masterkey Master key
 */
export const decrypt = (encryptedString: string, masterkey: string) => {
  const { encryptionKey, initializationVector } = parseMasterkey(masterkey);

  let decipher: Decipher;

  try {
    decipher = crypto.createDecipheriv(
      ENCRYPTION_ALGORITHM,
      encryptionKey,
      initializationVector,
    );
  } catch {
    throw new InvalidPublicKeyError();
  }

  const decrypted = decipher
    .update(encryptedString, 'base64', 'utf8')
    .concat(decipher.final('utf8'));

  return decrypted;
};
