# Tailwind + Leaf

Tailwind is a utility-first CSS framework that provides a set of utility classes to help you build your UI. Leaf has first-class support for Tailwind CSS, and it's the recommended way to style your Inertia apps. This guide will show you how to set up Tailwind CSS in your Leaf project with minimal configuration.

## Using the CLI

You can set up Tailwind CSS in your Leaf project using the Leaf CLI. To do this, run the following command:

::: code-group

```bash:no-line-numbers [Leaf CLI]
leaf view:install --tailwind
```

```bash:no-line-numbers [Leaf MVC CLI]
php leaf view:install --tailwind
```

:::

This command will install Tailwind CSS and its dependencies, create a Tailwind configuration file, and set up your CSS file to import Tailwind CSS. It will also add your CSS file to Vite as an entry point.

## Manual Installation

Leaf MVC comes with Vite out of the box, which is a modern build tool that supports Tailwind CSS out of the box. To get started, you need to install Tailwind CSS and its dependencies:

```bash:no-line-numbers
npm install tailwindcss@latest postcss@latest autoprefixer@latest
```

Next, you need to create a Tailwind configuration file. You can do this by running the following command:

```bash:no-line-numbers
npx tailwindcss init
```

This will create a `tailwind.config.js` file in the root of your project. You can customize this file to suit your needs.

Next, you need to create a PostCSS configuration file. You can do this by running the following command:

```bash:no-line-numbers
touch postcss.config.js
```

Add the following code to your `postcss.config.js` file:

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

Next, you need to create a CSS file that imports Tailwind CSS. You can do this by running the following command:

```bash:no-line-numbers
touch app/views/css/app.css
```

Add the following code to your `app/views/css/app.css` file:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Next, you need to add your CSS file to vite as an entry point. You can do this by adding the following code to your `vite.config.js` file:

```javascript
defineConfig({
```

The final step is to import your CSS file in your root layout file so that it gets included in your HTML.

```blade{7}
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Leaf</title>
  {{ vite('css/app.css') }}
  ...
```

That's it! You now have Tailwind CSS set up in your Leaf project. You can start using Tailwind utility classes in your views to style your UI.

Be sure to start your vite server by running:

```bash:no-line-numbers
npm run dev
```
