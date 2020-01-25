import crypto from 'crypto';

/**
 * Returns master key as string
 */
export const generateEncryptionKey = () => {
  const INITIALIZATION_VECTOR = crypto.randomBytes(8).toString('hex');

  // Actually, we concat randomly generated key with randomly generated IV,
  // so we can use 1 key for encryption and decryption
  return crypto
    .randomBytes(16)
    .toString('hex')
    .concat(INITIALIZATION_VECTOR);
};
