import * as os from 'os';
import * as path from 'path';
import * as vscode from 'vscode';

export const getFullRange = (document: vscode.TextDocument): vscode.Range => {
  const firstLine = document.lineAt(0);
  const lastLine = document.lineAt(document.lineCount - 1);

  return new vscode.Range(firstLine.range.start, lastLine.range.end);
};

export const getWorkspaceRelativePath = (
  filePath: string,
  pathToResolve: string
) => {
  // In case the user wants to use ~/.prettierrc on Mac
  if (
    process.platform === "darwin" &&
    pathToResolve.indexOf("~") === 0 &&
    os.homedir()
  ) {
    return pathToResolve.replace(/^~(?=$|\/|\\)/, os.homedir());
  }

  if (vscode.workspace.workspaceFolders) {
    const folder = vscode.workspace.getWorkspaceFolder(vscode.Uri.file(filePath));
    return folder
      ? path.isAbsolute(pathToResolve)
        ? pathToResolve
        : path.join(folder.uri.fsPath, pathToResolve)
      : undefined;
  }
};