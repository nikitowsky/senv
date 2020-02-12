import {
  generateEncryptionKey,
  parseMasterkey,
  encrypt,
  decrypt,
} from '../src';

let key: string;

const mockedVariables = {
  FOO: 'bar',
};

let encryptedMockedVariables: string;

it('Generated public key should generate key with length of 48', () => {
  key = generateEncryptionKey();

  expect(key).toBeDefined();
  expect(key).not.toBeNull();
  expect(key.length).toBe(48);
});

it('Parsed key should return 2 keys (actual encryption key and initialization vector)', () => {
  const { encryptionKey, initializationVector } = parseMasterkey(key);

  expect(encryptionKey).toBeDefined();
  expect(encryptionKey).not.toBeNull();
  expect(encryptionKey.length).toBe(32);

  expect(initializationVector).toBeDefined();
  expect(initializationVector).not.toBeNull();
  expect(initializationVector.length).toBe(16);
});

it('Encryption should works', () => {
  const stringifiedMockedVariables = JSON.stringify(mockedVariables);
  encryptedMockedVariables = encrypt(stringifiedMockedVariables, key);

  expect(encryptedMockedVariables).toBeDefined();
  expect(encryptedMockedVariables).not.toBeNull();
  expect(encryptedMockedVariables.length).not.toBe(0);
  expect(encryptedMockedVariables).not.toBe(stringifiedMockedVariables);
});

it('Decryption should works', () => {
  const stringifiedMockedVariables = JSON.stringify(mockedVariables);
  const decryptedMockedVariables = decrypt(encryptedMockedVariables, key);

  expect(decryptedMockedVariables).toBeDefined();
  expect(decryptedMockedVariables).not.toBeNull();
  expect(decryptedMockedVariables.length).toBe(
    stringifiedMockedVariables.length,
  );
  expect(decryptedMockedVariables).toBe(stringifiedMockedVariables);
});
