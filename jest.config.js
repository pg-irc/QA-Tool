module.exports = {
    "roots": [
      "<rootDir>/src"
    ],
    "transform": {
      "^.+\\.tsx?$": "ts-jest"
    },
    "testPathIgnorePatterns": [
        "/node_modules/",
        "/lib/",
        "/helpers/"
    ]
  }