//https://jestjs.io/docs/configuration#coveragedirectory-string
module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    '!**/*.d.ts',
    '!**/node_modules/**',
    'src/**/*.{js,jsx,ts,tsx}',
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  //TODO: alias 패턴 수정 필요
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};
