# Optional Route Sub-patterns

Optional Route Sub-patterns allow parts of a route to be, well, optional! This means a user can visit different variations of the same URL, and your app will still respond correctly.

For example, you could have a route like `/post/{id}(/edit)?`, where `{id}` is required, but `/edit` is optional. This allows both /post/1 and /post/1/edit to be valid routes. The optional part is denoted by the `?` character.

```php
app()->get('/post/{id}(/edit)?', function () {
    echo 'Hello this is a post';
});
```

While this might seem simple, it's important to note that the optional part should be inside the sub-pattern itself. The leading `/` of the sub-pattern should be inside the sub-pattern otherwise, you might end up with unexpected results.

## Using Regular Expressions

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

## Successive Optional Sub-patterns

This scary-sounding term means that you can have multiple optional sub-patterns in a row. This is done by nesting the optional sub-patterns inside each other. This is important because it ensures that the optional parts are correctly matched. For example, the example above which is `/blog(/\d+)?(/\d+)?(/\d+)?(/[a-z0-9_-]+)?` can respond to `/blog/somecrazystring` which is not what we want. To fix this, we can nest the optional sub-patterns like this:

```php
app()->get('/blog(/\d+(/\d+(/\d+(/[a-z0-9_-]+)?)?)?)?', function ($year = null, $month = null, $day = null, $slug = null) {
    // ...
});
```

What we've done here is place the sub-patterns inside each other, instead of leaving them next to each other. This ensures that the optional parts are correctly matched and that the route only responds to the correct URLs. Now accessing `/blog/somecrazystring` will not match this route.

## Quantifiers

In the examples above, we used `\d+` to match one or more digits. You can use quantifiers to require a specific number of digits in the URL. For example, you could use `\d{4}` to match exactly 4 digits. This can be useful when you want to ensure that the URL matches a specific format. You can read more about quantifiers in the [PHP documentation](https://www.php.net/manual/en/regexp.reference.repetition.php). Let's update our example to require exactly 4 digits for the year, 2 digits for the month, and 2 digits for the day:

```php
app()->get('/blog(/\d{4}(/\d{2}(/\d{2}(/[a-z0-9_-]+)?)?)?)?', function ($year = null, $month = null, $day = null, $slug = null) {
    // ...
});
```

This ensures that the route only responds to URLs like `/blog/2021/01/01/slug` and not `/blog/17819090091/01/01/slug`.
