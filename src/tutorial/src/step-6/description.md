# Dynamic routing

Let's take a look at user profiles on twitter. Every user has a unique url, like `twitter.com/leafphp` or `twitter.com/mychidarko`. How does twitter have a page for every single user? Well, the answer is dynamic routing.

Instead of having a static url like `leafphp.dev/docs/`, we can have a part of the url which behaves like a variable. Any value can be passed in there, and can be retrieved in the handling function to perform some action.

Although this sounds super complex, leaf makes it really easy to do this. Let's look at an example:

```php
<?php

require __DIR__ . '/vendor/autoload.php';

app()->get('/users/{id}', function () {
  response()->markup('hello world');
});

app()->run();
```

In the example above, we defined a route that takes in a user id, so we can do something like `/users/1`. You can paste this in the editor and try it out. Don't forget to add the url you want to test in the `request.json` file.

You can try `/users/anything` and you'll see that the route still works. The route will output `hello world`, but you might be asking how we actually get the dynamic item in the route. That's also simple. Leaf automatically creates a variable available in handling function for your route. Let's look at how this works:

```php{5}
<?php

require __DIR__ . '/vendor/autoload.php';

app()->get('/users/{id}', function ($id) {
  response()->markup("This is user $id");
});

app()->run();
```

Note that we passed the dynamic value as a variable into the handling function: `function ($id)`. `$id` will now hold the data which the user passes into that field. Now, if we run this in the editor, our output will be `this is user 1` or anything you pass into the route.

Now try recreating the twitter experience in the editor. Create a route that takes in a dynamic username. When this route is run, output the username that was passed into the url.

- Create a route that takes in a dynamic username
- Output the username that was passed into the url
- **Replace `// 1. your app here` with your route**

## Limiting dynamic routes to specific values

Using the example above, we actually expect the user to pass in a user id which is a number, but we saw that accessing `/users/anything` still worked. We may not want this in some cases, so we can limit the dynamic route to only accept specific values using <a href="/docs/routing/dynamic.html#pcre-based-params" target="_blank">PCRE-patterns</a>.

PCRE based routes contain dynamic parts which can vary per request. The varying parts are named sub-patterns and are defined using regular expressions. Commonly used PCRE-based subpatterns within Dynamic Route Patterns are:

- \d+ = One or more digits (0-9)
- \w+ = One or more word characters (a-z 0-9 _)
- [a-z0-9_-]+ = One or more word characters (a-z 0-9 _) and the dash (-)
- .* = Any character (including /), zero or more
- [^/]+ = Any character but /, one or more

You don't have to remember all of these, you can always refer to the <a href="https://courses.cs.washington.edu/courses/cse154/12au/cheat-sheets/php-regex-cheat-sheet.pdf" target="_blank">PHP PCRE Cheat Sheet</a> for more information.

Let's see how we can make sure that our route in the first example only supports numbers:

```php
<?php

require __DIR__ . '/vendor/autoload.php';

app()->get('/users/(\d+)', function ($id) {
  response()->markup("The number passed in is: $id");
});

app()->run();
```

Now if a string is passed into that route, you'll receive a 404 instead of seeing the text we defined. You can try this out in the editor. Don't forget to add the url in the `request.json` file.
