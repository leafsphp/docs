<!-- markdownlint-disable no-inline-html -->
# Sitemap Generator <Badge type="warning">Beta</Badge>

Modern search engines can crawl and index your website without any setup, but having a sitemap can help search engines understand your website structure and improve how your pages are discovered and indexed. This is especially important for larger websites with many pages, or for websites that have a lot of dynamic content that may not be easily discoverable by search engines.

Leaf's sitemap generator provides a first-party solution for automatically creating a `sitemap.xml` for your application, while staying out of your way.

## 🚀 Installation

**Using [Leaf CLI](https://cli.leafphp.dev) (Recommended)**:

<p class="flex gap-2">
  <a href="https://packagist.org/packages/leafs/sitemap"><img src="https://poser.pugx.org/leafs/sitemap/v/stable" alt="Latest Stable Version"/></a>
  <a href="https://packagist.org/packages/leafs/sitemap"><img src="https://poser.pugx.org/leafs/sitemap/downloads" alt="Total Downloads"/></a>
  <a href="https://packagist.org/packages/leafs/sitemap"><img src="https://poser.pugx.org/leafs/sitemap/license" alt="License"/></a>
</p>

::: code-group

```bash:no-line-numbers [Leaf CLI]
leaf install sitemap
```

```bash:no-line-numbers [Composer]
composer require leafs/sitemap
```

:::

Once installed, your sitemap will be automatically generated based on the routes defined in your Leaf application. You can customize the sitemap generation by adding a new datasource or by adding sitemap config options directly to your routes.

## Regenerating Your Sitemap

Leaf automatically generates your sitemap when it doesn’t exist.

To regenerate your sitemap, you can:

- delete the existing sitemap.xml file
- or manually generate a new one:

    ```php:no-line-numbers
    sitemap()->generate();
    ```

If you'd rather have your sitemap refresh itself on a schedule, you can set a max age in seconds. When the existing `sitemap.xml` is older than this value, Leaf regenerates it on the next request:

```php:no-line-numbers
\Leaf\Sitemap::$maxAge = 86400; // regenerate after a day
```

Leaving `$maxAge` unset keeps the default behavior: the sitemap is generated once and only refreshed when you do so manually.

## Auto Sitemaps

Since sitemaps automatically use your Leaf routes, you can add some config options directly to your routes to customize how they appear in the sitemap. For example:

```php
app()->get('/about', [
    'sitemap' => [
        'changefreq' => 'monthly',
        'priority' => 0.5,
    ],
    function() {
        echo 'About Us';
    }
]);
```

You can pass `changefreq`, `priority` and `lastmod` here. A `lastmod` entry only shows up in the sitemap when you provide one, since guessing a modification date would mislead search engines. `priority` defaults to `0.5`, and an explicit `0` is respected for pages you want crawled last.

Dynamic routes like `/blog/{slug}` need real URLs before they can appear in your sitemap. You provide those with a datasource.

## Datasources

Your application may have dynamic routes, eg: `/blog/{slug}`. These routes are left out of your sitemap entirely unless you map them to real URLs, since a raw pattern like `/blog/{slug}` is not a page search engines can visit. To include these routes in your sitemap, you can create a custom datasource that fetches the necessary data from your database and adds it to the sitemap. Here's an example of how to create a custom datasource for a blog:

```php
sitemap()->source(function() {
    // Fetch blog posts from the database
    $posts = db()->select('posts')->get(); // or with a model like Post::all();

    // Add each post to the sitemap
    foreach ($posts as $post) {
        sitemap()->map('/blog/{slug}', "/blog/{$post->slug}", [
            'lastmod' => $post->updated_at,
            'changefreq' => 'weekly',
            'priority' => 0.8,
        ]);
    }
});

// original route
app()->get('/blog/{slug}', 'BlogController@show');
```

You can also add multiple URLs at once:

```php
sitemap()->source(function() {
    // Fetch blog posts from the database
    $posts = db()->select('posts')->get(); // or with a model like Post::all();

    // Add each post to the sitemap
    foreach ($posts as $post) {
        sitemap()->map('/blog/{slug}', [
            "/en/blog/{$post->slug_en}" => [
                'lastmod' => $post->updated_at,
                'changefreq' => 'weekly',
                'priority' => 0.8,
            ],
            "/fr/blog/{$post->slug_fr}" => [
                'lastmod' => $post->updated_at,
                'changefreq' => 'weekly',
                'priority' => 0.8,
            ],
        ]);
    }
});

// original route
app()->get('/blog/{slug}', 'BlogController@show');
```

This will map the `/blog/{slug}` to the actual URLs of your blog posts, and include additional metadata such as last modification date, change frequency, and priority.

## Add URL

The examples above show how to map existing routes to actual URLs, but you can also add new URLs that are not defined as routes in your application:

```php
sitemap()->source(function() {
    // Fetch blog posts from the database
    $posts = db()->select('posts')->get(); // or with a model like Post::all();

    // Add each post to the sitemap
    foreach ($posts as $post) {
        sitemap()->add("/blog/{$post->slug}", [
            'lastmod' => $post->updated_at,
            'changefreq' => 'weekly',
            'priority' => 0.8,
        ]);
    }
});
```

This will add the specified URLs to the sitemap without replacing any existing routes.

You can also use `add` without being dynamic:

```php
sitemap()->source(function() {
    sitemap()->add('/about', [
        'changefreq' => 'monthly',
        'priority' => 0.5,
    ]);

    sitemap()->add('/contact', [
        'changefreq' => 'monthly',
        'priority' => 0.5,
    ]);
});
```

If you add a URL that already exists in the sitemap, it will be replaced with the new one. For example:

```php
sitemap()->source(function() {
    ...

    // this will replace the /about defined below with the new config
    sitemap()->add('/about', [
        'changefreq' => 'monthly',
        'priority' => 0.5,
    ]);
});

app()->get('/about', function() {
    echo 'About Us';
});
```
