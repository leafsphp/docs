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

## Optional Route Sub-patterns

Optional Route Sub-patterns allow parts of a route to be, well, optional! This means a user can visit different variations of the same URL, and your app will still respond correctly.

For example, you could have a route like `/post/{id}(/edit)?`, where `{id}` is required, but `/edit` is optional. This allows both /post/1 and /post/1/edit to be valid routes. The optional part is denoted by the `?` character.

```php
app()->get('/post/{id}(/edit)?', function () {
    echo 'Hello this is a post';
});
```

While this might seem simple, it's important to note that the optional part should be inside the sub-pattern itself. The leading `/` of the sub-pattern should be inside the sub-pattern otherwise, you might end up with unexpected results.

### Using Regular Expressions

The example above showed `/post/{id}(/edit)?`, but you can also use regular expressions to define optional sub-patterns. For example, you could have `/post/(\d+)(/edit)?` to match `/post/1` and `/post/1/edit`. You can also use more complex regular expressions to match more complex URLs. Let's look at an example:

```php
app()->get('/blog(/\d+)?(/\d+)?(/\d+)?(/[a-z0-9_-]+)?', function ($year = null, $month = null, $day = null, $slug = null) {
    if (!$year) {
        echo 'Blog overview';
        return;
    }

    if (!$month) {
        echo 'Blog year overview';
        return;
    }

    if (!$day) {
        echo 'Blog month overview';
        return;
    }

    if (!$slug) {
        echo 'Blog day overview';
        return;
    }

    echo 'Blogpost ' . htmlentities($slug) . ' detail';
});
```

With this example, we can respond to URLs like `/blog`, `/blog/{year}`, `/blog/{year}/{month}`, `/blog/{year}/{month}/{day}`, and `/blog/{year}/{month}/{day}/slug` all with a single route. This is a powerful feature that can significantly reduce the number of routes you need to define, however, it has the downside of being harder to read and understand compared to defining separate routes.

### Successive Optional Sub-patterns

This scary-sounding term means that you can have multiple optional sub-patterns in a row. This is done by nesting the optional sub-patterns inside each other. This is important because it ensures that the optional parts are correctly matched. For example, the example above which is `/blog(/\d+)?(/\d+)?(/\d+)?(/[a-z0-9_-]+)?` can respond to `/blog/somecrazystring` which is not what we want. To fix this, we can nest the optional sub-patterns like this:

```php
app()->get('/blog(/\d+(/\d+(/\d+(/[a-z0-9_-]+)?)?)?)?', function ($year = null, $month = null, $day = null, $slug = null) {
    // ...
});
```

What we've done here is place the sub-patterns inside each other, instead of leaving them next to each other. This ensures that the optional parts are correctly matched and that the route only responds to the correct URLs. Now accessing `/blog/somecrazystring` will not match this route.

### Quantifiers

In the examples above, we used `\d+` to match one or more digits. You can use quantifiers to require a specific number of digits in the URL. For example, you could use `\d{4}` to match exactly 4 digits. This can be useful when you want to ensure that the URL matches a specific format. You can read more about quantifiers in the [PHP documentation](https://www.php.net/manual/en/regexp.reference.repetition.php). Let's update our example to require exactly 4 digits for the year, 2 digits for the month, and 2 digits for the day:

```php
app()->get('/blog(/\d{4}(/\d{2}(/\d{2}(/[a-z0-9_-]+)?)?)?)?', function ($year = null, $month = null, $day = null, $slug = null) {
    // ...
});
```

This ensures that the route only responds to URLs like `/blog/2021/01/01/slug` and not `/blog/17819090091/01/01/slug`.
