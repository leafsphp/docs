# Dynamic Routing

Dynamic routing allows your app to handle different URLs by using placeholders or variables in the routes. Instead of creating a route for every possible URL, you define flexible routes that adapt to your users' inputs.

An example of dynamic routing is your user profile on Twitter and YouTube. Your profile URL is `https://twitter.com/username` or `https://youtube.com/@username`. The `username` part of the URL is dynamic and can be anything, but it is able to show the profile of the user with that username.

Leaf allows you to create dynamic routes using placeholders or regular expressions. Placeholders are easier to use, while regular expressions give you more control over the route pattern.

## Named Placeholders

Named placeholders are strings surrounded by curly braces, e.g. `{name}`. They are easy to use and are translated to regular expressions that match any character. They are also easier to read and understand, which makes them great for simple dynamic routes.

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

In the example above, `$movieId` will contain the value of the `foo` placeholder, while `$photoId` will contain the value of the `bar` placeholder.

## Regular Expressions

Regular expressions (specifically PCREs) allow you to create more complex route patterns that Leaf can match against. This gives you more control over the route pattern and allows you to create more specific routes. For instance, you can create a route that only matches numbers or email addresses.

Examples:

- `/movies/(\d+)`
- `/profile/(\w+)`

You can use regular expressions in your routes by adding them to the route pattern. When a request is made to the route, Leaf will match the URL against the regular expression and pass the matched values to the route handling function.

```php
app()->get('/movies/(\d+)', function ($id) {
  echo 'This is the page for movie #' . $id;
});
```

If you have multiple placeholders in your route pattern, Leaf will pass the matched values to the route handling function in the order they appear in the route pattern.

```php
app()->get('/movies/(\d+)/photos/(\d+)', function ($movieId, $photoId) {
  echo 'Movie #' . $movieId . ', photo #' . $photoId;
});
```

In the example above, `$movieId` will contain the value of the first placeholder, while `$photoId` will contain the value of the second placeholder.

If you are a fan of finer control, regular expressions are the way to go. You can check out the [PHP PCRE documentation](https://github.com/cornernote/cheat-sheet/blob/master/PHP%20PCRE%20Cheat%20Sheet.pdf) for more information on regular expressions in PHP.

Here are a few examples of common PCRE subpatterns to get you started:

- \d+ = One or more digits (0-9)
- \w+ = One or more word characters (a-z 0-9 _)
- [a-z0-9_-]+ = One or more word characters (a-z 0-9 _) and the dash (-)
- .* = Any character (including /), zero or more
- [^/]+ = Any character but /, one or more

While parentheses `()` are not required, they are a good way to keep your code clean and readable. They also allow you to group parts of the regular expression together, which can be useful for more complex patterns.

```php
app()->get('/movies/(\d+)', function ($id) {
  echo 'This is the page for movie #' . $id;
});
```
