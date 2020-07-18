module.exports = {
  plugins: [
    'no-only-tests',
  ],
  env: {
    browser: true,
    commonjs: true,
    es2020: true,
    jest: true,
  },
  extends: [
    'standard',
  ],
  parserOptions: {
    ecmaVersion: 11,
  },
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    'no-only-tests/no-only-tests': 'error',
  },
}
