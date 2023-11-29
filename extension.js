// 	The MIT License(MIT)
// Copyright(c), Tobey Peters, https://github.com/tobeypeters
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software
// and associated documentation files (the "Software"), to deal in the Software without restriction,
// including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
// and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
// IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
// WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
// SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

// Description:
// 	Template:  Code for a Lit element

const vscode = require('vscode');

function activate(context) {
  // Register the command to generate Lit element
  let disposable = vscode.commands.registerCommand('extension.generateLitElement', () => {
    // Get the active text editor
    const editor = vscode.window.activeTextEditor;

    if (editor) {
      // Get the current file name without extension
      const fileNameWithoutExtension = vscode.window.activeTextEditor.document.fileName.replace(/^.*[\\\/]/, '').replace(/\.[^/.]+$/, '');

      // Generated Lit element code with dynamic class name
      const litElementCode = `import { LitElement, html, css } from 'lit';

class ${capitalizeFirstLetter(fileNameWithoutExtension)} extends LitElement {

    static styles = css\`
      /* Add your styles here */
    \`;

    render() {
        return html\`
          /* Your content here */
        \`;
    }
}

customElements.define('${toKebabCase(fileNameWithoutExtension)}', ${capitalizeFirstLetter(fileNameWithoutExtension)});`;

      // Remove leading tabs or spaces from the first and second lines
      const trimmedLitElementCode = litElementCode.replace(/^(?:\t| {2})/gm, '');

      // Insert the code into the editor
      editor.edit(editBuilder => {
        const currentPosition = editor.selection.active;
        editBuilder.insert(currentPosition, trimmedLitElementCode);
      });

      // Move the cursor to the beginning of the document
      const newPosition = new vscode.Position(0, 0);
      editor.selection = new vscode.Selection(newPosition, newPosition);
    }
  });

  // Register the command for disposal
  context.subscriptions.push(disposable);
}

// Deactivate function (optional)
function deactivate() {}

// Helper function to capitalize the first letter
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Helper function to convert string to kebab case
function toKebabCase(str) {
  return str.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`);
}

module.exports = {
  activate,
  deactivate
};