# Medusa Backend

This repository contains a Medusa v2 backend with custom lookup, mapping, and combination modules for your jewelry flow.

## Scripts

- `npm run dev` starts the backend in development mode.
- `npm run build` builds the backend for production.
- `npm start` starts the production server.
- `npm run seed` seeds demo Medusa data.

## Required Environment Variables

Copy [`.env.template`](D:/zephico/E-COM-Backend/.env.template) to `.env` for local development, then replace the values.

- `DATABASE_URL`: Required in production. Use your Render PostgreSQL connection string.
- `JWT_SECRET`: Required in production.
- `COOKIE_SECRET`: Required in production.
- `STORE_CORS`: Frontend domain list, comma-separated.
- `ADMIN_CORS`: Admin domain list, comma-separated.
- `AUTH_CORS`: Auth callback domain list, comma-separated.
- `MEDUSA_WORKER_MODE`: Usually `shared` for a single Render web service.
- `DISABLE_MEDUSA_ADMIN`: Set to `true` only if you do not want to serve Medusa Admin.
- `REDIS_URL`: Optional unless you want Redis-backed cache and event bus. If not set, Redis modules stay disabled.

## Render Setup

Use these Render settings for the web service:

- Build command: `npm ci && npm run build`
- Start command: `npm start`
- Node version: `20`

Set these environment variables in Render before deploying:

- `NODE_ENV=production`
- `DATABASE_URL=<your Render Postgres external URL>`
- `JWT_SECRET=<long random secret>`
- `COOKIE_SECRET=<long random secret>`
- `STORE_CORS=https://your-store-domain.com`
- `ADMIN_CORS=https://your-admin-domain.com`
- `AUTH_CORS=https://your-admin-domain.com`
- `MEDUSA_WORKER_MODE=shared`
- `DISABLE_MEDUSA_ADMIN=false`
- `REDIS_URL=<your Redis URL>` only if you have a Redis service

## Why Render Was Failing

The biggest deployment issues in this repo were:

- Redis modules were always enabled even when `REDIS_URL` was missing or still pointing at `localhost`.
- Production secrets silently fell back to insecure defaults instead of failing with a clear message.
- The env template did not match the actual config used at startup.
- The seed script depended on generated `.medusa` types that may not exist in a fresh deploy environment.

## Notes

- If you use a post-deploy seed command on Render, run it only after the database is reachable.
- If your frontend is hosted on a different domain, make sure that exact domain is included in the CORS variables.
