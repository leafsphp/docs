<!-- markdownlint-disable no-inline-html -->
# Multi-locale support

English is the most widely used language on the web, but it's far from the only one. Supporting multiple languages helps you reach a global audience. Leaf Lingo provides an official solution for adding multi-language support to your Leaf applications, without restructuring your code or adding middleware.

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

Once installed, Lingo automatically sets up everything you need for multi-language support. Define your translation files in the `app/locales` folder using language codes like `en.yml` and `de.yml`, or specific locales like `en_US.yml` and `pt_BR.yml`.

```yaml:no-line-numbers
# app/locales/fr.yml

hero.title: "Bonjour le monde"
```

You can also nest your translations instead of writing out full dot keys. Nested maps are flattened automatically, so both styles produce the same keys:

```yaml:no-line-numbers
# app/locales/fr.yml

hero:
  title: "Bonjour le monde"
  subtitle: "Bienvenue sur notre site"
```

Now you can use the `lingo()` helper function to translate strings in your views or controllers:

```php:no-line-numbers
$heroTitle = lingo('hero.title'); // "Bonjour le monde"
```

In Blade templates, use it the same way:

```blade:no-line-numbers
<h1>@lingo('hero.title')</h1> <!-- "Bonjour le monde" -->
```

## Configuring Lingo

Lingo works out of the box, but you can tweak how it behaves by passing a config array to `lingo()->create()`:

```php
lingo()->create([
    'locales.default' => 'en_US',
    'locales.path' => 'app/locales',
    'locales.strategy' => 'session',
]);
```

::: details All config options

| Option | Default | Description |
| --- | --- | --- |
| `locales.default` | `en_US` | The locale used when no other locale can be determined. |
| `locales.available` | `[]` | Filled automatically from your translation files, one locale per `.yml` file. |
| `locales.path` | `locales` | The folder containing your translation files. |
| `locales.strategy` | `router` | How Lingo determines the current locale: `router`, `header`, `session` or `custom`. |
| `locales.customStrategy` | `null` | The handler class to use when the strategy is set to `custom`. |
| `locales.cacheKey` | `__lingo.locale__` | The session key used to remember the selected locale in session mode. |

:::

## Lingo Modes

By default, Lingo uses routes for the translation strategy which means that if you have routes like this in your Leaf app:

```php
app()->get('/home', fn () => response()->render('home'));

app()->get('/about', fn () => response()->render('about'));
```

Lingo automatically creates routes for each language:

```txt
/en/home
/fr/home
/en/about
/fr/about
```

The routes are generated based on your translation files. If you have `de.yml` and `fr.yml`, Lingo creates routes for `/de/*` and `/fr/*`.

It also redirects requests to base paths (like `/home`) to the default language route (e.g., `/en/home`). Set your default language in `.env` with `APP_LOCALE=...`.

### Header Mode

Use header mode when building an API that needs to support multiple languages via the `Accept-Language` header. In this mode, Lingo doesn't create language-specific routes. Instead, it determines the language from the `Accept-Language` header sent by the client.

For example, a request with `Accept-Language: fr` uses French translations, even though the route isn't prefixed with `/fr`.

Lingo parses the full header, including quality values, so a header like `en-GB,en;q=0.9,fr;q=0.8` is checked in order of preference. `en-GB` maps to `en_GB`, and if there's no exact match Lingo falls back to the plain language file (`en.yml`), then to any regional file for that language (like `en_US.yml`), before settling on your default locale.

To enable header mode, you need to set the following in your `.env` file:

```env
LOCALES_STRATEGY=header
```

### Session Mode

Use session mode when you want users to switch languages without changing the URL. Lingo stores the selected language in the user's session, so the choice is remembered across requests until they pick another language. Like header mode, session mode doesn't create language-specific routes.

To enable session mode, you need to set the following in your `.env` file:

```env
LOCALES_STRATEGY=session
```

### Custom Strategies

If none of the built-in strategies fit your app, you can write your own. A strategy is a class implementing the `Leaf\Lingo\Handler` interface, which has three methods: `create()` for setup, `setCurrentLocale()` and `getCurrentLocale()`.

