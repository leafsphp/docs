---
aside: false
---

<!-- markdownlint-disable no-inline-html -->

# Icons for Blade <Badge type="warning">Blade Only</Badge>

Zero provides a wrapper around [HeroIcons](https://heroicons.com/) which allows you to use every HeroIcon right in your Blade component. To get started, you need to install Zero through composer:

::: code-group

```bash:no-line-numbers [Leaf CLI]
leaf install zero
```

```bash:no-line-numbers [Composer]
composer require leafs/zero
```

:::

## Usage

You can use the `@icon` directive to render an icon in your Blade component. The `icon` method accepts the name of the icon you want to render. You can find the name of the icon you want to render on the [HeroIcons website](https://heroicons.com/).

```blade:no-line-numbers
@icon('academic-cap')
```

You can also pass extra options like a class or style to the icon:

```blade:no-line-numbers
@icon('academic-cap', ['class' => 'text-red-500', 'style' => 'font-size: 2rem;'])
```

If you need to render an icon as text, so you can use it in JavaScript, you can use the `@iconText` directive:

```blade:no-line-numbers
@iconText('academic-cap')
```
