import fs from 'fs';
import commander from 'commander';
import execa from 'execa';
import { encrypt, decrypt } from '@envc/core';

import { isFileNameValid, withExtension } from '../utils';

const generateTemporaryFileName = withExtension('.tmp');
const generateEncryptedFileName = withExtension('.enc');

const availableEditors = ['vi', 'vim', 'nvim', 'nano', 'emacs'];

export const edit = async (command: commander.Command) => {
  try {
    isFileNameValid(command.file);
  } catch (error) {
    console.error(error.message);

    return;
  }

  // Available editors are stricted, because we need editor events such as
  // 'close' or 'exit'
  if (!availableEditors.includes(command.editor)) {
    const options = availableEditors.join(', ');

    // TODO: Highlight options
    console.error(
      `Unavailable editor, please use one of these options: ${options}.`,
    );

    return;
  }

  const originalFileName = command.file;
  const encryptedFileName = generateEncryptedFileName(originalFileName);
  const temporaryFileName = generateTemporaryFileName(originalFileName);

  const isEncryptedFileExists = fs.existsSync(encryptedFileName);
  let isTemporaryFileExists = fs.existsSync(temporaryFileName);

  // FIXME: Pass key from master.key file or similar
  const __HARDCODED_PUBLIC_KEY__ =
    'b2b4a5a55e0cf396d905446fc422f5f6baca600b7b854e53';

  // If there is an original file, we attempt to decrypt it and save
  // to temporary file to edit it.
  if (isEncryptedFileExists) {
    const encryptedFile = fs.readFileSync(encryptedFileName, 'utf8');
    const decryptedData = decrypt(encryptedFile, __HARDCODED_PUBLIC_KEY__);

    fs.writeFileSync(temporaryFileName, decryptedData);
    console.log(`... Temporary created ${temporaryFileName}`);

    isTemporaryFileExists = fs.existsSync(temporaryFileName);
  }

  try {
    const editor = execa(command.editor, [temporaryFileName], {
      stdio: 'inherit',
    });

    editor.on('close', () => {
      isTemporaryFileExists = fs.existsSync(temporaryFileName);

      if (isTemporaryFileExists) {
        const temporaryFile = fs.readFileSync(temporaryFileName, 'utf8');

        const encryptedData = encrypt(temporaryFile, __HARDCODED_PUBLIC_KEY__);

        fs.writeFileSync(encryptedFileName, encryptedData);
        console.log(`... Saved as ${encryptedFileName}`);

        fs.unlinkSync(temporaryFileName);
        console.log(`... File ${temporaryFileName} deleted`);
        console.log(`File ${encryptedFileName} successfully updated`);

        return;
      } else {
        // For cases when we didn't saved our file at initial creation
        console.error(`You didn't saved ${temporaryFileName} file`);

        return;
      }
    });
  } catch (error) {
    console.error(error.message);
  }
};
