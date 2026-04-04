<!-- markdownlint-disable no-inline-html -->
# Multi-locale support [BETA]

English is the most widely used language on the web, but it's not the only one. If you want to reach a global audience, you need to support multiple languages in your application. Leaf Lingo provides a first-party solution for adding multi-language support to your Leaf applications. With Lingo, you can provide translations for your application in multiple languages, and easily switch between them based on the user's preferences without having to alter your code structure or add any middleware.

## Installation

You can easily install Lingo using [Composer](https://getcomposer.org/).

<div class="flex gap-2"><a href="https://packagist.org/packages/leafs/lingo" target="_blank" rel="noreferrer"><img src="http://poser.pugx.org/leafs/lingo/v" alt="Latest Stable Version"></a><a href="https://packagist.org/packages/leafs/lingo" target="_blank" rel="noreferrer"><img src="http://poser.pugx.org/leafs/lingo/downloads" alt="Total Downloads"></a><a href="https://packagist.org/packages/leafs/lingo" target="_blank" rel="noreferrer"><img src="http://poser.pugx.org/leafs/lingo/license" alt="License"></a></div>

::: code-group

```bash:no-line-numbers [Leaf CLI]
leaf install lingo
```

```bash:no-line-numbers [Composer]
composer require leafs/lingo
```

:::

Once installed, Lingo will automatically set up everything you need to get started with multi-language support in your Leaf application. You can start defining your translation files in the `app/locales` folder. Translation files are written in YML, and can use languages like `en.yml` and `de.yml` or specific locales like `en_US.yml` and `pt_BR.yml`.

```yaml:no-line-numbers
# app/locales/fr.yml

hero.title: "Bonjour le monde"
```

From there, you can use the `lingo()` helper function to translate strings in your views or controllers.

```php:no-line-numbers
$heroTitle = lingo('hero.title'); // "Bonjour le monde"
```

In a Blade template, you can use it like this:

```blade:no-line-numbers
<h1>@lingo('hero.title')</h1> <!-- "Bonjour le monde" -->
```

## Lingo Modes

By default, Lingo uses routes for the translation strategy which means that if you have routes like this in your Leaf app:

```php
app()->get('/home', function() {
    return response()->render('home');
});

app()->get('/about', function() {
    return response()->render('about');
});
```

Lingo will automatically create routes for each language like this:

```txt
/en/home
/fr/home
/en/about
/fr/about
```

This will be done automatically for you, based on the locales you have defined in your translation files. If you have `de.yml` and `fr.yml`, Lingo will create routes for `/de/*` and `/fr/*`. It will also set up redirects so that if a user visits `/home`, they will be redirected to the default language route, e.g. `/en/home`. The default language can be configured in your `.env` file with `APP_LOCALE=...`.

### Header Mode <Badge type="warning">Experimental</Badge>

Header mode is useful when you are building an API with Leaf and want to support multiple languages based on the `Accept-Language` header sent by the client. In this mode, Lingo will **not** create language-specific routes, but will instead determine the language to use based on the `Accept-Language` header.

For example, if a client sends a request with the header `Accept-Language: fr`, Lingo will use the French translations for that request, even though the route is **not** prefixed with `/fr`.

To enable header mode, you need to set the following in your `.env` file:

```env
LOCALES_STRATEGY=header
```

### Session Mode <Badge type="warning">Experimental</Badge>

Session mode is useful when you want to allow users to switch languages without changing the URL structure. In this mode, Lingo will store the selected language in the user's session. When a user selects a language, Lingo will update the session with the chosen language, and all subsequent requests will use that language for translations. Again, there will be no language-specific routes created in this mode.

To enable session mode, you need to set the following in your `.env` file:

```env
LOCALES_STRATEGY=session
```

## Switching Locales

Lingo uses the same approach for switching locales regardless of the mode you are using. You can use the `lingo()->setCurrentLocale()` method to create a route that handles locale switching. This will switch the current locale based on the strategy you have configured (routes or session). In header mode, this method will not have any effect since the locale is determined by the `Accept-Language` header.

Here is an example of how to create a route for switching locales:

```php
app()->post('/language/switch', function() {
    $locale = request()->get('locale');

    return lingo()->setCurrentLocale($locale);
});
```

`setCurrentLocale()` will automatically redirect the user to the expected location based on the strategy you are using.

### Switcher Templating

You can create a simple language switcher in your views. Here is an example of how to do this in a Blade template:

```php
<form method="post" action="/language/switch">
  <select name="locale" onchange="this.form.submit()">
    @foreach(lingo()->getAvailableLocalesWithNames() as $locale => $name)
        <option value="{{ $locale }}" {{ lingo()->getCurrentLocale() === $locale ? 'selected' : '' }}>{{ $name }}</option>
    @endforeach
  </select>
</form>

<h1>@lingo('welcome.title')</h1>
```

`getAvailableLocalesWithNames()` will return an array with the available locales as keys and the language names as values, so you can easily create a dropdown or any other UI element for switching languages, eg:

```php
[
    'en_US' => 'English (US)',
    'es' => 'Español',
    'it' => 'Italiano',
    'zh' => '中文',
    'zh_CN' => '简体中文',
    'fr_FR' => 'Français (France)',
    'de_DE' => 'Deutsch (Deutschland)',
]
```

You can also use `getAvailableLocales()` if you just want the locale codes, eg:

```php
[
    'en_US',
    'es',
    'it',
    'zh',
    'zh_CN',
    'fr_FR',
    'de_DE',
]
```

Now you should be able to display translations and switch between languages in your Leaf application using Lingo!

### Current Locale Info

You can retrieve information about the current locale using the following methods:

- `lingo()->getCurrentLocale()`: Returns the current locale code (e.g., `en_US`, `de`, ...).
- `lingo()->getCurrentLanguage()`: Returns the current language code (not including region, e.g., `en`, `de`, ...).
- `lingo()->getDefaultLocale()`: Returns the default locale code as defined in your `.env` file or configuration.
- `lingo()->is()`: Checks if the current locale matches a given locale code.

## Translation Parameters

Lingo supports translation parameters, allowing you to insert dynamic values into your translations. You can define placeholders in your translation strings using the `{{ parameterName }}` or `$parameterName` syntax. For example:

```yaml
# app/locales/en.yml

greeting.message: "Hello, {{ name }}! Welcome to our website."
farewell.message: "Goodbye, $name! See you next time."
```

You can then pass an associative array of parameters to the `lingo()` function to replace the placeholders with actual values:

```php
$message1 = lingo('greeting.message', ['name' => 'John']); // "Hello, John! Welcome to our website."
$message2 = lingo('farewell.message', ['name' => 'John']); // "Goodbye, John! See you next time."
```

## Multi-language routes

Some applications may require multi-language routes where certain parts of the URL are translated based on the current locale. For example, you might want `/en/products` to be `/fr/produits` in French. Lingo supports this functionality through Leaf's route parameters. Just define your routes as you always would, and then pass the route variants as an array to the route definition:

```php
app()->get('/products', [
    'lingo.routes' => [
        'en' => '/products',
        'fr' => '/produits',
        'de' => '/produkte',
    ],
    'ProductsController@index'
]);
```

Leaf will automatically handle the routing based on the current locale, allowing you to have translated routes in your application. Switching between locales will still work as expected, and users will be redirected to the appropriate translated route, so no additional handling is required on your part.

Note that this feature only works with Lingo's route-based strategy.

## Lingo URL

When using Lingo's route-based strategy, you can generate localized URLs using the `lingo()->url()` method. This method takes a path as an argument and returns the localized URL based on the current locale.

```php
$url = lingo()->url('home'); // e.g., "/en/home" or "/fr/home"
```

If you are not using the route-based strategy, this method will simply return the path as is.

## Using Variants

Lingo provides a convenient method called `variants()` that allows you to define different string variants based on the current locale. This is particularly useful for localizing routes or other strings that may not be part of the translation files.

```php
$localizedRoute = lingo()->variants([
    'en' => '/products',
    'fr' => '/produits',
    'es' => '/productos',
]);
// e.g., "/en/products" or "/fr/produits" or "/es/productos"
```

Variants aren't just limited to routes; you can use them for text, URLs, or any other strings that need localization based on the current locale.

```php
$greeting = lingo()->variants([
    'en' => 'Hello',
    'fr' => 'Bonjour',
    'es' => 'Hola',
]);
// e.g., "Hello" or "Bonjour" or "Hola"
```

We recommend using the translation files instead of `variants()` for most text translations, as it provides better organization and maintainability. However, `variants()` can be useful for quick translations which are non-repetitive or for localized routes.
