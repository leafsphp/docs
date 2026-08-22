# Service Container

Leaf ships a lightweight service container: a registry where you name a dependency once, then fetch it anywhere in your app through the Leaf instance. Factories are lazy, so nothing is created until the first time you ask for it, and after that first call you get the same instance back every time.

::: details DI Container or Service Locator?
Strictly speaking, we use the service locator pattern, not a dependency injection container.

A DI container hands your classes their dependencies from the outside, usually through constructor injection and autowiring, so a class never knows the container exists. A service locator is something your code calls to fetch what it needs. Leaf chose the locator deliberately: there is no wiring step, the whole API is one method and a property read, and in the small apps Leaf is built for, constructor ceremony usually costs more than it returns.
:::

## Registering Dependencies

Registering a dependency means adding the dependency to the container so you can call it from anywhere in your app on the Leaf instance. We can do this using the `register()` method. It takes in two parameters:

- The name of the dependency
- A function that returns the dependency

```php
app()->register('something', fn ($c) => new Something());
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
app()->register('something', fn ($c) => fn () => 'Hello World!');

$something = app()->something();
```

## Checking if a Dependency Exists

You can check if a dependency exists in the container by calling the `has()` method. It takes in the name of the dependency and returns a boolean.

```php
if (app()->has('something')) {
  echo 'Dependency exists';
}
```

## Swapping Dependencies in Tests

Registering a name again replaces it, and the new factory starts fresh. That means a test can hand your app a fake without changing the code under test:

```php
app()->register('mailer', fn () => new FakeMailer());

// code under test calls app()->mailer and gets the fake
```
