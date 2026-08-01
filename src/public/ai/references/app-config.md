# Leaf 5 — App Config & Deployment Reference

## Environment Variables

MVC: auto-loaded. Basic apps: use `vlucas/phpdotenv` or `symfony/dotenv` to load `.env`.

```php
$value = _env('SECRET_KEY', 'default-if-not-found');
```

---

## Application Mode

```php
app()->config(['mode' => 'production']);
```

Or set `APP_ENV` in `.env` — Leaf detects it automatically.

Run code only in a specific mode:
```php
app()->script('production', function () {
    // only runs in production
});
```

In Blade:
```blade
@env('production')
  {{-- only renders in production --}}
@endenv
```

### Production Checklist
- Set all environment variables for production
- Turn off debug mode so errors aren't rendered to your users

---

## Logging

MVC: pre-configured. Logs saved to `storage/logs/` by default.

Basic apps:
```bash
leaf install logger
```

```php
app()->config([
    'log.enabled' => true,
    'log.dir'     => __DIR__ . '/logs/',
    'log.file'    => 'app.log',   // default: log.txt
]);
```

To disable logging entirely:
```bash
leaf uninstall logger
```

---

## `rescue()` — Safe Execution

```php
$value = rescue(function () {
    // code that may throw
}, 'default value');

rescue(function () {
    // code that may throw — no return value needed
});
```

---

## Maintenance Mode

```php
// Basic app
app()->config(['app.down' => true]);

// MVC — set in .env
// APP_DOWN=true
```

Custom down page:
```php
app()->setDown(function () {
    echo 'Custom maintenance page!';
});
```

---

## Dependency Injection

```php
app()->register('something', function ($c) {
    return new Something();
});

$something = app()->something;
$something->doSomething();

// or
app()->something->doSomething();
```

---

## URL Rewriting

Map all requests to `index.php` so Leaf's router handles them.

**Nginx:**
```nginx
try_files $uri /index.php?$query_string;
```

**Apache (`.htaccess`):**
```apache
RewriteEngine on
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule . index.php [L]
```

---

## Deployment

### Vite / Inertia Apps

Build assets before deploying:
```bash
npm run build   # or yarn build / pnpm build
```

> Skipping this causes a broken app or CORS errors with Inertia. Add to your deploy script.

### Queues / Workers

Quick start (small apps):
```bash
php leaf queue:work &
```

Production (recommended) — use Supervisor:
```bash
sudo apt update && sudo apt install supervisor -y
sudo nano /etc/supervisor/conf.d/leaf-queue.conf
```

```ini
[program:leaf-queue]
process_name=%(program_name)s_%(process_num)02d
command=php leaf queue:work
autostart=true
autorestart=true
numprocs=1
redirect_stderr=true
stdout_logfile=/var/log/leaf-queue.log
```

```bash
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl start leaf-queue
sudo supervisorctl status leaf-queue
```
