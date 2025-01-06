import globals from 'globals'
import stylisticJs from '@stylistic/eslint-plugin-js'
import pluginJs from '@eslint/js'


/** @type {import('eslint').Linter.Config[]} */
export default [
    {
        files: ['**/*.js'],
        languageOptions: {
            sourceType: 'commonjs'
        }
    },
    {
        languageOptions: {
            globals: {
                ...globals.node
            },
            ecmaVersion: 'latest'
        },
        plugins: {
            '@stylistic/js': stylisticJs
        },
        rules: {
            '@stylistic/js/indent': [
                'error',
                4
            ],
            '@stylistic/js/linebreak-style': [
                'error',
                'unix'
            ],
            '@stylistic/js/quotes': [
                'error',
                'single'
            ],
            '@stylistic/js/semi': [
                'error',
                'never'
            ],
            'eqeqeq': 'error',
            'no-trailing-spaces': 'error',
            'object-curly-spacing': [
                'error', 'always'
            ],
            'arrow-spacing': [
                'error', { 'before': true, 'after': true },
            ],
            'no-console': 'off',
        },
    },
    {
        ignores: ['dist/**', 'build/**']
    }
]