# Tailwind + Leaf

<!-- markdownlint-disable no-inline-html -->

<script setup>
import TutorialNumber from '@theme/components/shared/TutorialNumber.vue';
</script>

Tailwind is a utility-first CSS framework that provides a set of utility classes to help you build your UI, and is the recommended way to style your Leaf MVC apps.

## Setting Up

***If you are using the Leaf MVC application starter or one of the inertia setups, then all of this is already set up for you. Just restart your server and you are good to go.***

Leaf MVC doesn't force you into any patterns, which is why we do not ship with tailwind by default. However, you can easily set up Tailwind CSS in your Leaf project using the `view:install` command.

::: code-group

<!-- ```bash:no-line-numbers [Leaf CLI]
leaf view:install --tailwind
``` -->

```bash:no-line-numbers [Leaf MVC Console]
php leaf view:install --tailwind
```

:::

This command will install Tailwind CSS v4 and its dependencies, update your vite file, and set up your CSS file to import Tailwind CSS. It will also add your CSS file to Vite as an entry point. From there, you need to head over to your template file and make sure that you are including the CSS file.

## Usage with Blade

To use Tailwind CSS in your Blade views, you can simply include the CSS file in your Blade template:

```blade:no-line-numbers
@vite('css/app.css')
```

An easier way to do this is to add it to a layout file, so you don't have to include it in every view file. If you are not using Blade, you can use the `vite()` function to include the CSS file in your template.

```php:no-line-numbers
<?php vite('css/app.css'); ?>
```

## Basic Theming

Tailwind v4 has extensive support for CSS variables which Leaf takes advantage of. You can easily set up your theme colors in your CSS file like this:

```css:no-line-numbers
@theme {
  --color-primary: #ff0000;
  --color-secondary: #00ff00;
}
```

You can then use these variables in your view files like this:

```blade:no-line-numbers
<div class="bg-primary text-secondary">
  Hello, World!
</div>
```

Pretty sweet! All our scaffolds follow this pattern, so you can easily set up your theme colors in your CSS file and have them applied automatically.

You can check out the [Tailwind docs](https://tailwindcss.com/docs/theme) for more information on theming with Tailwind.
