const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');

module.exports = {
  root: true,
  extends: ['@react-native', eslintPluginPrettierRecommended],
};
