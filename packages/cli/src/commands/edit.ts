import commander from 'commander';
import execa from 'execa';

const availableEditors = ['vi', 'vim', 'nvim', 'nano', 'emacs'];

export const edit = (command: commander.Command) => {
  // Available editors are stricted, because we need editor events such as
  // 'close' or 'exit'
  if (!availableEditors.includes(command.editor)) {
    console.log(
      `Unavailable editor, available options: ${availableEditors.join(', ')}.`,
    );

    return;
  }

  try {
    const editor = execa(command.editor, [command.file], { stdio: 'inherit' });

    editor.on('close', () => {
      // TODO: Run encryption when editing ends
    });
  } catch (e) {
    console.error(e);
  }
};
