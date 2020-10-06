module.exports = {
  verbose: true,
  transform: {
    '^.+\\.js?$': 'babel-jest',
  },
  moduleNameMapper: {
    '^@scripts(.*)$': '<rootDir>/src/scripts$1',
  }
};
