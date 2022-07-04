# Container

Leaf provides a simple but powerful dependency injection container. Dependency injection is a fancy phrase that essentially means this: class dependencies are "injected" into the class via the constructor or, in some cases, "setter" methods.

Basically, leaf's dependency container basically adds a function or class to the leaf object so you can call it from anywhere in your app. Let's look at an example.

```php
$app = new Leaf\App;

$app->register("something", function ($c) {
  return new Something();
});
```

or in functional mode:

```php
app()->register("something", function ($c) {
  return new Something();
});
```

And the registered item `something` will be referenced like this:

```php
app()->something->doSomething();
```
