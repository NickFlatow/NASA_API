import type { Config } from '@jest/types';

// const config: Config.InitialOptions = {
//     preset: 'ts-jest',
//     extensionsToTreatAsEsm: ['.ts'],
//     testPathIgnorePatterns: ['./node_modules/'],
//     testEnvironment: 'node',
//     transform: {
//         '^.+\\.ts$': ['ts-jest', { useESM: true }],
//     },
//     setupFiles: ['<rootDir>/jest-setup.ts'],
// };
const config: Config.InitialOptions = {
    preset: 'ts-jest',
    extensionsToTreatAsEsm: ['.ts'],
    testPathIgnorePatterns: ['./node_modules/'],
    testEnvironment: 'node',
    transform: {
        '^.+\\.ts$': ['ts-jest', { useESM: true }],
    },
    setupFiles: ['<rootDir>/jest-setup.ts'],
    globals: {
        babelConfig: true,
        plugins: ['babel-plugin-transform-vite-meta-env']
    }
};

export default config;
