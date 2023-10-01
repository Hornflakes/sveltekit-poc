module.exports = {
    root: true,
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:svelte/recommended',
        'prettier',
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2020,
        extraFileExtensions: ['.svelte'],
    },
    env: {
        browser: true,
        es2017: true,
        node: true,
    },
    overrides: [
        {
            files: ['*.svelte'],
            parser: 'svelte-eslint-parser',
            parserOptions: {
                parser: '@typescript-eslint/parser',
            },
        },
    ],
    rules: {
        '@typescript-eslint/no-unused-vars': [
            'warn',
            {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_',
                caughtErrorsIgnorePattern: '^_',
            },
        ],
        // forbid usage of unused variables (marked with an _)
        '@typescript-eslint/naming-convention': [
            'error',
            {
                selector: ['parameter', 'variable'],
                leadingUnderscore: 'forbid',
                filter: {
                    // keep this one open for destructuring
                    regex: '_*',
                    match: false,
                },
                format: null,
            },
            {
                selector: 'parameter',
                leadingUnderscore: 'require',
                format: null,
                modifiers: ['unused'],
            },
        ],
    },
};
