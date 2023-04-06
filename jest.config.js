module.exports = {
    "reporters": [
        "default",
        ["jest-html-reporter", {
            "pageTitle": "Test Report",
            "outputPath": "./tests/report.html",
        }],
        ['jest-slow-test-reporter', { "warnOnSlowerThan": 300, "color": true }]
    ],
    "testEnvironment": "node",
};