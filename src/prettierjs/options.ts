
export const getPrettierOptions = (
  fileName: string,
  parser: any,
  vsCodeConfig: any,
  configOptions: any,
  extentionFormattingOptions: any
) => {
  const fallbackToVSCodeConfig = configOptions === null;

  const vsOpts: Record<string, string> = {};
  if (fallbackToVSCodeConfig) {
    vsOpts.arrowParens = vsCodeConfig.arrowParens;
    vsOpts.bracketSpacing = vsCodeConfig.bracketSpacing;
    vsOpts.endOfLine = vsCodeConfig.endOfLine;
    vsOpts.htmlWhitespaceSensitivity = vsCodeConfig.htmlWhitespaceSensitivity;
    vsOpts.insertPragma = vsCodeConfig.insertPragma;
    vsOpts.jsxBracketSameLine = vsCodeConfig.jsxBracketSameLine;
    vsOpts.jsxSingleQuote = vsCodeConfig.jsxSingleQuote;
    vsOpts.printWidth = vsCodeConfig.printWidth;
    vsOpts.proseWrap = vsCodeConfig.proseWrap;
    vsOpts.quoteProps = vsCodeConfig.quoteProps;
    vsOpts.requirePragma = vsCodeConfig.requirePragma;
    vsOpts.semi = vsCodeConfig.semi;
    vsOpts.singleQuote = vsCodeConfig.singleQuote;
    vsOpts.tabWidth = vsCodeConfig.tabWidth;
    vsOpts.trailingComma = vsCodeConfig.trailingComma;
    vsOpts.useTabs = vsCodeConfig.useTabs;
    vsOpts.vueIndentScriptAndStyle = vsCodeConfig.vueIndentScriptAndStyle;
  }

  let rangeFormattingOptions;
  if (
    extentionFormattingOptions.rangeEnd &&
    extentionFormattingOptions.rangeStart
  ) {
    rangeFormattingOptions = {
      rangeEnd: extentionFormattingOptions.rangeEnd,
      rangeStart: extentionFormattingOptions.rangeStart,
    };
  }

  const options = {
    ...(fallbackToVSCodeConfig ? vsOpts : {}),
    ...{
      /* cspell: disable-next-line */
      filepath: fileName,
      parser: parser,
    },
    ...(rangeFormattingOptions || {}),
    ...(configOptions || {}),
  };

  if (extentionFormattingOptions.force && options.requirePragma === true) {
    options.requirePragma = false;
  }

  return options;
};