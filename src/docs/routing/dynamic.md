# Dynamic Routing
<!-- markdownlint-disable no-inline-html -->

<!-- ::: tip Video Docs
Learn how leaf handles dynamic routing.

<VideoLesson href="#" title="Dynamic routing in leaf PHP">Watch the routing guide on youtube</VideoLesson>
::: -->

## Named Params

*This guide assumes you have read [Simple Routing](/docs/routing/)*

Basically, Dynamic Placeholder-based Route Patterns are just another way to use routes dynamically. This type of Route Patterns are the same as Dynamic PCRE-based Route Patterns, but with one difference: they don't use regexes to do the pattern matching but they use the more easy placeholders instead. Placeholders are strings surrounded by curly braces, e.g. {name}. You don't need to add parens around placeholders.

Examples

- /movies/{id}
- /profile/{username}

Placeholders are easier to use than PRCEs, but offer you less control as they internally get translated to a PRCE that matches any character (.*).

<div class="functional-mode">

```php
app()->get('/movies/{movieId}/photos/{photoId}', function ($movieId, $photoId) {
  echo 'Movie #' . $movieId . ', photo #' . $photoId;
});
```

</div>
<div class="class-mode">

```php
$app->get('/movies/{movieId}/photos/{photoId}', function ($movieId, $photoId) {
  echo 'Movie #' . $movieId . ', photo #' . $photoId;
});
```

</div>

**Note:** the name of the placeholder does not need to match with the name of the parameter that is passed into the route handling function...although it's adviced:

<div class="functional-mode">

```php
app()->get('/movies/{foo}/photos/{bar}', function ($movieId, $photoId) {
  echo 'Movie #' . $movieId . ', photo #' . $photoId;
});
```

</div>
<div class="class-mode">

```php
$app->get('/movies/{foo}/photos/{bar}', function ($movieId, $photoId) {
  echo 'Movie #' . $movieId . ', photo #' . $photoId;
});
```

</div>

## PCRE Based Params

Basically, PCRE based patterns are just another way to use routes dynamically. This type of Route Patterns contain dynamic parts which can vary per request. The varying parts are named subpatterns and are defined using regular expressions.

Examples

- /movies/(\d+)
- /profile/(\w+)

Commonly used PCRE-based subpatterns within Dynamic Route Patterns are:

- \d+ = One or more digits (0-9)
- \w+ = One or more word characters (a-z 0-9 _)
- [a-z0-9_-]+ = One or more word characters (a-z 0-9 _) and the dash (-)
- .* = Any character (including /), zero or more
- [^/]+ = Any character but /, one or more

Note: The PHP PCRE Cheat Sheet might come in handy.

The subpatterns defined in Dynamic PCRE-based Route Patterns are converted to parameters which are passed into the route handling function. Prerequisite is that these subpatterns need to be defined as parenthesized subpatterns, which means that they should be wrapped between parens:

<div class="functional-mode">

```php
// Bad
app()->get('/hello/\w+', function ($name) {
  echo 'Hello ' . htmlentities($name);
});

// Good
app()->get('/hello/(\w+)', function ($name) {
  echo 'Hello ' . htmlentities($name);
});
```

</div>
<div class="class-mode">

```php
// Bad
$app->get('/hello/\w+', function ($name) {
  echo 'Hello ' . htmlentities($name);
});

// Good
$app->get('/hello/(\w+)', function ($name) {
  echo 'Hello ' . htmlentities($name);
});
```

</div>

**Note**: The leading `/` at the very beginning of a route pattern is not mandatory, but is recommended.

When multiple subpatterns are defined, the resulting route handling parameters are passed into the route handling function in the order they are defined in:

<div class="functional-mode">

```php
app()->get('/movies/(\d+)/photos/(\d+)', function ($movieId, $photoId) {
  echo 'Movie #' . $movieId . ', photo #' . $photoId;
});
```

</div>
<div class="class-mode">

```php
$app->get('/movies/(\d+)/photos/(\d+)', function ($movieId, $photoId) {
  echo 'Movie #' . $movieId . ', photo #' . $photoId;
});
```

</div>
