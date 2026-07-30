# Dynamic Routing

Dynamic routing allows your app to handle different URLs by using placeholders or variables in the routes. Instead of creating a route for every possible URL, you define flexible routes that adapt to your users' inputs.

An example of dynamic routing is your user profile on Twitter and YouTube. Your profile URL is `https://twitter.com/username` or `https://youtube.com/@username`. The `username` part of the URL is dynamic and can be anything, but it is able to show the profile of the user with that username.

Leaf routes are compiled when they are registered, so dynamic routes stay fast no matter how many you define. Everything is built from one primitive: the named placeholder.

## Named Placeholders

Named placeholders are strings surrounded by curly braces, e.g. `{name}`. They match any value in that segment of the URL and are easy to read at a glance.

Examples:

- `/movies/{id}`
- `/profile/{username}`

You can use named placeholders in your routes by adding them to the route pattern. When a request is made to the route, the placeholders are replaced with the actual values from the URL.

```php
app()->get('/movies/{movieId}', function () {
  echo 'This is the page for a single movie';
});
```

Visiting `/movies/123` will output `This is the page for a single movie`, while visiting `/movies/abc` will output the same thing. This works because the `movieId` placeholder matches any character but our output is the same which may not be the case in a real-world application. We would usually use the `movieId` to fetch the movie with that ID from a database or an API.

To get the actual value of the placeholder, you can pass the placeholder name as an argument to the route handling function.

```php
app()->get('/movies/{movieId}', function ($id) {
  echo 'This is the page for movie #' . $id;
});
```

In the example above, `$id` will contain the value of the `movieId` placeholder. The variable name does not have to match the placeholder name, but it is recommended for clarity.

```php
app()->get('/movies/{foo}/photos/{bar}', function ($movieId, $photoId) {
  echo 'Movie #' . $movieId . ', photo #' . $photoId;
});
```

In the example above, `$movieId` will contain the value of the `foo` placeholder, while `$photoId` will contain the value of the `bar` placeholder, matching the order they appear in the route pattern.

## Optional Parameters

Adding `?` to a placeholder makes it optional, so one route can respond to different variations of the same URL.

```php
app()->get('/posts/{id?}', function ($id = null) {
  if (!$id) {
    echo 'All posts';
    return;
  }

  echo 'Post #' . $id;
});
```

This route responds to both `/posts` and `/posts/42`. When the optional parameter is missing, your handler receives nothing for it, so give the argument a default value like `$id = null` above.

You can chain optional parameters to handle whole URL families with one route:

```php
app()->get('/blog/{year?}/{month?}/{slug?}', function ($year = null, $month = null, $slug = null) {
  if (!$year) {
    echo 'Blog overview';
    return;
  }

  // ...
});
```

This responds to `/blog`, `/blog/2026`, `/blog/2026/07`, and `/blog/2026/07/my-post`. It cuts down the number of routes you define, though separate routes are often easier to read once the handler starts branching heavily.

## Constraints

By default a placeholder matches anything in its URL segment. Adding a constraint after a colon restricts what the placeholder accepts. The constraint is a regular expression that must match the whole value.

```php
app()->get('/movies/{id:[0-9]+}', function ($id) {
  echo 'This is the page for movie #' . $id;
});
```

Now `/movies/123` matches, but `/movies/abc` returns a 404 instead of reaching your handler. Constraints combine with optional parameters too: `{id?:[0-9]+}` is a digits-only parameter that may be missing (the `?` goes right after the name, before the constraint).

Here are a few common constraints to get you started:

- `{id:[0-9]+}` = one or more digits (0-9)
- `{slug:[a-z0-9_-]+}` = lowercase word characters and dashes
- `{year:[0-9]{4}}` = exactly 4 digits
- `{username:\w+}` = one or more word characters (a-z 0-9 _)

Using quantifiers like `{4}` lets you require exact formats: `/blog/{year:[0-9]{4}}/{month:[0-9]{2}}` responds to `/blog/2026/07` but not `/blog/17819090091/07`. You can read more about quantifiers in the [PHP documentation](https://www.php.net/manual/en/regexp.reference.repetition.php).

## How routes are matched

Exact routes always win over dynamic ones. If both `/users/new` and `/users/{id}` are registered, a request to `/users/new` runs the exact route no matter which was registered first. Exact matches are resolved from an index without touching any patterns at all.

When two dynamic routes could match the same URL, the one registered first wins, so declare your more specific dynamic routes before broader ones.

::: warning Coming from Leaf 3 or 4?
Older versions of Leaf allowed raw regular expressions as route patterns, like `/movies/(\d+)` or `/post/{id}(/edit)?`. These are no longer supported: patterns without `{}` placeholders are treated as literal paths. Rewrite them with placeholders, optional parameters, and constraints; the [upgrade guide](/docs/upgrade-guide) has side-by-side examples.
:::
