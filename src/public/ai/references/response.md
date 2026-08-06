# Leaf 5 — Response Reference

## Output Methods

```php
response()->json(['message' => 'Hello']);           // JSON (+ auto Content-Type)
response()->json($data, 201);                       // with status code
response()->plain('Hello, world!');                 // plain text
response()->markup('<h1>Hello</h1>');               // HTML string
response()->page('path/to/file.html');              // static HTML file (not templated)
response()->xml('<xsd:schema ... />');              // XML
response()->noContent();                            // 204 No Content
response()->download('path/to/file.pdf');
response()->download('path/to/file.pdf', 'new-name.pdf', 200);
```

## Templating & Inertia

```php
response()->view('home', ['name' => 'Michael']);    // configured template engine
response()->render('home', ['name' => 'Michael']);  // alias for view()
response()->inertia('home', ['name' => 'Michael']); // Inertia (React/Vue/Svelte)
```

## Redirects

```php
response()->redirect('/example');              // path within app
response()->redirect(['example']);             // by route name
response()->redirect('https://example.com');   // external URL
```

## Halt Execution

```php
response()->exit('An error occurred', 500);    // stops execution — code below won't run
response()->die('An error occurred', 500);     // alias for exit()
```

## Custom Responses

```php
response()
    ->withHeader([
        'Content-Type'        => 'application/pdf',
        'Content-Length'      => $dataLength,
        'Content-Disposition' => "inline; filename=\"$filename\""
    ])
    ->echo($rawData);
```

## Headers

Leaf sets standard content headers automatically. Use `withHeader()` for custom ones.
Chains with any response method:

```php
response()->withHeader('X-Custom', 'value');
response()->withHeader([
    'Content-Type'    => 'application/json',
    'X-Custom-Header' => 'value',
]);

response()
    ->withHeader('X-Custom', 'value')
    ->json(['message' => 'Hello']);
```

## Cookies & Flash

```php
response()->withCookie('name', 'Michael', time() + 86400)->json('...');
response()->withoutCookie('name')->json('...');
response()->withoutCookie(['name', 'other'])->json('...');

response()->withFlash('message', 'Done!')->json('...');
response()->withFlash('message', 'Done!')->redirect('/home');
```

## Passing Data to Next Handler

```php
response()->next('some value');    // pass data to route handler or next middleware
// read with: request()->next()    // consumed on first read, then removed
```

## Utility Header Methods (`Leaf\Http\Headers`)

```php
Leaf\Http\Headers::contentPlain(200);  // text/plain
Leaf\Http\Headers::contentHtml(200);   // text/html
Leaf\Http\Headers::contentXml(200);    // application/xml
Leaf\Http\Headers::contentJSON(200);   // application/json

Leaf\Http\Headers::accessControl('Allow-Origin', 'https://example.com', 200);
Leaf\Http\Headers::accessControl([
    'Allow-Origin'  => '*',
    'Allow-Headers' => '*',
]);
```
