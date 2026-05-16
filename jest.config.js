export default {
  testEnvironment: "jsdom",
  testMatch: [
    "**/tests/unit/**/*.test.js",
    "**/tests/integration/**/*.test.js",
  ],
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(css|svg)$": "<rootDir>/tests/__mocks__/fileMock.js",
  },
};
