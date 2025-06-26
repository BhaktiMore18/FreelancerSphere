# GitHub Workflows (CI/CD)

## Backend Workflow (`.github/workflows/backend.yml`)
- Builds using Maven
- Runs tests
- Builds Docker images
- Pushed images to Docker Hub

## Frontend Workflow (`.github/workflows/frontend.yml`)
- Installs dependencies
- Runs `npm run build`
- Builds Docker image
- Pushes image to Docker Hub

## Contributor Checks (`.github/workflows/contributor-checks.yml`)
- Greets new PRs
- Runs Prettier
- Runs ESLint
- Runs `npm audit` (frontend) or OWASP dependency check (backend)
- Gives clear feedback when something breaks

## Secrets Used in Workflows
Secrets are stored in GitHub Settings > Secrets:
- `DOCKER_USERNAME`
- `DOCKER_PASSWORD`
- `MONGO_URI`
These are injected safely during Docker login and app runtime.