module.exports = {
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    '^buttons/(.*)': '<rootDir>/src/scripts/buttons/$1',
    '^cardHolders/(.*)': '<rootDir>/src/scripts/cardHolders/$1',
    '^constants/(.*)': '<rootDir>/src/scripts/constants/$1',
    '^animate': '<rootDir>/src/scripts/animate',
    '^blackjack': '<rootDir>/src/scripts/blackjack',
    '^card': '<rootDir>/src/scripts/card',
    '^popup': '<rootDir>/src/scripts/popup',
  },
  transform: {
    '^.+\\.(ts)$': 'ts-jest',
  },
  verbose: true,
};
