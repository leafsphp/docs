# Leaf API Helper Functions 🏥

These are simple-to-use functions that are available everywhere in your application. You can call these functions in your routes, controllers and everywhere you need them.

## Available Functions

### app

**In v1.2 beta, `App` has been renamed to `app`**

This method returns the base Leaf instance. You can perform whatever operation you need on the `app` method.

```php
app()->response()->json(...);
app()->resource("/home", "HomeController");
```

### d

This method returns the leaf date object. You can use any [Leaf Date](leaf/v/2.4-beta/core/date) method on `d`.

```php
$timestamp = d()->random_timestamp();
```

### dbRow

This method returns a row in a database table. It takes in 3 parameters:

- The table to use
- The row id
- The fields to return (optional, will return all if nothing is specified)

```php
$user = dbRow("users", "1");
$item = dbRow("items", 2, "name, user_id");
```

### email

This method allows you to [write an email directly](leaf/v/2.4-beta/core/mail?id=write)

```php
email([
  "subject" => "This is a full Write Test",
  "template" => "./template.html",
  "recepient_email" => "mychi.darko@gmail.com",
  "sender_name" => "Leaf PHP Framework",
  "attachment" => "./../attachment.txt"
]);
```

### fs

This returns the [Leaf FS](leaf/v/2.4-beta/core/fs) object. So you can use all it's methods on `fs`

```php
fs()->create_folder("new_logs");
```

### json <sup class="new-tag-1">New</sup>

This method allows you to output parsed json, and replaces the `respond` and `respondWithCode` methods from base Leaf.

```php
json([
  "message" => "Something"
], 200);
```

### markup

Render markup as a response

```php
markup("<h2>Hello</h2>", 200);
```

### plural

This method allows you to get the plural version of a string.

```php
$word = "todo";
plural($word); // returns "todos"
```

### render

This outputs a blade view.

```php
function user() {
  render("user", ["username" => "Mychi"]);
}
```

### request <sup class="new-tag-1">New</sup>

`request` returns the whole Leaf request or a specific field from the request.

```php
// 1 item
$username = request("username");

// multiple items
$loginData = request(["username", "password"]);
$username = $loginData["username"];

// return leaf request
$allItems = request()->body();
```

### requestBody

`requestBody` returns the whole body of a request.

```php
$loginData = requestBody();
$username = $loginData["username"];
```

### requestData

This method returns a particular parameter in the request body

```php
$username = requestData("username");
```

### response <sup class="new-tag-1">New</sup>

`response` returns the whole Leaf response object or lets you output some json.

```php
// output json
response($data);

// return leaf response
response()->page("index.html");
```

### Route

This method creates a new route. It takes in 3 parameters:

- The route method(s)
- The route
- The handler

```php
Route("GET|POST", "/me", function() {...});
```

### setHeader <sup class="new-tag-1">New</sup>

`setHeader` allows you to set a header for a response.

```php
// output json
setHeader("location", "/redirector", true, 302);

// return leaf setHeader
setHeader()->page("index.html");
```

### singular

This method allows you to get the singular version of a string.

```php
$word = "todos";
singular($word); // returns "todo"
```

### throwErr

Throws a json encoded error with appropraite headers.

```php
throwErr("user not found", 404);
```

Note that `throwErr` pauses code execution, and so, no code after `throwErr` runs. You can use this with conditional statements for a better effect.

```php
if (!$user->isLoggedIn) throwErr("User not logged in");
```

### view

**In v1.2 beta, `View` has been renamed to `view`**

`view` returns a blade view.

```php
$output = view("user", ["username" => "Mychi"]);
```

## Next Steps

- [Routing](/leaf-api/v/2.0/core/routing)
- [Controllers](/leaf-api/v/2.0/core/controllers)
- [Models](/leaf-api/v/2.0/core/models)
- [Migrations](/leaf-api/v/2.0/database/migrations)

Built with ❤ by [**Mychi Darko**](//mychi.netlify.app)
