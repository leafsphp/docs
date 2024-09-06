# Docker + Leaf

<!-- markdownlint-disable no-inline-html -->

<script setup>
import VideoModal from '@theme/components/shared/VideoModal.vue'
</script>

Docker allows developers to package their applications and dependencies into lightweight and portable containers, which can be easily deployed and run on any environment, making it easier to develop and deploy applications consistently. This means you don't have to worry about configuring or setting up complicated development tools such as web servers and databases on your local machine.

::: details New to Docker?

This video by Mosh Hamedani will walk you through the basics of Docker.

<VideoModal
  title="New to Docker?"
  subject="Docker Tutorial for Beginners"
  description="This video by Mosh Hamedani will walk you through the basics of Docker."
  videoUrl="https://www.youtube.com/embed/pTFZFxd4hOI"
/>

:::

This guide will walk you through how to set up your Leaf application using Docker from scratch. To get started, you need to install [Docker Desktop](https://www.docker.com/products/docker-desktop/). After this, you can either use the Leaf CLI or manually create your application.

## Using the Leaf CLI

The easiest way to get started with Docker in your Leaf applications is to use the Leaf CLI. The `create` command has a `--docker` option that allows you to create a new Dockerized Leaf app:

```bash:no-line-numbers
leaf create my-app --docker
```

It also works with the `--custom` option and the `gui` command:

```bash:no-line-numbers
leaf create my-app --custom # or
leaf gui
```

Either one of these commands will ask you if you want to use Docker in your project. Once you confirm, Leaf will set up a new Leaf application with Docker support. Although your app is dockerized, Leaf CLI still allows you to use the `serve` command to start your application. This command will automatically start your application using Docker instead of the built-in server.

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
version: '3.1'
services:
  application:
    build: ./docker
    image: leafphp/docker
    ports:
      - '8080:80'
    volumes:
      - .:/var/www
```

### Server config

The final piece of the puzzle is the server configuration file. You can use the following examples for Apache and Nginx. Depending on the web server you are using, create a configuration file in the `docker` directory.

::: code-group

```apacheconf [Apache - 000-default.conf]
<VirtualHost *:80>
    ServerAdmin webmaster@localhost
    DocumentRoot /var/www

    <Directory /var/www>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
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
