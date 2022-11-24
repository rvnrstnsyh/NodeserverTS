module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    parseOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    rules: {},
};
