module.exports = {
  verbose: true,
  transform: {
    '^.+\\.js?$': 'babel-jest',
  },
  moduleNameMapper: {
    '^@scripts(.*)$': '<rootDir>/src/scripts$1',
    '^@card-stack(.*)$': '<rootDir>/src/scripts/card-stack$1',
    '^@const(.*)$': '<rootDir>/src/scripts/const$1',
    '^@utils(.*)$': '<rootDir>/src/scripts/utils$1',
  }
};
