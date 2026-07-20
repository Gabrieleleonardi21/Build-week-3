import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

// Configurazione ESLint (flat config) per progetto React + Vite in JavaScript.
export default defineConfig([
  // Ignora l'output di build
  globalIgnores(['dist']),
  {
    // Applica le regole a tutti i file JS/JSX
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended, // regole base consigliate di ESLint
      reactHooks.configs.flat['recommended-latest'], // regole degli Hooks (ex react/rules-of-hooks)
      reactRefresh.configs.vite, // compatibilità Fast Refresh (ex react/only-export-components)
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser, // variabili globali del browser (window, document, ...)
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true }, // abilita la sintassi JSX
        sourceType: 'module',
      },
    },
    rules: {
      // Segnala variabili non usate, ma ignora quelle in MAIUSCOLO/underscore (costanti/export)
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
])
