---
title: "URL Rewriting"
---

<!-- markdownlint-disable no-inline-html -->

## 👩‍🏫 Introduction

Basically, we're trying to push all the requests made to the server to a single root file, so a request made to `/home.php` will be directed to the root file of our choice....usually `index.php`.

This complex sounding feature can be achieved by adding a web server configuration depending on your server of choice.

<!-- ::: info Video Docs
Watch URL rewriting explained.

<VideoLesson href="https://www.youtube.com/embed/BTcUgeOZLyM" title="URL rewriting explained">Watch URL rewriting explained on youtube</VideoLesson>
::: -->

## Apache - .htaccess

This is a basic example of an htaccess file. It basically re-routes all requests to our index.php file.

```htaccess
RewriteEngine on
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule . index.php [L]
```

Save as `.htaccess` in your the same directory as your "root file"

## Nginx - nginx.conf

A basic example with nginx web server

```nginx
try_files $uri /index.php;
```

You can read below for an overview of url rewriting.

- [Intro to URL rewriting](https://www.smashingmagazine.com/2011/11/introduction-to-url-rewriting/)
- [.htaccess and nginx.conf variations](https://gist.github.com/bramus/5332525)
