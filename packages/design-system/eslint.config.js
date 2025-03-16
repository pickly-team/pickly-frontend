import {FlatCompat} from '@eslint/eslintrc';
import sharedEslintConfig from '@pickly/eslint-config/design';

const compat = new FlatCompat();

export default [
  ...sharedEslintConfig,
  ...compat.config({
    extends: ['plugin:storybook/recommended'],
    ignorePatterns: ['!.storybook'],
  }),
];
