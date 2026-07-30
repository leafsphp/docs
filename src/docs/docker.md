<!-- markdownlint-disable no-inline-html -->

# Docker + Leaf

<section class="not-prose my-10 overflow-hidden rounded-xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
  <div class="grid gap-0 2xl:grid-cols-[1fr_0.9fr]">
    <div class="border-b border-neutral-200 p-6 sm:p-8 2xl:border-b-0 2xl:border-r dark:border-neutral-800">
      <p class="!m-0 !mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-neutral-500 dark:text-neutral-400">Portable runtime</p>
      <h1 class="m-0 text-3xl font-semibold tracking-tight text-neutral-950 dark:text-neutral-50 sm:text-4xl">Run Leaf in the same environment everywhere.</h1>
      <p class="!m-0 !mt-4 text-base leading-7 text-neutral-600 dark:text-neutral-400">Leaf can scaffold Docker support so PHP, extensions, web server config, Composer, and your app runtime stay reproducible across local development and deployment.</p>
    </div>
    <div class="bg-neutral-50 p-6 dark:bg-neutral-900/60 sm:p-8">
      <div class="rounded-lg border border-neutral-200 bg-white p-4 font-mono text-sm text-neutral-700 dark:border-neutral-800 dark:bg-black dark:text-neutral-300">
        <div><span class="text-neutral-400">$</span> leaf create my-app --docker</div>
        <div class="mt-4 text-[var(--vp-c-brand-1)]">leaf serve</div>
        <div class="text-sky-600 dark:text-sky-400">docker compose up</div>
      </div>
    </div>
  </div>
</section>

Docker allows developers to package their applications and dependencies into lightweight and portable containers. This guide walks through setting up your Leaf application with Docker from scratch.

This guide will walk you through how to set up your Leaf application using Docker from scratch. To get started, you need to install [Docker Desktop](https://www.docker.com/products/docker-desktop/). After this, you can either use the Leaf CLI or manually create your application.

## Using the Leaf CLI

The easiest way to get started with Docker in your Leaf applications is to use the Leaf CLI. The `create` command has a `--docker` option that allows you to create a new Dockerized Leaf app:

```bash:no-line-numbers
leaf create my-app --docker
```

If you leave the flag off, `leaf create` will also ask whether you want Docker during the interactive prompts. Either way, Leaf sets your application up with Docker support: for MVC and API apps the web server is pointed at `public/`, and for Lite apps sensitive files (`.env`, composer manifests) are blocked from being served. Although your app is dockerized, Leaf CLI still lets you use the `serve` command — it will automatically start your application using Docker instead of the built-in server.

```bash:no-line-numbers
leaf serve
```

## Adding Docker to existing projects

If you already have an existing Leaf application and you want to add Docker support to it, you will need to do so manually. We have provided a sample below that you can use as a reference. This section requires you to have a basic understanding of Docker and how it works and interacts with your application. We recommend checking out the [Docker documentation](https://docs.docker.com/) if you are new to Docker.

We have provided two examples below, one for Apache and one for Nginx. You can choose the one that best suits your needs.

### Dockerfile

To build your Docker image, you'll use a `Dockerfile`. You can adjust this file to meet your specific requirements. We have example files for both Apache and Nginx running on PHP 8.3. To get started, create a docker directory in the root of your project and place the Dockerfile there.

::: code-group

```dockerfile [Dockerfile Apache]
FROM php:8.3-apache

COPY 000-default.conf /etc/apache2/sites-available/000-default.conf

RUN a2enmod rewrite

RUN apt-get update && apt-get install -y --no-install-recommends \
    libzip-dev \
    wget \
    git \
    unzip

RUN docker-php-ext-install zip pdo pdo_mysql

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN composer global require leafs/cli

RUN ln -s /root/.composer/vendor/bin/leaf /usr/local/bin/leaf

# If you have a custom PHP ini file you can uncomment this line
# COPY ./php.ini /usr/local/etc/php/php.ini

RUN apt-get purge -y g++ \
    && apt-get autoremove -y \
    && rm -rf /var/lib/apt/lists/* \
    && rm -rf /tmp/*

WORKDIR /var/www

RUN chown -R www-data:www-data /var/www

CMD ["apache2-foreground"]
```

```dockerfile [Dockerfile Nginx]
FROM php:8.3-fpm

COPY default.conf /etc/nginx/conf.d/default.conf

RUN apt-get update && apt-get install -y --no-install-recommends \
    libzip-dev \
    wget \
    git \
    unzip

RUN docker-php-ext-install zip pdo pdo_mysql

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN composer global require leafs/cli

RUN ln -s /root/.composer/vendor/bin/leaf /usr/local/bin/leaf

# If you have a custom PHP ini file you can uncomment this line
# COPY ./php.ini /usr/local/etc/php/php.ini

RUN apt-get purge -y g++ \
    && apt-get autoremove -y \
    && rm -rf /var/lib/apt/lists/* \
    && rm -rf /tmp/*

WORKDIR /var/www

RUN chown -R www-data:www-data /var/www

CMD ["php-fpm"]
```

:::

### docker-compose.yml

The `docker-compose.yml` file is used to define and run multi-container Docker applications. You can use this file to define your application's services, networks, and volumes. Create a `docker-compose.yml` file in the root of your project and add the following content:

```yml
services:
  application:
    build: ./docker
    ports:
      - '8080:80'
    volumes:
      - .:/var/www
```

### Server config

The final piece of the puzzle is the server configuration file. You can use the following examples for Apache and Nginx. Depending on the web server you are using, create a configuration file in the `docker` directory.

::: code-group

```apache [Apache - 000-default.conf]
<VirtualHost *:80>
    ServerAdmin webmaster@localhost
    # for MVC/API apps use /var/www/public; /var/www is for lite apps only
    DocumentRoot /var/www

    <Directory /var/www>
        Options FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>

    # never serve dotfiles (.env, .git, ...) or tooling manifests
    <FilesMatch "^(\..*|composer\.(json|lock)|alchemy\.yml|package(-lock)?\.json)$">
        Require all denied
    </FilesMatch>
    <DirectoryMatch "/\.">
        Require all denied
    </DirectoryMatch>
</VirtualHost>
```

```nginx [Nginx - default.conf]
server {
    listen 80;
    index index.php index.html;
    server_name localhost;
    error_log  /var/log/nginx/error.log;
    access_log /var/log/nginx/access.log;
    root /var/www/public;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        include fastcgi_params;
        fastcgi_pass php:9000;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        fastcgi_param PATH_INFO $fastcgi_path_info;
    }
}
```

:::

After adding these files, you can start your application using Docker by running the following command:

::: code-group

```bash:no-line-numbers [Leaf CLI]
leaf serve
```

```bash:no-line-numbers [Docker Compose]
docker compose up
```

:::
