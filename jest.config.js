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
    // support babel-jest. TSDX defaults to just ts-jest. see https://github.com/jaredpalmer/tsdx/pull/486
    '\\.js$': 'babel-jest',
    '\\.tsx$': 'ts-jest'
  },
  // support JS + JSX. TSDX defaults to just TS + TSX. see https://github.com/jaredpalmer/tsdx/pull/486
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  coveragePathIgnorePatterns: [
    '/node_modules/', // default
    '<rootDir>/test/' // ignore any test helper files
  ]
}
