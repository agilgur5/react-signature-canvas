import type { Config } from '@jest/types'
import { defaults } from 'jest-config'

const config: Config.InitialOptions = {
  injectGlobals: false, // use @jest/globals
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [
    // polyfill window.resizeTo
    'window-resizeto/polyfill'
  ],
  coveragePathIgnorePatterns: [
    ...defaults.coveragePathIgnorePatterns,
    '<rootDir>/test/' // ignore any test helper files
  ]
}

export default config
