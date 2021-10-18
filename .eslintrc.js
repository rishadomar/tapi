module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ['eslint:recommended', 'plugin:react/recommended', 'prettier'],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: ['react', 'prettier'],
    globals: {
        process: true,
    },
    rules: {
        'react/prop-types': 0,
        'linebreak-style': ['error', 'unix'],
        'arrow-body-style': 'off',
        'prefer-arrow-callback': 'off',
    },
};
