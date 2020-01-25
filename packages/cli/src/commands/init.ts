import { generateEncryptionKey, encrypt, decrypt } from '@envc/core';

const environmentVariables = {
  NODE_ENV: 'production',
  REACT_APP_ENV: 'stage',
};

export const init = () => {
  const key = generateEncryptionKey();
  const encryptedVariables = encrypt(JSON.stringify(environmentVariables), key);

  console.log(encryptedVariables);
  console.log(decrypt(encryptedVariables, key));
};
