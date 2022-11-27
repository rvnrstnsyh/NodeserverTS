module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
            jsx: false,
        },
    },
    rules: {
        semi: 'error',
    },
};
