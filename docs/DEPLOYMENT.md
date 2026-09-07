# CRM deployment

Run `pnpm install --frozen-lockfile` and `pnpm verify` with the documented Node/pnpm versions. Vite builds static `dist/`; `infra/nginx.conf` provides SPA fallback. Deployment targets and credentials are not bundled.

Optional container: `docker build -t template-crm .`, then `docker run --rm -p 8080:80 template-crm`. The build copies the pnpm policy and preinstall checker before installing dependencies. `.dockerignore` excludes local dependencies, secrets and agent runtime from the build context. Verify `/` and a real deep link after deployment. An available Dockerfile is not evidence the image was built.

Only `VITE_*` public build-time values may enter the frontend; never put secrets there. API origin must come from the consumer environment, not a maintainer address. Nginx/CDN cache and API reverse proxy are deployment-specific. Use the prior immutable image/static bundle for backout; no DB migration is part of this SPA template.
