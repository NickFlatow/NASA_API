
import dotenv from 'dotenv';
dotenv.config();

import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    preset: 'ts-jest',
    extensionsToTreatAsEsm: ['.ts'],
    testPathIgnorePatterns: ['./node_modules/'],
    testEnvironment: 'node',
    transform: {},
    // setupFiles: ['<rootDir>/jest-setup.ts'],
};

export default config;
