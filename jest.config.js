module.exports = {
    collectCoverageFrom: [
        'src/**/*.(t|j)s',
        '!src/**/*.spec.ts',
        '!src/**/*.interface.ts',
        '!src/**/*.dto.ts',
        '!src/**/*.entity.ts',
        '!src/**/*.module.ts',
        '!src/main.ts',
        '!src/**/index.ts',
    ],
    coverageDirectory: '<rootDir>/../coverage',
    coverageReporters: ['text', 'lcov', 'html', 'json-summary'],
    coverageThreshold: {
        global: {
            branches: 70,
            functions: 70,
            lines: 70,
            statements: 70,
        },
    },
    moduleFileExtensions: ['js', 'json', 'ts'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
        '^@common/(.*)$': '<rootDir>/common/$1',
        '^@config/(.*)$': '<rootDir>/config/$1',
        '^@modules/(.*)$': '<rootDir>/modules/$1',
        '^@shared/(.*)$': '<rootDir>/shared/$1',
    },
    rootDir: 'src',
    testEnvironment: 'node',
    testRegex: '.*\\.spec\\.ts$',
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    },
};

