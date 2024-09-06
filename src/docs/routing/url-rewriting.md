# URL Rewriting

URL rewriting is a way to change the accessible URL of your application into a different URL. You can think of it as a way to map one URL to another: a fancy way of redirecting requests made to a particular URL to another URL.

In the context of Leaf, URL rewriting is used to direct all requests to a single root file, usually `index.php`. This is a common practice in PHP applications, and it allows you to handle all requests in a single file. The cool thing is we can achieve this by adding a web server configuration depending on your server of choice.

::: code-group

```apache [Apache .htaccess]
RewriteEngine on
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule . index.php [L]
```

```nginx [Nginx nginx.conf]
try_files $uri /index.php;
```

:::

## Why URL Rewriting?

By default, web servers like Apache and Nginx serve files directly from the file system. This means that when you make a request to a file like `home.php`, the server will look for a file named `home.php` in the root directory of the server and serve it.

Since Leaf comes with a router that allows you to define routes for your application, you need to direct all requests back to our Leaf app so that the router can handle them. This is where URL rewriting comes in.

When you add a URL rewriting rule to your server configuration, you are telling the server to direct all requests to a single file, usually `index.php`. This way, the router can handle the request and return the appropriate response.
