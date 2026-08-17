# Leaf 5 — Request Reference

All input is auto-sanitized by default. Pass `false` to disable.

## Getting Data

`get()` works for all request types — query params, form, files, JSON:

```php
$item = request()->get('item');                         // single item (sanitized)
$data = request()->get(['name', 'email']);              // multiple → assoc array
$data = request()->get('data', false);                  // sanitization off
$body = request()->body();                              // full request body
$body = request()->body(false);                         // full body, no sanitization
$name = request()->params('name', 'John Doe');          // with default value
```

### Type-specific getters

```php
$name = request()->query('name', 'John Doe');           // GET / URL query only
$name = request()->postData('name', 'John Doe');        // POST/PUT/PATCH only
$file = request()->files('file');                       // $_FILES
```

### `try()` — only return keys present in the request

```php
$data = request()->try(['name', 'email']);              // only existing keys
$data = request()->try(['name', 'email'], false);       // sanitization off
$data = request()->try(['name', 'email'], false, true); // also skip empty strings
```

## File Uploads

Requires Leaf FS (`leaf install fs@v4` if not on MVC).

```php
$info = request()->upload('profile_pic', './uploads');

// Custom filename
$info = request()->upload('profile_pic', './uploads', [
    'name'   => 'new_name',
    'rename' => true,
]);
```

### Return shape

On success, `upload()` returns an array with these keys:

```php
[
    'name'      => 'photo.png',            // final stored filename
    'size'      => 52436,                  // bytes
    'type'      => 'image',                // derived from the extension
    'path'      => 'uploads/photo.png',    // normalized path on disk
    'extension' => 'png',
    'url'       => 'https://myapp.test/uploads/photo.png',
]
```

If the file input holds multiple files, you get an array of these arrays instead, one per file.

The `url` is built from the `APP_URL` env value. When `APP_URL` may be unset, building your own URL from `name` (or `path`) is more reliable than trusting `url`.

On failure, `upload()` returns `false`. A missing file or a rejected extension puts the message in `request()->errors()`; failures inside the filesystem layer (size limit, existing file, move errors) land in `\Leaf\FS\File::errors()` instead, so check both when debugging.

### Config options

```php
request()->upload('doc', './uploads', [
    'name'       => 'report',      // store under this name
    'rename'     => true,          // timestamp-prefix the name if a file already exists
    'overwrite'  => false,         // replace an existing file with the same name
    'maxSize'    => 5_000_000,     // max bytes, 0 = unlimited
    'extensions' => ['pdf'],       // allowed extensions, checked before storing
    'validate'   => true,          // enable allowedTypes/allowedExtensions checks
    'allowedTypes'      => ['image'],
    'allowedExtensions' => ['png', 'jpg'],
]);
```

When neither `rename` nor `overwrite` is set and the destination file exists, the upload fails rather than clobbering the file.

## Headers

```php
$all         = request()->headers();                    // all headers (sanitized)
$contentType = request()->headers('Content-Type');      // specific header
$all         = request()->headers(safeData: false);  // no sanitization
$contentType = request()->headers('Content-Type', false);
```

## Validation

`validate()` returns only the validated fields on success, `false` on failure.

```php
app()->post('/register', function () {
    $data = request()->validate([
        'name'     => 'text',
        'email'    => 'email',
        'password' => 'min:8',
    ]);

    if (!$data) {
        $errors = request()->errors();  // validation error messages
        response()->json(['errors' => $errors], 422);
        return;
    }

    // $data = only the validated fields
});
```

## Client Info

```php
request()->getIp();                            // client IP (may be proxy IP)
request()->getUserLocation();                  // geo data from client IP
request()->getLocationFromIp('1.2.3.4');       // geo data for specific IP
```

`getUserLocation()` returns: `country`, `countryCode`, `region`, `regionName`, `city`, `zip`, `lat`, `lon`, `timezone`, `currency`, `ip`, `continent`, `continentCode`.

> `getIp()` may return the proxy/load-balancer IP. Validate before using for rate limiting or logging.

## Request Metadata

```php
request()->getHost();             // "leafphp.dev"
request()->getHostWithPort();     // "leafphp.dev:80"
request()->getPort();             // 80
request()->getScheme();           // "http" or "https"
request()->getPath();             // root URI + resource URI
request()->getUrl();              // scheme + host (+ port if non-standard)
request()->getReferrer();         // referrer URL
request()->getUserAgent();        // user agent string
request()->getContentType();      // "application/json;charset=utf-8"
request()->getMediaType();        // "application/json"
request()->getMediaTypeParams();  // ['charset' => 'utf-8']
request()->getContentCharset();   // "utf-8"
request()->getContentLength();    // content length in bytes
```

## Request Type Checks

```php
request()->typeIs('GET');         // case-insensitive: 'GET', 'post', 'Delete' all work
request()->isAjax();              // XHR check
request()->isXhr();               // alias for isAjax()
request()->isFormData();          // multipart/form-data

if (request()->typeIs('GET')) {
    return response()->exit('GET not allowed', 405);
}
```
