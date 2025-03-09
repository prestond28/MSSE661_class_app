/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
const config = {

  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",

  transform: {
    "^.+\.m?[tj]sx?$": "babel-jest", 
  },
  setupFiles: ["jest-localstorage-mock"],

  // The test environment that will be used for testing
  testEnvironment: "node",

  // The glob patterns Jest uses to detect test files
  testMatch: [
    "**/__tests__/**/*.m?[jt]s?(x)",
    "**/?(*.)+(spec|test).m?[tj]s?(x)",
    "**/tests/**"
  ],

};

export default config;
