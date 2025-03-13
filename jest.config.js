module.exports = {
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./jest.setup.js'],
  testTimeout: 10000,
  reporters: [
    'default',
    [
      'jest-html-reporter',
      {
        pageTitle: 'Test Report',
        outputPath: './test-report.html',
        includeFailureMsg: true,
        includeConsoleLog: true,
        append: true
      }
    ]
  ]
}; 