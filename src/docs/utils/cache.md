<!-- markdownlint-disable no-inline-html -->

# Caching <Badge>New</Badge>

Imagine you have 1,000 users fetching some common data from your application which requires a complex database query. Instead of running that complex query 1,000 times, you can cache the result of that query and serve the cached result to all 1,000 users. This is where caching comes in handy.

Caching is the process of storing data in a temporary storage area (cache) so that it can be accessed quickly. Caching can significantly improve the performance of your application by reducing the number of times you need to fetch data from a database, API, or perform complex calculations.

## Setting up

To set up caching in your Leaf application, you need to install the cache module:

::: code-group

```bash:no-line-numbers [Leaf CLI]
leaf install cache
```

```bash:no-line-numbers [Composer]
composer require leafs/cache
```

:::

Once the cache module is installed, you can start using it in your application. For now, Leaf's cache only supports file-based caching, so you don't need to do any configuration.

## Using the Cache

Just like other Leaf modules, you can use the cache module right away by calling the `cache()` helper function. This is a dynamic function that smartly handles caching in your application for you. Let's take our previous example of fetching common data for 1,000 users.

```php:no-line-numbers
$dataFromDatabase = cache(
    'queries.complexQuery', // Unique cache key for this data
    60 * 60, // Cache duration in seconds (1 hour)
    function() {
        // Simulate a complex database query
        return db()
          ->select('complex_table')
          ->where('some_column', 'some_value')
          ->get();
    }
);
```

In the above example, the `cache()` function takes three parameters:

- **Cache Key**: A unique identifier for the cached data. This can be any string, but it's a good practice to use a descriptive name that reflects the data being cached.
- **Cache Duration**: The duration (in seconds) for which the data should be cached. In this example, the data will be cached for 1 hour (60 seconds * 60 minutes).
- **Callback Function**: A closure that contains the logic to fetch the data if it's not already cached. This function will only be executed if the cache is empty or has expired.

## How it Works

When you call the `cache()` function, it first checks if the data is already cached, and returns it. If not, it executes the callback function to fetch the data, stores it in the cache, and then returns the fetched data. This way, the complex database query is only executed once every hour, regardless of how many users are requesting the data.

We know that caching is not always straightforward, and there are many strategies and techniques to consider. However, the `cache()` function provides a simple and effective way to implement caching in your Leaf application without getting into the complexities of cache management.

## Overwriting Cache

Since the normal behavior of the `cache()` function is to return the cached data if it exists, you might wonder how to overwrite the cache when needed. You can do this by using the `put()` method on the cache instance.

```php:no-line-numbers
cache()->put('queries.complexQuery', $newData, 60 * 60);
```

In this example, we're using the `put()` method to store new data in the cache with the same key as before. This will overwrite the existing cached data. The third parameter is the cache duration, which is set to 1 hour in this case.

## Saving Cache Permanently

Although caching is typically temporary, there might be scenarios where you want to save certain data permanently in the cache. You can achieve this by using the `cache()` helper function without a duration parameter.

```php:no-line-numbers
cache('settings.siteConfig', function() {
    return db()->select('settings')->get();
});
```

## Getting Cache Data

If you want to retrieve cached data which has been previously stored, you can use the `cache()` function with just the cache key.

```php:no-line-numbers
$cachedData = cache('queries.complexQuery');
```

This will return the cached data if it exists, or `null` if it doesn't. Be careful when using this method, as it will not execute any callback function to fetch the data if it's not cached, so you need to handle the case where the data is not available.

## Deleting Cache

To delete a specific cache entry, you can use the `forget()` method on the cache instance.

```php:no-line-numbers
cache()->forget('queries.complexQuery');
```

This will remove the cached data associated with the specified key. You can also clear the entire cache by using the `flush()` method.

```php:no-line-numbers
cache()->flush();
```

Be cautious when using the `flush()` method, as it will remove all cached data, which might not be desirable in all situations.

## Choosing what to Cache

Leaf's `cache()` function provides a simple and effective way to implement caching in your application without thinking about the complexities of cache management. By using caching wisely, you can significantly improve the performance of your application and provide a better experience for your users. Remember to choose appropriate cache keys and durations based on the nature of the data being cached, and always consider the trade-offs between data freshness and performance.

For instance, your heaviest queries or computations might include data that changes frequently, so you might want to cache them for shorter durations than more static data. Always analyze your application's specific needs and avoid falling into the trap of over-caching due to "believe me, caching is good" mentality.

No two applications are the same, so always monitor and adjust your caching strategy as needed. Happy caching!
