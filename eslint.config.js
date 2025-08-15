import js from '@eslint/js'
import globals from 'globals'
import prettier from 'eslint-plugin-prettier'
import eslintConfigPrettier from 'eslint-config-prettier'
import nPlugin from 'eslint-plugin-n'
import security from 'eslint-plugin-security'
import importPlugin from 'eslint-plugin-import'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      globals: globals.node
    },
    plugins: {
      prettier,
      n: nPlugin,
      security,
      import: importPlugin
    },
    rules: {
      ...js.configs.recommended.rules,
      ...nPlugin.configs['recommended-module'].rules,
      ...security.configs.recommended.rules,
      ...eslintConfigPrettier.rules,
      'prettier/prettier': 'error',
      'n/no-missing-require': 'error',
      'n/no-unpublished-require': 'off',
      'n/no-extraneous-require': 'error',
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'import/order': [
        'warn',
        {
          groups: [
            ['builtin', 'external'],
            ['internal'],
            ['parent', 'sibling', 'index']
          ],
          'newlines-between': 'always'
        }
      ]
    }
  }
])
