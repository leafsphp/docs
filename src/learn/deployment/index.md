# Deployment

Getting your Leaf app live should be as simple as building it. Whether you're deploying to shared hosting, VPS, or platforms like DigitalOcean and Vercel, Leaf makes the process smooth and hassle-free. This guide walks you through setting up your server, configuring URL rewriting, and making sure your app runs efficiently in production.

## Production Checklist

Before deploying your app, make sure you’ve covered the following:

- **[Environment Variables](/docs/config/environment)**: Set up your environment variables for production.
- **[Debug Mode](/docs/routing/error-handling)**: Turn off debug mode and disable Leaf DevTools.

These are meant to ensure your app runs smoothly in production, without exposing sensitive information or running unnecessary debugging tools.

## URL Rewriting

URL rewriting maps all requests to a single entry point—usually `index.php`—so Leaf’s router can handle them dynamically. Instead of serving files directly, web servers like Apache and Nginx can be configured to route all traffic through your app, so Leaf can handle requests cleanly and efficiently.

::: code-group

```nginx:no-line-numbers [Nginx nginx.conf]
try_files $uri /index.php?$query_string;
```

```apache:no-line-numbers [Apache .htaccess]
RewriteEngine on
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule . index.php [L]
```

:::

Without this, things like routing, request handling, and error pages won’t work as expected. Make sure to set up URL rewriting correctly on your server to ensure your Leaf app runs smoothly.

## Deployment Guides

Okay, now let’s get your app live! 🚀

| Provider                                                        | Description                                                |
| :-------------------------------------------------------------- | :--------------------------------------------------------- |
| [Digital Ocean](/learn/deployment/digitalocean/) | Deploying LeafMVC projects to a new Digital Ocean droplet  |
| [Heroku](/learn/deployment/heroku/)              | Deploying a base Leaf project to Heroku using the Leaf CLI |
| [Fly.io](/learn/deployment/flyio/)              | Deploying a base Leaf application to Fly.io                |

## Deploying Vite/Inertia Apps

If you’re using [Vite](/docs/frontend/vite) and [Inertia.js](/docs/frontend/inertia), the process is pretty much the same as deploying a regular Leaf app. However, you’ll need to build your assets before deploying to production. Here’s how you can do that:

::: code-group

```bash:no-line-numbers [NPM]
npm run build
```

```bash:no-line-numbers [Yarn]
yarn build
```

```bash:no-line-numbers [PNPM]
pnpm run build
```

:::

If you don't build your assets before deploying, you will either have a fully broken app or a CORS error in the case of Inertia.js, so make sure to build your assets before deploying or add it to your deployment script.

## Deploying Queues/Workers

When deploying your application with [queues](/docs/utils/queues), Leaf takes care of setting up the necessary files and commands based on your chosen queue driver. However, once deployed, you’ll need to set up your server to keep your workers running continuously.

For smaller applications, you can keep the queue worker running in the background with:

```bash:no-line-numbers
php leaf queue:work &
```

This command will set up your queue and start a worker to process jobs. Leaf includes safeguards to prevent excessive memory usage, long-running processes, or crashes from failed jobs. However, for larger applications, this setup may not be enough. In such cases, using a process manager like Supervisor is recommended to ensure your workers run smoothly and restart automatically if needed:

```bash:no-line-numbers
sudo apt update && sudo apt install supervisor -y
```

Create a new configuration file for your Leaf queue worker:

```bash:no-line-numbers
sudo nano /etc/supervisor/conf.d/leaf-queue.conf
```

Add your Supervisor configuration:

```ini:no-line-numbers
[program:leaf-queue]
process_name=%(program_name)s_%(process_num)02d
command=php leaf queue:work
autostart=true
autorestart=true
numprocs=1
redirect_stderr=true
stdout_logfile=/var/log/leaf-queue.log
```

Save and exit, then update Supervisor and start the worker:

```bash:no-line-numbers
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl start leaf-queue
```

This will start a worker that will process jobs in the queue. You can check the status of the worker using the following command:

```bash:no-line-numbers
sudo supervisorctl status leaf-queue
```

And that's it! Your worker is now running and processing jobs in the queue.
