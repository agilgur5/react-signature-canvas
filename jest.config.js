module.exports = {
  moduleNameMapper: {
    // allow importing of Jest as an ES Module (https://github.com/facebook/jest/pull/7571#issuecomment-498634094)
    '^jest$': '<rootDir>/test/config/jest-export.js'
  },
  setupFilesAfterEnv: [
    // configure enzyme w/ react adapter
    '<rootDir>/test/config/configure-enzyme.js',
    // polyfill window.resizeTo
    '<rootDir>/test/config/window-resizeTo.js'
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
