# Leaf 5: CORS Reference

## Installation

```bash
leaf install cors
```

**MVC:** works automatically after install.
**Basic/Lite:** initialize manually before your routes:

```php
app()->cors();
// ... routes follow
```

## Configuration

### MVC: via `.env`

```env
CORS_ALLOWED_ORIGINS='/\.example\.com$/'
CORS_ALLOWED_METHODS='GET,HEAD,PUT,PATCH,POST,DELETE'
CORS_ALLOWED_HEADERS='*'
```

For dynamic config (e.g. a function for `origin`), publish the config file:

```bash
leaf config:publish cors
# → config/cors.php
```

### Basic/Lite: inline

```php
app()->cors([
    'origin'  => ['http://example.com', 'http://example.org'],
    'methods' => ['GET', 'POST'],
]);
```

## All Options

| Option | Type | Description |
|---|---|---|
| `origin` | String, RegExp, Array | `Access-Control-Allow-Origin` |
| `methods` | String or Array | `Access-Control-Allow-Methods` |
| `allowedHeaders` | String or Array | `Access-Control-Allow-Headers`. Defaults to request's `Access-Control-Request-Headers`. |
| `exposedHeaders` | String or Array | `Access-Control-Expose-Headers` |
| `credentials` | Boolean | `Access-Control-Allow-Credentials` |
| `maxAge` | Integer | `Access-Control-Max-Age` |
| `preflightContinue` | Boolean | Pass preflight to next handler |
| `optionsSuccessStatus` | Integer | Status for `OPTIONS` requests. Default `204`; use `200` for IE11/SmartTV. |

## `origin` Examples

```php
'origin' => 'http://example.com'                          // exact match
'origin' => '/^https:\/\/(.*\.)?example\.com$/'          // regex, anchored so evil-example.com never matches
'origin' => ['http://example1.com', '/\.example2\.com$/'] // array: string + regex
```
