import { prettierInstance } from './instance';
import { getConfig } from './config';

let allLanguages: string[] = [];
let allExtensions: string[] = [];
const allRangeLanguages: string[] = [
  'javascript',
  'javascriptreact',
  'typescript',
  'typescriptreact',
  'json',
  'graphql',
];

export const getSelectors = () => {
  const languages = prettierInstance.languages;

  languages.forEach((lang: any) => {
    if (lang && lang.vscodeLanguageIds) {
      allLanguages.push(...lang.vscodeLanguageIds);
    }
  });
  allLanguages = allLanguages.filter((value, index, self) => {
    return self.indexOf(value) === index;
  });

  languages.forEach((lang) => {
    if (lang && lang.extensions) {
      allExtensions.push(...lang.extensions);
    }
  });
  allExtensions = allExtensions.filter((value, index, self) => {
    return self.indexOf(value) === index;
  });

  const { documentSelectors } = getConfig();

  // Language selector for file extensions
  const extensionLanguageSelector: any = [];

  const customLanguageSelectors: any = [];

  const defaultLanguageSelectors = [
    ...allLanguages.map((language) => ({ language })),
    { language: 'jsonc', scheme: 'vscode-userdata' }, // Selector for VSCode settings.json
  ];

  const languageSelector = [
    ...customLanguageSelectors,
    ...extensionLanguageSelector,
    ...defaultLanguageSelectors,
  ];

  const rangeLanguageSelector = [
    allRangeLanguages.map((language) => ({
      language,
    })),
  ];
  return { languageSelector, rangeLanguageSelector };
};