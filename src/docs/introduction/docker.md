# Using Docker

<script setup>
import VideoDocs from '/@theme/components/VideoDocs.vue'
</script>

Docker allows developers to package their applications and dependencies into lightweight and portable containers, which can be easily deployed and run on any environment, making it easier to develop and deploy applications consistently. This means you don't have to worry about configuring or setting up complicated development tools such as web servers and databases on your local machine.

<VideoDocs
  title="New to Docker?"
  subject="Docker Tutorial for Beginners"
  description="This video by Mosh Hamedani will walk you through the basics of Docker."
  link="https://www.youtube.com/embed/pTFZFxd4hOI"
/>

This guide will walk you through how to set up your Leaf application using Docker from scratch. To get started, you need to install [Docker Desktop](https://www.docker.com/products/docker-desktop/). After this, you can either use the Leaf CLI or manually create your application.

## Using the Leaf CLI

The Leaf CLI provides a simple way to create a new Leaf application using Docker. To create a new Leaf application using the Leaf CLI, run the following command:

```bash
leaf create my-app --v3 --docker
```

This will setup a new Leaf application with Docker support. You can then run the following command to start your application:

```bash
leaf serve
```

As you can see, following this process is not any different from creating a new Leaf application without Docker. The only difference is that the Leaf CLI will create a Dockerfile and docker-compose.yml file for you. You can always customize these files to suit your specific needs. Also, running the `leaf serve` command will smartly start your application using Docker instead of the built-in server.

::: warning Known Issues
In some cases stopping the dev server doesn't stop your Docker containers. If this happens, you can stop the containers from the Docker Desktop application.
:::

Using this method will scaffold your application with the following files:

```bash
.
├── docker
│   ├── 000-default.conf
│   ├── Dockerfile
│   └── php.ini
├── docker-compose.yml
```

- `000-default.conf` is the Apache configuration file that will be used by the Docker container.
- `Dockerfile` is the Dockerfile that will be used to build the Docker image.
- `php.ini` is the PHP configuration file that will be used by the Docker container.
- `docker-compose.yml` is the Docker Compose file that will be used to start the Docker container.

Leaf CLI only scaffolds them for you. You can always customize them to suit your specific needs.

## Creating your Leaf application

First, create a new Leaf application using the Leaf CLI or any of the methods on the [installation](/docs/introduction/installation) page.

```bash
leaf create my-app --v3 --basic --no-tests
```

From there, we can manually add our Docker files into the project. For this, you can choose any method that you prefer. We have provided a sample Dockerfile and docker-compose.yml file below that you can use as a starting point.

**Dockerfile:**

```dockerfile
FROM php:8.1-apache

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

**docker-compose.yml:**

```yaml
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

**000-default.conf:**

```apacheconf
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
