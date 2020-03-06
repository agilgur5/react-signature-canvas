module.exports = {
  // Jest 24 defaults to JSDOM 11, upgrade to 15 to support canvas@2
  testEnvironment: 'jest-environment-jsdom-fifteen',
  setupFilesAfterEnv: [
    // configure enzyme w/ react adapter
    '<rootDir>/test/config/configure-enzyme.js',
    // polyfill window.resizeTo
    'window-resizeto/polyfill'
  ],
  transform: {
    // use babel-jest@23 for babel@6 support (https://github.com/facebook/jest/issues/8230#issuecomment-479470547)
    '\\.js$': require.resolve('babel-jest')
  },
  coveragePathIgnorePatterns: [
    '/node_modules/', // default
    '<rootDir>/test/' // ignore any test helper files
  ]
}
