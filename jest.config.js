'use strict';

module.exports = {
    transform: {
        '^.+\\.jsx$': 'babel-jest',
        '^.+\\.js$': 'babel-jest'
    },
    "setupFiles": [
        "raf/polyfill",
        "<rootDir>/src/tests/setupTests.js"
    ],
    "snapshotSerializers": [
        "enzyme-to-json/serializer"
    ]
};