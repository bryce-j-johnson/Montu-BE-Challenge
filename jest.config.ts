import type { Config } from 'jest';

const config: Config = {
    verbose: true,
    setupFilesAfterEnv: ['./setupJestEnv.ts'],
    transformIgnorePatterns: ['node_modules/(?!axios)'],
    testEnvironment: 'node',
};

export default config;
