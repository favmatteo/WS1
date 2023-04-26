module.exports = {
  reporters: [
    'default',
    [
      'jest-html-reporter',
      {
        pageTitle: 'Test Report',
        outputPath: './tests/report.html',
      },
    ],
    ['jest-slow-test-reporter', { warnOnSlowerThan: 1000, color: true }],
  ],
  testEnvironment: 'node',
};
