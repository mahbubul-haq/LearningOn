module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  parser: '@typescript-eslint/parser', // Use TS parser
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  settings: { react: { version: 'detect' } },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended', // TS rules
    'plugin:react/jsx-runtime'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  plugins: ['react-refresh', '@typescript-eslint'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'react/prop-types': 'off',        // not needed with TS
    'no-unused-vars': 'off',          // TS will check
    '@typescript-eslint/no-unused-vars': ['warn'] // TS unused vars
  },
  overrides: [
    {
      files: ['*.js', '*.jsx'],       // JS files still linted
      rules: {
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
  ],
};
