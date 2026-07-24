const path = require('path');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.test.{ts,tsx}', '**/*.test.{ts,tsx}'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'mjs', 'json'],
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.test.json',
      },
    ],
    '^.+\\.m?js$': [
      'babel-jest',
      {
        configFile: path.join(__dirname, 'babel.jest.config.cjs'),
      },
    ],
  },
  // react-ui-animate ships ESM-only (no `require` export condition), so it
  // needs to be transformed to CJS for Jest same as our own TS sources.
  transformIgnorePatterns: ['/node_modules/(?!react-ui-animate/)'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    '\\.module\\.css$': 'identity-obj-proxy',
    '\\.css$': 'identity-obj-proxy',
    // react-ui-animate's package.json only declares an "import" export
    // condition, which Jest's CJS resolver can't match at all (it isn't a
    // transform problem, resolution fails before a transform ever runs).
    // Point directly at the compiled ESM file so babel-jest below can pick
    // it up and convert it to CJS like any other node_modules ESM package.
    '^react-ui-animate$': '<rootDir>/node_modules/react-ui-animate/dist/index.mjs',
    // react-ui-animate is symlinked in via `npm link` for local development
    // against an unpublished fix, and its own nested node_modules/react
    // (installed for its own build/tests) would otherwise get resolved
    // instead of this project's copy, causing a dual-React "Invalid hook
    // call" error. Force every import of react/react-dom to this project's
    // single copy regardless of which directory required it from.
    '^react$': path.join(__dirname, 'node_modules/react'),
    '^react-dom$': path.join(__dirname, 'node_modules/react-dom'),
    '^react/jsx-runtime$': path.join(__dirname, 'node_modules/react/jsx-runtime'),
    '^react/jsx-dev-runtime$': path.join(__dirname, 'node_modules/react/jsx-dev-runtime'),
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/__tests__/**',
    '!src/**/*.test.{ts,tsx}',
  ],
  coverageDirectory: 'coverage',
  testTimeout: 10000,
};
