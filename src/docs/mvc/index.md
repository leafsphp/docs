<!-- markdownlint-disable no-inline-html -->

# Leaf + MVC

<script setup>
import VideoDocs from '/@theme/components/VideoDocs.vue'
</script>

Leaf is a lightweight PHP framework with a ton of loosely coupled libraries that can be used to build any kind of application. By default, Leaf doesn't give you a lot of structure, but it fully supports the MVC pattern without any extra configuration.

## What is MVC?

MVC stands for Model-View-Controller. It is a pattern that separates your application into three distinct parts:

- Models: These are the classes that represent your data. They are responsible for interacting with your database, and for validating your data.
- Views: These are the files that are responsible for displaying your data to the user. They are usually written in HTML, but can also be written in other templating languages like [BareUI](https://leafphp.dev/modules/views/bareui/) or [Blade](https://leafphp.dev/modules/views/blade/) or frameworks like [Vue](https://vuejs.org/) or [React](https://reactjs.org/)
- Controllers: These are the classes that are responsible for handling the user's request, and for returning the appropriate response.

<VideoDocs
  title="New to MVC?"
  subject="What is MVC? Simple Explanation"
  description="If you're new to the MVC pattern, you can take a look at this video by Traversy Media that explains the MVC pattern, how it works and how it works in real-world applications."
  link="https://www.youtube.com/embed/pCvZtjoRq1I"
/>

## MVC in Leaf

Leaf provides a minimal but powerful setup for building applications using the MVC pattern. It's built on top of Leaf, and comes with additional tooling that makes building with Leaf even faster. It is a good starting point for building applications using the MVC pattern.

## Installation

You can set up a new MVC application using the [Leaf CLI](/docs/cli/) or using [Composer](https://getcomposer.org/). They both work, but using the Leaf CLI gives you the option to choose between a regular MVC app and an MVC app that is fine-tuned for creating APIs, plus a few other options.

```bash
# Using the Leaf CLI
leaf create myapp

# Using Composer
composer create-project leafs/mvc myapp
```

This command will set up a new MVC app in the `<project-name>` directory. You can then run the app using the Leaf CLI:

```bash:no-line-numbers
cd <project-name>
leaf serve # or php leaf serve
```

You should then see the welcome page in your browser.

![Leaf MVC Welcome Page](https://user-images.githubusercontent.com/26604242/223189921-d5da1555-bc29-4f99-a3ec-d6cbfdc5350b.png)

## Directory Structure

The Leaf MVC directory structure is inspired by [Ruby on Rails](https://rubyonrails.org/) and [Laravel](https://laravel.com/). It takes a lot of inspiration from these frameworks, but it's not a clone of either of them. It is meant to be a starting point for building your own applications, and is fully customizable. You can completely change the directory structure to suit your needs, just be sure to update the paths in the `config/paths.php` file.

For a fresh MVC app, the directory structure looks like this:

```bash:no-line-numbers
.
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

- ### The `app` directory

  The `app` directory contains the core code of your application. It's divided into a few sub-directories:

  - `console` - Contains the console commands for your application. These are used to perform tasks on the command line.
  - `controllers` - Contains the controllers for your application. These are used to handle HTTP requests.
  - `database` - Contains the database related code for your application. This includes migrations, seeds, factories and schema.
  - `helpers` - Contains the helper functions for your application.
  - `models` - Contains the models for your application. These are used to interact with the database.
  - `routes` - Contains the routes for your application. These are used to map HTTP requests to controllers.
  - `views` - Contains the views for your application. These are used to render HTML responses.

- ### The `config` directory

  The `config` directory contains the configuration files for your application. These are used to configure how Leaf and it's modules interact with your application. You can find more information about the configuration files in the [Configuration](/docs/mvc/config) section.

- ### The `public` directory

  The `public` directory contains the entry point for your application, and it's also used to serve static assets. The `index.php` file is the entry point for your application. All requests are routed through this file by the web server. This file doesn't contain any application logic, but it does load the Composer autoloader, the application config and all your routes.

  There is also an `assets` directory found in the `public` directory. It contains the static assets for your application. These are served by the web server and are accessible to users.

- ### The `storage` directory

  The `storage` directory contains the compiled views, logs and other files generated by your application. It's divided into a few sub-directories:

  - `app` - Contains the files generated by your application. This includes the compiled views and the files uploaded by users.
  - `framework` - Contains the framework generated files for your application.
  - `logs` - Contains the log files generated by your application.

- ### The `vendor` directory

  The `vendor` directory contains all the dependencies installed by Composer. It's automatically generated when you install the dependencies using Composer.

## Leaf API

We used to provide Leaf API as a separate package for quickly getting building your APIs. However, we've now integrated it into the Leaf MVC package. If you set up your project using the Leaf CLI, you can select the API option to set up your project as an API. This will install Leaf MVC and automatically disable the view layer, vite and other unnecessary dependencies.

We did this to achieve more uniformity across all Leaf projects. This way, you can enjoy all the benefits of Leaf MVC while building your APIs without the distraction of the view layer.
