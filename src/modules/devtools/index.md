# Leaf DevTools

Leaf DevTools provides a set of tools for debugging and understanding your Leaf applications. At the Core, the DevTools provide a Chrome extension which is a visual tool with a clean and intuitive UI holding information about your Leaf application and a server bit that is shipped as an installable module in your app.

<img src="https://user-images.githubusercontent.com/26604242/235434208-82ccdd87-6289-43fd-b93b-5fa09e6acd20.jpg" style="border: 1px solid var(--vt-c-theme-soft); border-radius: 8px;" />

## Installation

To get started, you need to install the Chrome Extension from the Chrome Web Store. You can find the extension [here](https://chrome.google.com/webstore/detail/leaf-devtools/ibkfbkmgfjgjgjnhlghhjgjgjgjgjgjg). You only need to install the extension once, and it will be available for all your Leaf apps.

<img src="https://user-images.githubusercontent.com/26604242/235434828-a1200cb2-d48e-49c4-8751-3bcb334d0b95.png" style="border: 1px solid var(--vt-c-theme-soft); border-radius: 8px;">

## Basic Usage

Once you have installed the extension, you need to install the server-side module in the app you're building. You can do this with the Leaf CLI:

```bash
leaf install devtools
```

Or with composer:

```bash
composer require leafs/devtools
```

After that, you need to grant the Chrome extension access to your application. You can do this by adding this line to your app root.

```php
\Leaf\DevTools::install();
```

You can then open your app, check the Chrome inspector and click on the 'Leaf DevTools' tab.

<img src="https://user-images.githubusercontent.com/26604242/235436257-c4a57583-91b9-461f-b348-1d0778c92bc4.png" style="border: 1px solid var(--vt-c-theme-soft); border-radius: 8px;">

::: tip Dev Experience
As you can see, the DevTools are still in beta. We're working on making the experience better and more intuitive. If you have any suggestions, please feel free to open an issue on the [GitHub repo](https://github.com/leafsphp/devtools).
:::

## Application Insights

Leaf DevTools has an insights tab that provides information about your Leaf app, like your application config, routes, cookies, sessions, env and more. This information is useful for debugging and understanding your app and why it behaves the way it does.

<img src="https://user-images.githubusercontent.com/26604242/235470843-a41d09ac-95c1-405d-b893-01c9c165ff89.png" style="border: 1px solid var(--vt-c-theme-soft); border-radius: 8px;">

## Installed Packages

On the packages tab, you can see all the installed packages in your application. The installed packages are separated into two categories: Composer packages and Leaf packages. You can also see the version of each package, a description and a link to the package's GitHub repo.

<img src="https://user-images.githubusercontent.com/26604242/235470968-b1b54baf-3ad5-40b9-ac34-7971eb3e12ac.png" style="border: 1px solid var(--vt-c-theme-soft); border-radius: 8px;">

## Server Console Logs

The server module allows you to log out data which will be displayed in the dev tools console (just like console.log). Since PHP doesn't have any real implementation of something like JavaScript's console.log, we decided to add something like that as it is useful for debugging.

To get started, call the console method on `Leaf\DevTools`

```php
\Leaf\DevTools::console('This data should be logged in the console');
\Leaf\DevTools::console('This is a warning', 'warn');
\Leaf\DevTools::console('This is an error', 'error');
\Leaf\DevTools::console('This is an info message', 'info');
\Leaf\DevTools::console('This is a debug message', 'log');
```

<img src="https://user-images.githubusercontent.com/26604242/235471133-5f438e47-4a2d-4f3e-8c31-45541c588161.png" style="border: 1px solid var(--vt-c-theme-soft); border-radius: 8px;">

## Application Routes

The routes tab shows all the routes in your application. It shows the route's name, method, path, handler and middleware if available.

<img src="https://user-images.githubusercontent.com/26604242/235471215-1de25ac1-422d-4697-85fb-7198df6fbe80.png" style="border: 1px solid var(--vt-c-theme-soft); border-radius: 8px;">

## Extras

Installing the server module also gives you access to the `dump` function from Symfony's VarDumper. You can read more about it [here](https://symfony.com/doc/current/components/var_dumper.html).

```php
dump($data);
```
