# NestJS Template

A production-ready NestJS template with TypeScript, featuring comprehensive tooling, best practices, and a modular architecture.

## Features

- **NestJS 11** - Latest version with TypeScript
- **Swagger/OpenAPI** - Auto-generated API documentation
- **PostgreSQL** - Database support with Docker Compose
- **Jest** - Unit and E2E testing with coverage
- **Compodoc** - Code documentation generator
- **ESLint + Prettier** - Code quality and formatting
- **Husky + lint-staged** - Git hooks for code quality
- **Commitlint** - Conventional commit messages
- **Zod** - Schema validation
- **Path aliases** - Clean imports with `@/` prefixes
- **TypeScript** - Strict type checking

## Prerequisites

- **Node.js** (v20.18.3 or higher) - Use [nvm](https://github.com/nvm-sh/nvm) to manage Node versions
- **Docker** and **Docker Compose** - For local PostgreSQL database
- **npm** or **yarn** - Package manager

## Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/Nam088/nest-template.git
cd nest-template
```

### 2. Install Node.js version

If you're using nvm:

```bash
nvm use
```

### 3. Install dependencies

```bash
npm install
```

### 4. Environment configuration

Copy the example environment file and configure it:

```bash
cp .env.example .env
```

Edit `.env` file with your configuration values. The application uses the following environment variables:

- `NODE_ENV` - Environment (development, production, test)
- `PORT` - Server port (default: 3000)
- `API_VERSION` - API version (default: v1)
- `SWAGGER_TITLE` - Swagger documentation title
- `SWAGGER_DESCRIPTION` - Swagger documentation description
- `SWAGGER_VERSION` - API version for Swagger

### 5. Start PostgreSQL database

Using Docker Compose:

```bash
docker-compose up -d
```

This will start a PostgreSQL 16 container on port 5432 with:

- Database: `nest_template`
- User: `postgres`
- Password: `password`

### 6. Run the application

```bash
# Development mode (with hot reload)
npm run start:dev

# Production mode
npm run start:prod

# Debug mode
npm run start:debug
```

The application will be available at:

- **API**: `http://localhost:3000/api/v1`
- **Swagger Documentation**: `http://localhost:3000/docs`

## Project Structure

```
nest-template/
├── src/
│   ├── common/              # Shared utilities, guards, interceptors, filters, pipes
│   ├── config/              # Configuration files (app, database, etc.)
│   ├── modules/             # Feature modules
│   │   └── example/         # Example module (template for new modules)
│   ├── shared/              # Shared DTOs, entities, interfaces
│   ├── app.module.ts        # Root application module
│   ├── app.controller.ts    # Root controller
│   ├── app.service.ts       # Root service
│   └── main.ts              # Application entry point
├── test/                    # E2E tests
├── documentation/           # Compodoc generated documentation
├── coverage/                # Test coverage reports
├── docker-compose.yml       # Docker Compose configuration
├── compodoc.json            # Compodoc configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies and scripts
```

## Available Scripts

### Development

```bash
# Start in development mode (watch mode)
npm run start:dev

# Start in debug mode
npm run start:debug

# Build the application
npm run build

# Start in production mode
npm run start:prod
```

### Code Quality

```bash
# Run ESLint
npm run lint

# Fix linting issues automatically
npm run lint:fix

# Format code with Prettier
npm run format
```

### Testing

```bash
# Run unit tests
npm run test

# Run unit tests in watch mode
npm run test:watch

# Run unit tests with coverage
npm run test:cov

# Run E2E tests
npm run test:e2e

# Debug tests
npm run test:debug
```

### Documentation

```bash
# Generate and serve documentation
npm run docs

# Generate documentation only
npm run docs:build

# Serve documentation
npm run docs:serve

# Watch mode for documentation
npm run docs:watch
```

## Testing & Coverage

The project uses Jest for testing with comprehensive coverage reporting.

### Running Tests

```bash
# Run all tests
npm run test

# Run tests with coverage
npm run test:cov
```

### Coverage Configuration

Coverage reports are generated in the `coverage/` directory. The coverage configuration includes:

- **Collect coverage from**: All TypeScript files in `src/`
- **Coverage directory**: `coverage/`
- **Coverage thresholds**: Configured in `package.json`

### Viewing Coverage

After running `npm run test:cov`, you can:

1. View the HTML report: Open `coverage/lcov-report/index.html` in your browser
2. Check the summary in the terminal output
3. View coverage in Compodoc documentation (if configured)

### Coverage Exclusions

The following files are typically excluded from coverage:

- Test files (`*.spec.ts`)
- Configuration files
- Type definition files
- Main entry points

## API Documentation

### Swagger UI

Access the interactive API documentation at:

```
http://localhost:3000/docs
```

The Swagger documentation includes:

- All available endpoints
- Request/response schemas
- Authentication methods (API Key, JWT)
- Try-it-out functionality

### Compodoc

Generate and view code documentation:

```bash
npm run docs
```

Then open `documentation/index.html` in your browser or access it via the serve command.

## Module Structure

The project follows a modular architecture. Each module should be structured as follows:

```
module-name/
├── dto/                    # Data Transfer Objects
│   ├── create-*.dto.ts
│   ├── update-*.dto.ts
│   ├── *-query.dto.ts
│   └── index.ts
├── *.controller.ts         # Controller
├── *.service.ts            # Service
├── *.module.ts             # Module definition
└── README.md               # Module documentation (optional)
```

See the `example` module for a reference implementation.

## Path Aliases

The project uses TypeScript path aliases for cleaner imports:

```typescript
// Instead of relative paths
import { Something } from '../../../common/utils';

// Use aliases
import { Something } from '@/common/utils';
import { Config } from '@config/app.config';
import { ExampleService } from '@modules/example/example.service';
```

Available aliases:

- `@/*` → `src/*`
- `@common/*` → `src/common/*`
- `@config/*` → `src/config/*`
- `@modules/*` → `src/modules/*`
- `@shared/*` → `src/shared/*`

## Git Hooks

The project uses Husky for Git hooks:

- **pre-commit**: Runs lint-staged to check staged files
- **commit-msg**: Validates commit messages with Commitlint

### Commit Message Format

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
type(scope): subject

body

footer
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, etc.

## Environment Variables

Create a `.env` file in the root directory:

```env
NODE_ENV=development
PORT=3000
API_VERSION=v1

SWAGGER_TITLE=NestJS API
SWAGGER_DESCRIPTION=REST API Documentation
SWAGGER_VERSION=1.0.0

# Database configuration (if using)
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_DATABASE=nest_template
```

## Docker

### Start Services

```bash
docker-compose up -d
```

### Stop Services

```bash
docker-compose down
```

### View Logs

```bash
docker-compose logs -f postgres
```

## Dependencies

### Main Dependencies

- `@nestjs/common` - NestJS core
- `@nestjs/core` - NestJS core
- `@nestjs/config` - Configuration module
- `@nestjs/swagger` - Swagger/OpenAPI integration
- `@nam088/nestjs-kit` - Custom NestJS utilities
- `zod` - Schema validation
- `rxjs` - Reactive programming

### Development Dependencies

- `@nestjs/cli` - NestJS CLI
- `@nestjs/testing` - Testing utilities
- `jest` - Testing framework
- `ts-jest` - TypeScript support for Jest
- `@compodoc/compodoc` - Documentation generator
- `@nam088/nestjs-eslint` - ESLint configuration
- `prettier` - Code formatter
- `husky` - Git hooks
- `lint-staged` - Run linters on staged files
- `@commitlint/cli` - Commit message linter

## Best Practices

1. **Modular Architecture**: Keep features in separate modules
2. **DTOs**: Use DTOs for all API inputs/outputs
3. **Validation**: Use Zod schemas for validation
4. **Error Handling**: Use the global exception filter
5. **Testing**: Write unit tests for services and E2E tests for controllers
6. **Documentation**: Document complex logic and APIs
7. **Type Safety**: Leverage TypeScript's type system
8. **Code Quality**: Run linter and formatter before committing

## Troubleshooting

### Port Already in Use

If port 3000 is already in use, change it in your `.env` file:

```env
PORT=3001
```

### Database Connection Issues

1. Ensure Docker is running
2. Check if PostgreSQL container is up: `docker-compose ps`
3. Verify database credentials in `.env`
4. Check container logs: `docker-compose logs postgres`

### Test Coverage Issues

1. Ensure all test files follow the `*.spec.ts` naming convention
2. Check that test files are in the correct directories
3. Verify Jest configuration in `package.json`

## Contributing

1. Create a feature branch
2. Make your changes
3. Write/update tests
4. Ensure all tests pass: `npm run test`
5. Run linter: `npm run lint`
6. Format code: `npm run format`
7. Commit using conventional commits
8. Push and create a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For questions and support, please refer to:

- [NestJS Documentation](https://docs.nestjs.com)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
