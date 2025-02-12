module.sports = [
  {
    parser: "@babel/eslint-parser",
    parserOptions: {
      sourceType: "module",
      requireConfigFile: false,
      ecmaVersion: "latest",
    },
    rules: {
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    },
    env: {
      node: true,
      mocha: true,
      es2022: true,
    },
    globals: {
      assert: "readonly",
      artifacts: "readonly",
      contract: "readonly",
      step: "readonly",
      web3: "readonly",
    },
  },
];
