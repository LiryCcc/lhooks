import cspellESLintPluginRecommended from '@cspell/eslint-plugin/recommended';
import globals from 'globals';
import tseslint, { type ConfigArray } from 'typescript-eslint';

const eslintConfig: ConfigArray = tseslint.config([
  cspellESLintPluginRecommended,
  { ignores: ['**/node_modules/**', '**/dist/**', '.pnpm-store'] },
  { files: ['src/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.browser } },
  ...tseslint.configs.recommended,
  {
    rules: {
      '@cspell/spellchecker': [
        'error',
        {
          configFile: new URL('./cspell.config.js', import.meta.url).toString()
        }
      ]
    }
  }
]);

export default eslintConfig;
