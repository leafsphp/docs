# Leaf + MVC

<!-- markdownlint-disable no-inline-html -->

<script setup>
import VideoModal from '@theme/components/shared/VideoModal.vue'
</script>

Leaf is a lightweight PHP framework with a ton of loosely coupled libraries that can be used to build any kind of application. By default, Leaf doesn't give you a lot of structure, but it fully supports the MVC pattern without any extra configuration.

## What is MVC?

MVC stands for Model-View-Controller. It is a pattern that separates your application into three distinct parts:

- Models: These are the classes that represent your data. They are responsible for interacting with your database, and for validating your data.
- Views: These are the files that are responsible for displaying your data to your user. They are usually written in HTML, but can also be written in other templating languages like [BareUI](/docs/frontend/bareui/) or [Blade](/docs/frontend/blade/) or frameworks like [Vue](https://vuejs.org/) or [React](https://reactjs.org/)
- Controllers: These are the classes that are responsible for handling the user's request, and for returning the appropriate response.

::: details New to MVC?
If you're new to the MVC pattern, you can take a look at this video by Traversy Media that explains the MVC pattern, how it works and how it works in real-world applications.

<VideoModal
  description="If you're new to the MVC pattern, you can take a look at this video by Traversy Media that explains the MVC pattern, how it works and how it works in real-world applications."
  videoUrl="https://www.youtube.com/embed/pCvZtjoRq1I"
/>
:::

## MVC in Leaf

Leaf provides a minimal but powerful setup for building applications using the MVC pattern. It's built on top of Leaf, and comes with additional tooling that makes building with Leaf even faster. It is a good starting point for building scalable applications with well-organized code.

### Installation

You can set up a new MVC application using the [Leaf CLI](/docs/cli/) or using [Composer](https://getcomposer.org/). They both work, but using the Leaf CLI gives you the option to choose between a regular MVC app and an MVC app that is fine-tuned for creating APIs, plus a few other options.

::: code-group

```bash:no-line-numbers [Leaf CLI]
leaf create <project-name>
```

```bash:no-line-numbers [Composer]
composer create-project leafs/mvc <project-name>
```

:::

This command will set up a new MVC app in the `<project-name>` directory. You can then run the app using the Leaf CLI:

```bash:no-line-numbers
cd <project-name>
php leaf serve
```

You should then see the welcome page in your browser.

![Leaf MVC Welcome Page](https://github.com/user-attachments/assets/947cc13e-cada-4489-aed4-b3f44b262b76)

## Directory Structure

The Leaf MVC directory structure is inspired by [Ruby on Rails](https://rubyonrails.org/) and [Laravel](https://laravel.com/). It takes a lot of inspiration from these frameworks, but it's not a clone of either of them. It is meant to be a starting point for building your own applications, and is fully customizable. You can completely change the directory structure to suit your needs, just be sure to update the [paths config file](/docs/mvc/globals.html#loading-app-paths).

For a fresh MVC app, the directory structure looks like this:

::: code-group

```bash:no-line-numbers [v3.8 upwards]
├───app
│   ├── controllers
│   ├── database
│   │   ├── factories
│   │   ├── migrations
│   │   ├── schema
│   │   └── seeds
│   ├── models
│   ├── routes
│   └── views
│       └── errors
├───config
├───public
│   └───assets
│       ├── css
│       └── img
└───vendor
```

```bash:no-line-numbers [v3.7 downwards]
├───app
│   ├── console
│   ├── controllers
│   ├── database
│   │   ├── factories
│   │   ├── migrations
│   │   ├── schema
│   │   └── seeds
│   ├── helpers
│   ├── models
│   ├── routes
│   └── views
│       └── errors
├───config
├───public
│   └───assets
│       ├── css
│       └── img
├───storage
│   ├───app
│   │   └───public
│   ├───framework
│   │   └───views
│   └───logs
└───vendor
```

:::

- ### The `app` directory

  The `app` directory contains the core code of your application. It's divided into a few sub-directories:

  - `console` - Contains the console commands for your application. These are used to perform tasks on the command line. You can check the [console commands](/docs/mvc/commands) documentation for more information.
  - `controllers` - Contains the controllers for your application. These are used to handle HTTP requests.
  - `database` - Contains the database related code for your application. This includes migrations, seeds, factories and schema.
  - `helpers` - Contains the helper functions for your application.
  - `models` - Contains the models for your application. These are used to interact with the database.
  - `routes` - Contains the routes for your application. These are used to map HTTP requests to controllers.
  - `views` - Contains the views for your application. These are used to render HTML responses.

- ### The `config` directory

  The `config` directory contains the configuration files for your application. The configuration files are used to configure how Leaf and it's modules interact with your application. Each file controls a different feature of your application, e.g. the `app.php` file is used to configure the application, the `database.php` file is used to configure the database connection, etc.

  Leaf MVC now allows you to completely remove this directory if you are only going to use the default configuration values which will make your application lighter. Leaf v3.8 and above allow you to publish the default configuration files using the [`config:publish` command](#configuring-leaf-mvc) if you end up deleting the `config` directory and want it back.

- ### The `public` directory

  The `public` directory contains the entry point for your application, and it's also used to serve static assets. The `index.php` file is the entry point for your application. All requests are routed through this file by the web server. This file doesn't contain any application logic, but it does load the Composer autoloader, the application config and all your routes.

  There is also an `assets` directory found in the `public` directory. It contains the static assets for your application. These are served by the web server and are accessible to users.

- ### The `storage` directory

  The `storage` directory contains the compiled views, logs and other files generated by your application. It's divided into a few sub-directories:

  - `app` - Contains the files generated by your application. This includes the compiled views and the files uploaded by users.
  - `framework` - Contains the framework generated files for your application.
  - `logs` - Contains the log files generated by your application.

  This directory is not created by default in Leaf v3.8 and above. It will be automatically created when you run the `leaf serve` command, logging, storage link or any other command/module that requires it.

- ### The `vendor` directory

  The `vendor` directory contains all the dependencies installed by Composer. It's automatically generated when you install the dependencies using Composer.

## Configuring Leaf MVC

Leaf MVC tries to maintain a clean and easy-to-understand structure that works out-of-the-box for most applications, which means that for most applications, you only need to change a few details in your .env file. For this reason, we allow you to completely remove the `config` directory if you are only going to use the default configuration values. This will make your application lighter and easier to maintain.

There are however some times when you need to customize some features to fit your specific use-cases, and that's where the configuration files come in. Leaf MVC separates the configuration files for each feature of the framework, so you can easily customize one feature without affecting the others. To publish all the default configuration files, you can run the following command:

```bash:no-line-numbers
php leaf config:publish
```

This will re-create a config directory in your application root and copy all the default configuration files to this directory just as we had in previous versions. You can then go ahead to customize the configuration files to fit your specific use-cases.

Since Leaf MVC has defaults set for most of the configuration options, you don't need to change all the values in the configuration files, you only need to change only the specific values you want to customize so you can leave the rest of the configuration as it is. Each option is documented, so feel free to look through the files and get familiar with the options available to you.

If you have a specific configuration you want to change, you can publish only that configuration file by running the following command:

```bash:no-line-numbers
php leaf config:publish <config-file>
```

This will copy the specified configuration file to the `config` directory in your application root, and you can then go ahead to customize the configuration file to fit your specific use-case. This is a list of all of Leaf MVC's configuration files:

| Config file       |  Use-case                                                     |
| ----------------- | :------------------------------------------------------------ |
| app               | Configuration for core features                               |
| auth              | Configuration for authentication (requires auth module)       |
| cors              | Configuration for cors (requires cors module)                 |
| csrf              | Configuration for csrf protection (requires csrf module)      |
| database          | Configuration for database stuff                              |
| mail              | Configuration for mailing (requires mail module)              |
| redis             | Configuration for redis management (requires redis module)    |
| view              | Configuration for view rendering                              |

## Application Environment

A fresh Leaf MVC installation comes with a `.env.example` file which is automatically duplicated to a `.env` file on installation. This file is used to store your application's environment variables, and you can put sensitive information like your database credentials or mail server credentials in this file. This allows you to have different configurations for different environments like development, testing, and production.

Any value in your `.env` file is automatically loaded into your application's environment variables, and you can access these values using the `_env()` helper function. This function takes in the key of the environment variable you want to access and an optional default value if the environment variable is not set.

Here's an example of how you can use the `_env()` helper function:

```php
$database = _env('DB_DATABASE');
$databaseWithDefault = _env('DB_DATABASE', 'leaf');
```

Be careful not to commit your `.env` file to your version control system as it contains sensitive information. We have already added the `.env` file to your `.gitignore` file so you don't have to worry about this.
