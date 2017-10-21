const {NODE_ENV} = process.env
const TEST_WATCH = NODE_ENV === 'testwatch'

module.exports = {
  silent: false,
  verbose: false,
  automock: false,
  moduleFileExtensions: [
      'ts',
      'tsx',
      'js'
  ],
  "notify": false,
  transform: {
      '.(ts|tsx)': '<rootDir>/node_modules/ts-jest/preprocessor.js'
  },
  testMatch: [
      '**/__tests__/*.(ts|tsx|js)',
      '**/test/**/*.test.(ts|tsx)'
  ],
  "testPathIgnorePatterns": [
    "/node_modules/",
    "/.tmp/"
  ],
  moduleNameMapper: {
      "^@src/(.*)": "<rootDir>/src/$1"
  },
  collectCoverage: true,
  bail: false,
  coverageReporters: [
    ...!TEST_WATCH ? [
      'lcov',
      'text',
      'text-summary',
      'html'
    ] : []
  ],
  cacheDirectory: '.tmp/jest-cache',
  coverageDirectory: '.tmp/reports/coverage',
  coverageThreshold: {
      global: {
          branches: 15,
          functions: 15,
          lines: 15,
          statements: 15
      }
  },
  globals: {
      __DEV__: true
  }
}
