module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [
    './tests/setup.ts'
  ],
  roots: [
    './tests'
  ]
};