```php
use Leaf\Lingo\Handler;

class SubdomainStrategy implements Handler
{
    protected static array $config = [];

    public static function create(array $config): static
    {
        static::$config = $config;
        return new static();
    }

    public static function setCurrentLocale(string $locale): void
    {
        // save the user's selected locale
    }

    public static function getCurrentLocale(): ?string
    {
        // determine the locale, e.g. from a subdomain like fr.example.com
        $subdomain = explode('.', $_SERVER['HTTP_HOST'] ?? '')[0];

        return in_array($subdomain, static::$config['locales.available'])
            ? $subdomain
            : static::$config['locales.default'];
    }
}
```

You can then tell Lingo to use your strategy:

```php
lingo()->create([
    'locales.strategy' => 'custom',
    'locales.customStrategy' => SubdomainStrategy::class,
]);
```

## Switching Locales

Lingo uses the same approach for switching locales across all modes. Use the `lingo()->setCurrentLocale()` method to create a route that handles locale switching. The method switches the current locale based on your configured strategy (routes or session).

In header mode, this method has no effect since the locale is determined by the `Accept-Language` header.

Here is an example of how to create a route for switching locales:

```php
app()->post('/language/switch', function() {
    $locale = request()->get('locale');

    return lingo()->setCurrentLocale($locale);
});
```

`setCurrentLocale()` will automatically redirect the user to the expected location based on the strategy you are using.

### Switcher Templating

Create a simple language switcher in your views. Here's an example in Blade:

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

`getAvailableLocalesWithNames()` returns an array with locale codes as keys and language names as values, making it easy to create dropdowns or other UI elements:

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

Use `getAvailableLocales()` if you only need the locale codes:

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

You now have everything you need to display translations and switch languages in your Leaf application with Lingo!

### Current Locale Info

You can retrieve information about the current locale using the following methods:

- `lingo()->getCurrentLocale()`: Returns the current locale code (e.g., `en_US`, `de`, ...).
- `lingo()->getCurrentLanguage()`: Returns the current language code (not including region, e.g., `en`, `de`, ...).
- `lingo()->getDefaultLocale()`: Returns the default locale code as defined in your `.env` file or configuration.
- `lingo()->is()`: Checks if the current locale matches a given locale code.

## Translation Parameters

Lingo supports translation parameters for inserting dynamic values into translations. Define placeholders in your translation strings using the `{{ parameterName }}` or `$parameterName` syntax:

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

## Multi-language routes <Badge>Router Mode Only</Badge>

Some applications need multi-language routes where URL segments are translated based on the current locale. For example, `/en/products` could be `/fr/produits` in French. Lingo supports this through Leaf's route parameters. Define your routes as usual, then pass route variants as an array:

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

Leaf automatically handles routing based on the current locale. Switching locales redirects users to the appropriate translated route without any additional handling.

Note that this feature only works with Lingo's route-based strategy.

## Disabling Auto-Route Generation <Badge>Router Mode Only</Badge>

By default, Lingo's route-based strategy generates localized routes for all your routes. To disable this for specific routes, set `lingo.routes` to `false`:

```php
app()->get('/contact', [
    'lingo.routes' => false,
    'ContactController@index'
]);
```

This is useful for routes that shouldn't be localized, like API endpoints or routes that should be language-independent.

## Lingo URL <Badge>Router Mode Only</Badge>

When using Lingo's route-based strategy, you can generate localized URLs using the `lingo()->url()` method. This method takes a path as an argument and returns the localized URL based on the current locale.

```php
$url = lingo()->url('home'); // e.g., "/en/home" or "/fr/home"
```

In non-route-based strategies, this method returns the path unchanged.

## Using Variants

The `variants()` method lets you define different string variants based on the current locale. This is useful for localizing routes or strings outside your translation files:

```php
$localizedRoute = lingo()->variants([
    'en' => '/products',
    'fr' => '/produits',
    'es' => '/productos',
]);
// e.g., "/en/products" or "/fr/produits" or "/es/productos"
```

You can also use variants for text, URLs, or other strings:

```php
$greeting = lingo()->variants([
    'en' => 'Hello',
    'fr' => 'Bonjour',
    'es' => 'Hola',
]);
// e.g., "Hello" or "Bonjour" or "Hola"
```

For most text, translation files are better because they're more organized and maintainable. Use `variants()` for one-off translations or localized routes.
