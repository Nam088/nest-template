# Contributing to NestJS Template

Thank you for your interest in contributing to this project! This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on constructive feedback
- Be open to different perspectives

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/nam088/nest-template.git`
3. Create a branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Test your changes
6. Commit using conventional commits
7. Push to your fork: `git push origin feature/your-feature-name`
8. Create a Pull Request

## Development Setup

### Prerequisites

- Node.js (v20.18.3 or higher)
- Docker and Docker Compose
- npm or yarn

### Setup Steps

1. Install dependencies:

    ```bash
    npm install
    ```

2. Copy environment file:

    ```bash
    cp .env.example .env
    ```

3. Start PostgreSQL database:

    ```bash
    docker-compose up -d
    ```

4. Run the application:
    ```bash
    npm run start:dev
    ```

## Coding Standards

### TypeScript

- Use TypeScript strict mode
- Prefer type inference where possible
- Use interfaces for object shapes
- Use types for unions, intersections, and computed types
- Avoid `any` type - use `unknown` if necessary

### Code Style

- Follow the existing code style
- Run linter before committing: `npm run lint`
- Format code before committing: `npm run format`
- Use path aliases (`@/`, `@common/`, `@config/`, etc.) instead of relative paths

### Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
type(scope): subject

body

footer
```

Types:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

Examples:

```
feat(auth): add JWT authentication
fix(api): resolve validation error in user endpoint
docs(readme): update installation instructions
```

## Project Structure

Follow the existing project structure:

```
src/
├── common/              # Shared utilities, guards, interceptors, filters, pipes
├── config/              # Configuration files
├── modules/             # Feature modules
│   └── example/         # Example module structure
├── shared/              # Shared DTOs, entities, interfaces
├── app.module.ts        # Root application module
└── main.ts              # Application entry point
```

## Module Guidelines

When creating a new module:

1. Create a folder in `src/modules/`
2. Include the following files:
    - `*.module.ts` - Module definition
    - `*.controller.ts` - Controller
    - `*.service.ts` - Service
    - `dto/` - Data Transfer Objects
    - `*.spec.ts` - Unit tests

3. Follow the example module structure as a reference

## Testing

### Writing Tests

- Write unit tests for services
- Write E2E tests for controllers
- Aim for high test coverage
- Test both success and error cases

### Running Tests

```bash
# Run all tests
npm run test

# Run tests with coverage
npm run test:cov

# Run E2E tests
npm run test:e2e

# Run tests in watch mode
npm run test:watch
```

### Test Requirements

- All tests must pass before submitting a PR
- New features should include tests
- Bug fixes should include regression tests

## Pull Request Process

1. **Update Documentation**: Update README.md or relevant documentation if needed
2. **Add Tests**: Ensure new features include tests
3. **Run Tests**: Make sure all tests pass
4. **Check Linting**: Run `npm run lint` and fix any issues
5. **Format Code**: Run `npm run format`
6. **Create PR**: Use the PR template and provide a clear description

### PR Checklist

Before submitting a PR, ensure:

- [ ] Code follows the project's style guidelines
- [ ] Self-review of code has been performed
- [ ] Code has been commented, particularly in hard-to-understand areas
- [ ] Documentation has been updated
- [ ] Changes generate no new warnings
- [ ] Tests have been added/updated
- [ ] All tests pass locally
- [ ] Commit messages follow conventional commits format

## Code Review

- All PRs require review before merging
- Be open to feedback and suggestions
- Address review comments promptly
- Keep discussions focused and constructive

## Reporting Issues

When reporting bugs or requesting features:

1. Use the appropriate issue template
2. Provide clear and detailed information
3. Include steps to reproduce (for bugs)
4. Include environment details
5. Add screenshots if applicable

## Questions?

If you have questions or need help:

- Check the README.md for documentation
- Review existing issues and PRs
- Open a discussion or issue for clarification

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
