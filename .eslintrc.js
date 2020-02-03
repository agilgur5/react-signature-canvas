module.exports = {
  ignorePatterns: ['dist/'],
  extends: [
    'react-app',
    'standard'
  ],
  rules: {
    'prettier/prettier': 'off' // override tsdx lint
  }
}
