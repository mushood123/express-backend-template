import importPlugin from 'eslint-plugin-import';
import nPlugin from 'eslint-plugin-n';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import securityPlugin from 'eslint-plugin-security';
import globals from 'globals';

export default [
  // Base configuration for all JavaScript files
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.es2024,
      },
    },
    plugins: {
      import: importPlugin,
      n: nPlugin,
      prettier: prettierPlugin,
      security: securityPlugin,
    },
    rules: {
      // === CORE ESLINT RULES ===
      // Essential error prevention
      'no-console': 'warn',
      'no-debugger': 'error',
      'no-duplicate-imports': 'error',
      'no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      'no-undef': 'error',
      'no-unreachable': 'error',
      'use-isnan': 'error',
      'valid-typeof': 'error',

      // Semicolon enforcement
      semi: ['error', 'always'],

      // Best Practices - relaxed
      'array-callback-return': 'warn',
      'consistent-return': 'warn',
      curly: ['warn', 'all'],
      eqeqeq: ['warn', 'always'],
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-new-func': 'error',
      'no-param-reassign': 'warn',
      'no-return-await': 'warn',
      'no-throw-literal': 'error',
      'prefer-promise-reject-errors': 'warn',
      'require-await': 'warn',

      // Variables
      'no-shadow': 'warn',
      'no-use-before-define': [
        'warn',
        {
          functions: false,
          classes: true,
          variables: true,
        },
      ],

      // Stylistic Issues - only non-formatting rules (Prettier handles formatting)
      camelcase: [
        'warn',
        {
          properties: 'never',
          ignoreDestructuring: true,
          ignoreImports: true,
          ignoreGlobals: true,
        },
      ],
      'max-lines': [
        'warn',
        {
          max: 500,
          skipBlankLines: true,
          skipComments: true,
        },
      ],
      'max-lines-per-function': [
        'warn',
        {
          max: 100,
          skipBlankLines: true,
          skipComments: true,
          IIFEs: true,
        },
      ],
      'max-params': ['warn', 6],
      'max-statements': ['warn', 50],

      // === IMPORT PLUGIN RULES ===
      'import/default': 'error',
      'import/export': 'error',
      'import/extensions': ['warn', 'ignorePackages', { js: 'always', mjs: 'always' }],
      'import/first': 'warn',
      'import/named': 'error',
      'import/no-absolute-path': 'error',
      'import/no-cycle': 'warn',
      'import/no-default-export': 'off',
      'import/no-deprecated': 'warn',
      'import/no-duplicates': 'warn',
      'import/no-dynamic-require': 'warn',
      'import/no-extraneous-dependencies': 'warn',
      'import/no-mutable-exports': 'error',
      'import/no-named-as-default': 'warn',
      'import/no-named-as-default-member': 'warn',
      'import/no-self-import': 'error',
      'import/no-unresolved': 'error',
      'import/no-useless-path-segments': 'warn',

      // === NODE PLUGIN RULES ===
      'n/no-callback-literal': 'error',
      'n/no-deprecated-api': 'warn',
      'n/no-exports-assign': 'error',
      'n/no-extraneous-import': 'warn',
      'n/no-extraneous-require': 'warn',
      'n/no-missing-import': 'error',
      'n/no-missing-require': 'error',
      'n/no-process-exit': 'warn',
      'n/no-unpublished-bin': 'error',
      'n/no-unpublished-import': 'warn',
      'n/no-unpublished-require': 'warn',
      'n/no-unsupported-features/es-builtins': 'error',
      'n/no-unsupported-features/es-syntax': 'error',
      'n/no-unsupported-features/node-builtins': 'error',
      'n/process-exit-as-throw': 'error',
      'n/shebang': 'error',

      // === SECURITY PLUGIN RULES ===
      'security/detect-buffer-noassert': 'error',
      'security/detect-child-process': 'warn',
      'security/detect-disable-mustache-escape': 'error',
      'security/detect-eval-with-expression': 'error',
      'security/detect-no-csrf-before-method-override': 'error',
      'security/detect-non-literal-fs-filename': 'warn',
      'security/detect-non-literal-regexp': 'warn',
      'security/detect-non-literal-require': 'warn',
      'security/detect-object-injection': 'warn',
      'security/detect-possible-timing-attacks': 'warn',
      'security/detect-pseudoRandomBytes': 'error',
      'security/detect-unsafe-regex': 'error',

      // === PRETTIER PLUGIN RULES ===
      'prettier/prettier': 'error',
    },
  },

  // Configuration for test files (if any)
  {
    files: ['**/*.test.js', '**/*.spec.js', '**/tests/**/*.js'],
    rules: {
      'no-magic-numbers': 'off',
      'max-lines-per-function': 'off',
      'max-statements': 'off',
      'no-console': 'off',
    },
  },

  // Configuration for configuration files
  {
    files: ['**/*.config.js', '**/config/**/*.js'],
    rules: {
      'no-magic-numbers': 'off',
      'import/no-default-export': 'off',
      camelcase: 'off',
      'no-console': 'off',
    },
  },

  // Prettier configuration to disable conflicting rules
  prettierConfig,

  // Ignore patterns
  {
    ignores: ['node_modules/**', 'dist/**', 'build/**', 'coverage/**', '*.min.js', 'prisma/migrations/**'],
  },
];
