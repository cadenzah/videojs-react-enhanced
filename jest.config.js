module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: [
        '<rootDir>/src/tests/setupTests.ts'
    ],
    roots: [
        '<rootDir>/src/tests'
    ],
    moduleNameMapper: {
        '\\.(css|scss)$': 'identity-obj-proxy',
        "^@/(.*)$": "<rootDir>/src/$1"
    },
    moduleFileExtensions: [
        'js',
        'jsx',
        'json',
        'ts',
        'tsx',
    ],
    modulePathIgnorePatterns: [
        // ignore files below when testing
        '<rootDir>/node_modules',
        '<rootDir>/build',
        '<rootDir>/dist',
    ],
};
