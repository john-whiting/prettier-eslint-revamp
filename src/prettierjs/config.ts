import * as vscode from 'vscode';

import * as prettier from 'prettier';

import { getWorkspaceRelativePath } from '../utils';

export const getConfig = (uri?: vscode.Uri) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const config = vscode.workspace.getConfiguration(
    'prettier',
    uri
  );

  // Some settings are disabled for untrusted workspaces
  // because they can be used for bad things.
  if (!vscode.workspace.isTrusted) {
    const newConfig = {
      ...config,
      prettierPath: undefined,
      configPath: undefined,
      ignorePath: '.prettierignore',
      documentSelectors: [],
      useEditorConfig: false,
      withNodeModules: false,
      resolveGlobalModules: false,
    };
    return newConfig;
  }

  return config;
};

export const getResolvedConfig = async (
  { fileName, uri }: vscode.TextDocument,
  vscodeConfig: any
) => {
  const isVirtual = uri.scheme !== 'file';

  let configPath: string | undefined;
  try {
    if (!isVirtual) {
      configPath = (await prettier.resolveConfigFile(fileName)) ?? undefined;
    }
  } catch (error) {
    return 'error';
  }

  const resolveConfigOptions = {
    config: isVirtual
      ? undefined
      : vscodeConfig.configPath
      ? getWorkspaceRelativePath(fileName, vscodeConfig.configPath)
      : configPath,
    editorconfig: isVirtual ? undefined : vscodeConfig.useEditorConfig,
  };

  let resolvedConfig;
  try {
    resolvedConfig = isVirtual
      ? null
      : await prettier.resolveConfig(fileName, resolveConfigOptions);
  } catch (error) {
    return 'error';
  }
  if (resolveConfigOptions.config) {
  }

  if (!isVirtual && !resolvedConfig && vscodeConfig.requireConfig) {
    return 'disabled';
  }
  return resolvedConfig;
};