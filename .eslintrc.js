module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:vue/recommended', // Vue 2 recommended rules
    'eslint:recommended', // Base ESLint rules
    '@vue/prettier' // Integrate Prettier
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
    sourceType: 'module'
  },
  rules: {
    // Example rule overrides
    'vue/multi-word-component-names': 'off', // Allow single-word component names
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
};
