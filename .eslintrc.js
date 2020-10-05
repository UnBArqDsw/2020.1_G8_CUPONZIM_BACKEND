module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    es2021: true,
    jest: true
  },
  plugins: ['@typscript-eslint'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'standard'
  ],
  // eslint-disable-next-line no-dupe-keys
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  // eslint-disable-next-line no-dupe-keys
  plugins: [
    '@typescript-eslint'
  ],
  rules: {
  }
}
