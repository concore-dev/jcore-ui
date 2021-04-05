module.exports = {
    verbose: true,
    clearMocks: true,
    collectCoverage: true,
    setupFilesAfterEnv: [
        "../tests/setup.ts"
    ],
    coverageDirectory: '../tests/coverage',
    snapshotSerializers: [
        // "./node_modules/enzyme-to-json/serializer"
        // "enzyme-to-json/serializer"
    ],
    transform: {
        // "^.+\\.js$": "babel-jest"
      "^.+\\.(js|jsx|ts|tsx)$": "../node_modules/babel-jest",
    },
    moduleNameMapper: {
        "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy"
        // "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "./__mocks__/mock.js",
        // "\\.(css|scss)$": "identity-obj-proxy"
    },
    roots: ["../"],
    // testMatch: [
    //     "<rootDir>/src/server/**/__tests__/*.unit.{js,jsx}",
    //     "<rootDir>/src/server/**/__tests__/unit/*.{js,jsx}"
    // ],
    moduleFileExtensions: [
        "js",
        "ts",
        "tsx",
        "json",
        "jsx",
        "node"
    ],
}