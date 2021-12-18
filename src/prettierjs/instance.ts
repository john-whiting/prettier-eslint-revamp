import * as prettierStandalone from 'prettier/standalone';

import * as angularPlugin from 'prettier/parser-angular';
import * as babelPlugin from 'prettier/parser-babel';
import * as glimmerPlugin from 'prettier/parser-glimmer';
import * as graphqlPlugin from 'prettier/parser-graphql';
import * as htmlPlugin from 'prettier/parser-html';
import * as markdownPlugin from 'prettier/parser-markdown';
import * as meriyahPlugin from 'prettier/parser-meriyah';
import * as typescriptPlugin from 'prettier/parser-typescript';
import * as yamlPlugin from 'prettier/parser-yaml';

const plugins = [
  angularPlugin,
  babelPlugin,
  glimmerPlugin,
  graphqlPlugin,
  htmlPlugin,
  markdownPlugin,
  meriyahPlugin,
  typescriptPlugin,
  yamlPlugin,
];

export const prettierInstance = {
  format: (source: string, options: any) =>
    prettierStandalone.format(source, { ...options, plugins }),
  languages: [
    {
      vscodeLanguageIds: ['javascript', 'mongo', 'javascriptreact'],
      extensions: [],
      parsers: [
        'babel',
        'espree',
        'meriyah',
        'babel-flow',
        'babel-ts',
        'flow',
        'typescript',
      ],
    },
    {
      vscodeLanguageIds: ['typescript'],
      extensions: [],
      parsers: ['typescript', 'babel-ts'],
    },
    {
      vscodeLanguageIds: ['typescriptreact'],
      extensions: [],
      parsers: ['typescript', 'babel-ts'],
    },
    {
      vscodeLanguageIds: ['json'],
      extensions: [],
      parsers: ['json-stringify'],
    },
    {
      vscodeLanguageIds: ['json'],
      extensions: [],
      parsers: ['json'],
    },
    {
      vscodeLanguageIds: ['jsonc'],
      parsers: ['json'],
    },
    {
      vscodeLanguageIds: ['json5'],
      extensions: [],
      parsers: ['json5'],
    },
    {
      vscodeLanguageIds: ['handlebars'],
      extensions: [],
      parsers: ['glimmer'],
    },
    {
      vscodeLanguageIds: ['graphql'],
      extensions: [],
      parsers: ['graphql'],
    },
    {
      vscodeLanguageIds: ['markdown'],
      parsers: ['markdown'],
    },
    {
      vscodeLanguageIds: ['mdx'],
      extensions: [],
      parsers: ['mdx'],
    },
    {
      vscodeLanguageIds: ['html'],
      extensions: [],
      parsers: ['angular'],
    },
    {
      vscodeLanguageIds: ['html'],
      extensions: [],
      parsers: ['html'],
    },
    {
      vscodeLanguageIds: ['html'],
      extensions: [],
      parsers: ['lwc'],
    },
    {
      vscodeLanguageIds: ['vue'],
      extensions: [],
      parsers: ['vue'],
    },
    {
      vscodeLanguageIds: ['yaml', 'ansible', 'home-assistant'],
      extensions: [],
      parsers: ['yaml'],
    },
  ],
  getFileInfo: async (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    filePath: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    options?: any
  ) => {
    return { ignored: false, inferredParser: null };
  },
};