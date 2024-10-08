module.exports = {
  printWidth: 80,
  singleQuote: true,
  trailingComma: "none",
  bracketSpacing: true,
  semi: false,
  endOfLine: auto,
  jsxSingleQuote: false,
  overrides: [
    {
      "files": ".prettierrc",
      "options": {
        "parser": "json"
      }
    }
  ]
}