import { generateEncryptionKey } from '@envc/core';

export const init = () => {
  const publicKey = generateEncryptionKey();

  console.info(publicKey);
};
