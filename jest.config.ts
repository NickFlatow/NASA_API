module.exports = {
    preset: 'ts-jest',
    extensionsToTreatAsEsm: ['.ts'],
    testPathIgnorePatterns: ['./node_modules/'],
    testEnvironment: 'node',
};