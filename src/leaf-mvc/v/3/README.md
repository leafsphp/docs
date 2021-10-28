<!-- markdownlint-disable no-inline-html -->
# 🎉 leaf MVC v2.0 (👑 Basil, the ‘kingly’ herb)

Leaf MVC is a lightweight PHP MVC framework that allows you to create powerful web apps and APIs quickly and efficiently. Leaf MVC serves a minimal MVC wrapper around Leaf PHP which basically provides a more scalable and powerful setup. With a simple structure and a shallow learning curve, it's an excellent way to rapidly build powerful and high performant web apps and APIs. Leaf MVC is also heavily inspired by Ruby on rails, laravel and slim, it provides you the best of these packages and avoids the "not so goods"😁

v2.0 packs in a bunch of fresh functionality, and also features added in [v2.4.3](leaf/v/2.4.3/) of the core Leaf package. You can view all these [changes here](/leaf-mvc/v/2.0/new).

<p class="alert -warning">
  Note that leaf MVC now ships with <a href="/#/aloe-cli/">aloe cli</a> instead of the standard Leaf CLI.
</p>

## Installation

You can quickly create a leaf MVC project with [composer](https://getcomposer.org).

```bash
composer create-project leafs/mvc <project-name>
```

## Directory Structure

This will create a new leaf MVC project named `<project-name>`. Inside the new directory, you should have a structure like this. The directory structure hasn't changed much except for the addition of the `Routes` directory.

```bash
C:.
├── App
│   ├── Console
│   ├── Controllers
│   ├── Database
│   │   ├── Factories
│   │   ├── Migrations
│   │   └── Seeds
│   ├── Helpers
│   ├── Models
│   ├── Routes
│   └── Views
│       ├── assets
│       │   ├── css
│       │   └── img
│       └── errors
├── Config
├── Lib
├── public
├── storage
│   ├── app
│   │   └── public
│   ├── framework
│   │   └── views
│   └── logs
└── vendor
```

- **App**: This is where you will mostly be working. It houses all your controllers, command and db files.
- **Config**: This holds all your configuration files.
- **Lib**: You can place your libraries and piece files which you need for your app.
- **storage**: Storage for your files, images, text...
- **vendor**: This holds all your dependencies and installed files.

In the project root, you can open up your console tool and type in

```bash
php leaf serve
```

This will start the php web server and load your project at `http://localhost:5500` by default.

## Next Steps

- [Your First leaf MVC](/leaf-mvc/v/2.0/intro/first-app)
- [Routing](/leaf-mvc/v/2.0/core/routing)
- [Leaf Console](/leaf-mvc/v/2.0/utils/console)
- [Controllers](/leaf-mvc/v/2.0/core/controllers)

Built with ❤ by [**Mychi Darko**](//mychi.netlify.app)
