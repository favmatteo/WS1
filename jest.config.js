module.exports = {
    "reporters": [
        "default",
        ["jest-html-reporter", {
            "pageTitle": "Test Report",
            "outputPath": "./tests/report.html",
        }]
    ],
    "testEnvironment": "node",
};