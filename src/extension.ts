import * as vscode from 'vscode';
import { LanguageClient, LanguageClientOptions } from 'vscode-languageclient/node';
import * as prettierHelper from './prettierjs';
import { ESLint } from 'eslint';
import { getFullRange } from './utils';

import * as fs from 'fs';

export function activate(context: vscode.ExtensionContext) {
  const statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 0);
  statusBar.text = 'Prettier-ESLint v2';
  statusBar.tooltip = 'Prettier + ESLint Combined';
  statusBar.command = 'prettier-eslint-revamp.show-output';
  statusBar.show();

  const output = vscode.window.createOutputChannel('Prettier-ESLint Revamped');

  const { languageSelector, rangeLanguageSelector } = prettierHelper.getSelectors();

  const command = vscode.commands.registerCommand('prettier-eslint-revamp.show-output', () => {
    output.show();
  });

  context.subscriptions.push(command);

  vscode.languages.registerDocumentFormattingEditProvider(languageSelector, {
    async provideDocumentFormattingEdits(document: vscode.TextDocument): Promise<vscode.TextEdit[]> {
      const initText: string = document.getText();
      const fullRange: vscode.Range = getFullRange(document);

      const prettierText: string = await prettierHelper.format(initText, document);

      console.log('Test13');
      try {
        __dirname = '/home/john/data/sls/efiato-consumer/proj/node_modules/eslint/lib/eslint/';
        process.chdir('/home/john/data/sls/efiato-consumer/proj/node_modules/eslint/lib/');
        const eslint = new ESLint({
          cwd: document.uri.fsPath,
          fix: true
        });
        console.log(await eslint.lintText(prettierText, {filePath: document.uri.fsPath}));
      }
      catch (e: any) {
        console.log(e);
      }
      console.log('Passed');

      // const eslintText = await eslint.lintText(prettierText);
      // console.log(eslintText);

      const finalText = prettierText;

      return [vscode.TextEdit.replace(fullRange, finalText)]; // Replace entire document with the formatted items
    }
  });
}

// this method is called when your extension is deactivated
export function deactivate() {}
