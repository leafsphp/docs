# Tailwind + Leaf

Tailwind is a utility-first CSS framework that provides a set of utility classes to help you build your UI. Leaf has first-class support for Tailwind CSS, and it's the recommended way to style your Inertia apps. This guide will show you how to set up Tailwind CSS in your Leaf project with minimal configuration.

## Using the CLI

::: warning CLI Installation

Tailwind 4 has been released, and it unfortunately breaks the current Leaf CLI installation. Leaf MVC works fine with Tailwind 4, but we are working on a fix for the CLI. For now, you can install Tailwind manually if you are not using Leaf MVC.

:::

You can set up Tailwind CSS in your Leaf MVC project using the php leaf console. To do this, run the following command:

::: code-group

<!-- ```bash:no-line-numbers [Leaf CLI]
leaf view:install --tailwind
``` -->

```bash:no-line-numbers [Leaf MVC CLI]
php leaf view:install --tailwind
```

:::

This command will install Tailwind CSS v4 and its dependencies, update your vite file, and set up your CSS file to import Tailwind CSS. It will also add your CSS file to Vite as an entry point. From there, you need to head over to your template file and make sure that you are including the CSS file.

```blade:no-line-numbers
@vite('css/app.css')
```

You can then restart your Leaf server and start using Tailwind CSS in your project.

## Manual Installation for TW v4

v4 is now the default version of Tailwind CSS, and it comes with a bunch of new features and improvements, but also has a different setup compared to v3. To get started, you need to install all your frontend dependencies:

```bash:no-line-numbers
npm install tailwindcss @tailwindcss/vite
```

And then configure Vite to include the Tailwind plugin:

```js{2,6} [vite.config.js]
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    tailwindcss(),
    // …
  ],
});
```

Finally, you need to import Tailwind in your CSS file:

```css [app/views/css/app.css]
@import "tailwindcss";
@source "../";

...

```

And then include your CSS file in your layout templates:

```blade{7,12-14}
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    @vite('resources/css/app.css')

    ...
  </head>
  <body>
    <h1 class="text-3xl font-bold underline">
      Hello world!
    </h1>
  </body>
</html>
```

## Migrating from v3 to v4

If you want to migrate from Tailwind v3 to v4 in Leaf MVC, you can do so by following these steps:

1. Update all your dependencies to the latest version:

```bash:no-line-numbers
composer update
```

2. Remove old tailwind config, autoprefixer, and postcss files

3. Run the `view:install` command to install Tailwind v4:

```bash:no-line-numbers
php leaf view:install --tailwind
```

4. Update your CSS file to remove @tailwind directives:

```css [app/views/css/app.css]
@import "tailwindcss";
@source "../";

@tailwind base; [!code --]
@tailwind components; [!code --]
@tailwind utilities; [!code --]
```

That's it!

## Manual Installation for TW v3

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

Be sure to restart your Leaf server so that Leaf can pick up on the new Vite configuration.
