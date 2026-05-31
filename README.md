# ThinkSchool App

ThinkSchool App is a school management website and dashboard with a React/Vite frontend and an Express/MySQL backend.

## Project Structure

```text
frontend/  # React Vite app
server/    # Express API, migrations, uploads, and backend config
```

## Local Development Without Docker

Start the backend:

```bash
cd server
npm install
npm run dev
```

Start the frontend:

```bash
cd frontend
npm install
npm run dev
```

Frontend:

```text
http://localhost:5173
```

Backend:

```text
http://localhost:5001
```

Backend health check:

```text
http://localhost:5001/health
```

## Local Development With Docker

From the project root:

```bash
docker compose --env-file server/.env.development up -d --build
```

Stop Docker:

```bash
docker compose --env-file server/.env.development down
```

Rebuild frontend only:

```bash
docker compose --env-file server/.env.development up -d --build frontend
```

Rebuild backend only:

```bash
docker compose --env-file server/.env.development up -d --build server
```

## Frontend Build

```bash
cd frontend
npm run build
```

The production frontend output is created in:

```text
frontend/dist/
```

## Backend Migrations

Run migrations manually when needed:

```bash
cd server
npm run migrate
```

With Docker:

```bash
docker compose --env-file server/.env.development exec -T server npm run migrate
```

## Environment Files

Do not commit real env files.

Use this as the safe template:

```text
server/.env.example
```

Local development env:

```text
server/.env.development
```

Production env:

```text
server/.env.production
```

Production domain example:

```env
CLIENT_URL=https://home.thinkschoolapp.org
CORS_ORIGINS=https://home.thinkschoolapp.org
VITE_API_URL=https://apihome.thinkschoolapp.org
```

## Git Notes

Commit source code, migrations, Docker files, and docs.

Do not commit:

```text
frontend/node_modules/
server/node_modules/
frontend/dist/
server/uploads/
server/.env.development
server/.env.production
```

## More Guides

- `DOCKER_SETUP.md`
- `DOCKER_OR_NPM_WORKFLOW.md`
- `GIT_DEPLOYMENT.md`
