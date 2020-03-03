import { generateEncryptionKey } from '@senv/core';

export const init = () => {
  const publicKey = generateEncryptionKey();

  console.info(publicKey);
};
