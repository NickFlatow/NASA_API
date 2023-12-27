import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    preset: 'ts-jest',
    extensionsToTreatAsEsm: ['.ts'],
    testPathIgnorePatterns: ['./node_modules/'],
    testEnvironment: 'node',
    transform: {
        '^.+\\.ts$': ['ts-jest', { useESM: true }],
    },
    setupFiles: ['<rootDir>/jest-setup.ts'],
};

export default config;
