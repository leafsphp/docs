# Leaf 5 — Views & Frontend Reference

## Overview

| Engine | Speed | Features | Use Case |
|---|---|---|---|
| **BareUI** | ⚡️ Fast | Basic (pure PHP) | Simple/performance-critical views |
| **Blade** | Moderate | Rich (`@` directives) | Full-featured templating |
| **Inertia** | — | React/Vue/Svelte | SPA-style frontend frameworks |

---

## BareUI

Lightweight, pure PHP templating. No compilation, no caching — just speed.

```bash
leaf install bareui
```

### Setup (Basic app only — MVC pre-configured)

```php
app()->template()->config('path', './views');
```

### Template Files

Extension: `.view.php`

```php
<!-- welcome.view.php -->
<h1>Hello <?php echo $name; ?></h1>

<?php if (count($items) > 0) : ?>
    <ul>
        <?php foreach ($items as $item) : ?>
            <li><?php echo $item['name']; ?></li>
        <?php endforeach; ?>
    </ul>
<?php else : ?>
    <p>No items</p>
<?php endif; ?>
```

### Render

```php
response()->render('welcome');
response()->render('welcome', ['name' => 'Michael', 'items' => $items]);
```

### Sub-templates / Partials

All BareUI templates have access to `$template`:

```php
<?php echo $template::render('partials/header'); ?>
<?php echo $template::render('partials/footer', ['year' => date('Y')]); ?>
```

> XSS protection is handled automatically by Leaf Anchor when using Leaf's request functions.

---

## Blade

Laravel's templating engine. Pre-installed in MVC.

```bash
leaf install blade@v4   # Basic app
```

### Render

```php
response()->render('hello', ['name' => 'Michael']);    // hello.blade.php
```

### Core Directives

```blade
{{-- Output (auto-escaped) --}}
{{ $name }}

{{-- Unescaped output --}}
{!! $html !!}

{{-- PHP blocks --}}
@php $x = 1; @endphp

{{-- Conditionals --}}
@if ($condition) ... @elseif ($other) ... @else ... @endif

{{-- Loops --}}
@foreach ($items as $item) ... @endforeach
@for ($i = 0; $i < 10; $i++) ... @endfor
@while ($condition) ... @endwhile
```

### Leaf-specific Directives

```blade
{{-- CSRF token --}}
<form method="POST">
    @csrf
    ...
</form>

{{-- Auth state --}}
@auth  // user is logged in  @endauth
@guest // user is not logged in  @endguest

{{-- Roles & permissions --}}
@is('admin') ... @endis
@can('edit articles') ... @endcan

{{-- Environment --}}
@env('production') ... @else ... @endenv

{{-- Null check --}}
@isNull($variable) ... @else ... @endisNull

{{-- Session --}}
@session('status')
    <div>{{ $value }}</div>
@endsession

{{-- Flash messages --}}
@flash('status')
    <div>{{ $message }}</div>
@endflash

{{-- JSON --}}
<script>var app = @json($array);</script>

{{-- Vite assets --}}
@vite('app.js')
@vite(['app.js', 'app.css'])

{{-- Alpine.js --}}
<head>
    @alpine
</head>

{{-- Toast notifications --}}
<body>
    ...
    @toastContainer
</body>

{{-- i18n --}}
<h1>@lingo('hero.title')</h1>
```

### Conditional HTML Attributes

```blade
@class(['p-4', 'font-bold' => $isActive, 'bg-red' => $hasError])
@style(['background-color: red', 'font-weight: bold' => $isActive])
@checked($isActive)
@selected($shouldBeSelected)
@disabled($shouldBeDisabled)
@readonly($shouldBeReadonly)
@required($shouldBeRequired)
```

### Custom Directives

```php
app()->blade()->directive('datetime', function ($expression) {
    return "<?php echo tick({$expression})->format('DD MM YYYY'); ?>";
});
```

Usage: `@datetime($date)`

---

## Inertia (React / Vue / Svelte)

Connects Leaf backend to a JS frontend framework without building a full API.

### Setup (MVC)

```bash
php leaf view:install --vue
php leaf view:install --react
php leaf view:install --svelte
```

When you run `view:install`, Leaf automatically generates `app/views/_inertia.blade.php` — the root HTML shell for all Inertia pages. **Do not create this file manually.**

```blade
{{-- app/views/_inertia.blade.php (auto-generated) --}}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title inertia>{{ _env('APP_NAME', 'Leaf MVC') }}</title>
    @viteReactRefresh
    @vite(['/js/app.jsx', "/js/pages/{$page['component']}.jsx"])
    @inertiaHead
</head>
<body>
    @inertia
</body>
</html>
```

