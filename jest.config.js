module.exports = {
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
    transformIgnorePatterns: ['node_modules/(?!(firebase|aos)/)'],
    moduleNameMapper: {
      '\\.(css|scss|sass)$': 'identity-obj-proxy',
      '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/test/__mocks__/fileMock.js',
    },
    testMatch: ['<rootDir>/react-tests/**/*.test.js', '<rootDir>/react-tests/**/*.test.jsx', '<rootDir>/react-tests/**/*.test.ts', '<rootDir>/react-tests/**/*.test.tsx'],
    globals: {
      'ts-jest': {
        tsconfig: './tsconfig.test.json',  // Ensure Jest uses the test-specific tsconfig
      },
    },
};
