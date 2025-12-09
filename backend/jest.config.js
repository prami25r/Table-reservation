const { createDefaultPreset } = require("ts-jest");

const preset = createDefaultPreset();

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.(ts|js)$": "ts-jest"
  },
  moduleFileExtensions: ["ts", "js"],
  testMatch: ["**/*.test.ts", "**/*.test.js"],
  clearMocks: true,
  coveragePathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/prisma/"],
  coverageDirectory: "coverage",
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.ts"],
  globals: {
    "ts-jest": {
      isolatedModules: true
    }
  }
};
