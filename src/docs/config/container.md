# Service Container

A Dependency Injection (DI) Container is like a helper that organizes how different parts of your app work together. Instead of manually creating objects and initializing classes when one part of your app needs another, the container automatically retrieves them for you.

Leaf comes with a lightweight service container that simplifies managing dependencies in your app. You can register classes and dependencies with the container and they will be available from anywhere in your app. While it is not a full-fledged dependency injection container, it is powerful enough to handle most of your application's needs.

## Registering Dependencies

Registering a dependency means adding the dependency to the container so you can call it from anywhere in your app on the Leaf instance. We can do this using the `register()` method. It takes in two parameters:

- The name of the dependency
- A function that returns the dependency

```php
app()->register('something', function ($c) {
  return new Something();
});
```

In the example above, we set the `something` property on our app using Leaf's `register()` method. The `something` property will return an instance of the `Something` class.

## Using Dependencies

Once we have registered a dependency in Leaf's container, we can access it directly on the Leaf instance. We can do this by calling the dependency name as a property on the Leaf instance.

```php
$something = app()->something;
$something->doSomething();

// or

app()->something->doSomething();
```

In the example above, we access the `something` dependency by calling it as a property on the Leaf instance. We then call the `doSomething()` method on the `something` dependency.

If the dependency is a class, you can call its methods directly. If it is a function, you can call it directly.

```php
app()->register('something', function ($c) {
  return function () {
    return 'Hello World!';
  };
});

$something = app()->something();
```

## Checking if a Dependency Exists

You can check if a dependency exists in the container by calling the `has()` method. It takes in the name of the dependency and returns a boolean.

```php
if (app()->has('something')) {
  echo 'Dependency exists';
}
```