**This is the right place for global head content** — fonts, analytics (GTM, Tawk.to, OneSignal), favicon, CDN scripts, etc. Edit it when you need those things; otherwise leave it alone.

```blade
{{-- _inertia.blade.php with global assets --}}
<head>
    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
    <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet">
    @viteReactRefresh
    @vite(['/js/app.jsx', "/js/pages/{$page['component']}.jsx"])
    @inertiaHead
    {{-- GTM, analytics, chat widgets go here --}}
</head>
<body>
    @inertia
</body>
```

Key directives:
- `@viteReactRefresh` — React HMR in dev (must come before `@vite`)
- `@vite([...])` — loads compiled assets
- `@inertiaHead` — renders `<Head>` tags from React components
- `@inertia` — mounts the React/Vue/Svelte app

### Returning Inertia Views

```php
// From controller
response()->inertia('home', ['user' => auth()->user()]);

// Direct route
app()->inertia('/home', 'home');
```

### Generating View Files

```bash
leaf g:template home              # auto-detects framework
leaf g:template home --type=jsx   # React
leaf g:template home --type=vue
leaf g:template home --type=svelte
```

### Shared Data (across all views)

```php
// app/routes/index.php
use Leaf\Inertia;

Inertia::share('appName', 'My App');
Inertia::share('user', fn() => auth()->user() ?? null);
Inertia::share('flash', function () {
    return flash()->display('flash') ?? null;
});
```

### React Component Example

```jsx
export default function Home({ user, appName }) {
    return <h1>Welcome to {appName}, {user.name}</h1>;
}
```

### Form Validation with Inertia

Controller:
```php
$data = request()->validate(['email' => 'email']);

if (!$data) {
    return response()
        ->withFlash('errors', request()->errors())
        ->redirect('/form', 303);  // 303 is important for Inertia
}
```

View (pass errors as prop):
```php
response()->inertia('form', [
    'errors' => flash()->display('errors') ?? [],
]);
```

Frontend (React):
```jsx
const { data, setData, patch, errors } = useForm({ email: '' });
// errors.email auto-populated from the errors prop
```

### shadcn/ui (React)

```bash
leaf scaffold:shadcn
pnpm dlx shadcn@latest add button
```

---

## Vite (Asset Bundling)

Pre-installed in MVC. For Basic apps:

```bash
leaf view:install --vite
```

### Loading Assets

```blade
@vite('css/app.css')
@vite(['app.css', 'app.js'])
```

PHP (non-Blade):
```php
<?php vite('css/app.css'); ?>
```

### `vite.config.js`

```js
import { defineConfig } from 'vite';
import leaf from '@leafphp/vite-plugin';

export default defineConfig({
    plugins: [
        leaf({
            input: ['path/to/app.css', 'path/to/app.js'],
            refresh: true,
        }),
    ],
    resolve: {
        alias: { '@': '/path/to/folder' },
    },
});
```

### PHP Config (optional, non-MVC)

```php
\Leaf\Vite::config([
    'assets' => 'app/views',
    'build'  => 'public/build',
]);
```

Vite dev server starts automatically with `leaf serve`.

---

## Tailwind CSS

```bash
php leaf view:install --tailwind
```

Installs Tailwind v4, updates `vite.config.js`, and sets up `css/app.css`.

Include in Blade layout:
```blade
@vite('css/app.css')
```

### Theming (Tailwind v4)

```css
@theme {
  --color-primary: #ff0000;
  --color-secondary: #00ff00;
}
```

```html
<div class="bg-primary text-secondary">Hello</div>
```

---

## Custom / Third-Party Template Engines

### Basic App

```php
app()->attachView(Smarty::class);
app()->smarty()->setTemplateDir('/views');
app()->smarty()->assign('name', 'Michael');
app()->smarty()->display('index.tpl');
```

### MVC — `config/view.php`

```bash
leaf config:publish view   # → config/view.php
```

```php
return [
    'viewEngine' => \Smarty::class,

    'config' => function (\Smarty $engine, array $config) {
        $engine->setTemplateDir($config['views']);
        $engine->setCacheDir($config['cache']);
    },

    'render' => function (\Smarty $engine, $view, $data) {
        foreach ($data as $key => $value) {
            $engine->assign($key, $value);
        }
        $engine->display($view);
    },

    'extend' => null,
];
```
