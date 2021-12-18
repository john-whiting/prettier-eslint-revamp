import * as vscode from 'vscode';

import { prettierInstance } from './instance';
import { getConfig, getResolvedConfig } from './config';
import { getParserFromLanguageId } from './parser';
import { getPrettierOptions } from './options';

export const format = async(text: string, document: vscode.TextDocument) => {
  const { fileName, uri, languageId } = document;

  const vscodeConfig = getConfig(uri);
  const resolvedConfig = await getResolvedConfig(document, vscodeConfig);
  const options = {};

  let parser;
  if (languageId !== 'plaintext') {
    const languages = prettierInstance.languages;
    parser = getParserFromLanguageId(languages, uri, languageId);
  }

  const prettierOptions = getPrettierOptions(
    fileName,
    parser,
    vscodeConfig,
    resolvedConfig,
    options
  );

  try {
    const formattedText = prettierInstance.format(text, prettierOptions);
    return formattedText;
  } catch (error) {
    vscode.window.showErrorMessage('[Prettier-ESLint] Prettier ran into some difficulties.');
    return text;
  }
};