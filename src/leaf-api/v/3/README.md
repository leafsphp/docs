<!-- markdownlint-disable no-inline-html -->
# 🎉 Leaf API v2.0 (🌵 Lime Aloe)

Leaf API is a lightweight PHP MVC framework for rapid API development. Leaf API serves a minimal MVC wrapper around Leaf PHP which basically provides a more scalable and powerful setup. With a simple structure and a shallow learning curve, it's an excellent way to rapidly build powerful and high performant APIs.

v2.0 packs in a bunch of fresh functionality, and also features added in [v2.4.3](leaf/v/2.4.3/) of the core Leaf package. You can view all these [changes here](leaf-api/v/2.0/new).

Leaf API was created and polished by these amazing minds:

- [@darko-mychi](https://github.com/darko-mychi)
- [@MauMaxxa](https://github.com/MauMaxxa)
- [@iamrameffort](https://github.com/iamrameffort)

<p class="alert -warning">
  Note that Leaf API now ships with <a href="/#/aloe-cli/">aloe cli</a> instead of the standard Leaf CLI.
</p>

## Installation

You can quickly create a Leaf API project with [composer](https://getcomposer.org).

```bash
composer create-project leafs/api <project-name>
```

## Directory Structure

This will create a new Leaf API project named `<project-name>`. Inside the new directory, you should have a structure like this. The directory structure hasn't changed much except for the addition of the `Routes` directory.

```bash
C:.
├───App
│   ├───Console
│   ├───Controllers
│   ├───Database
│   │   ├───Factories
│   │   ├───Migrations
│   │   └───Seeds
│   ├───Helpers
│   ├───Models
│   ├───Routes
│   └───Views
├───Config
│   └───Command
├───Lib
├───public
├───storage
│   ├───app
│   │   └───public
│   ├───framework
│   │   └───views
│   └───logs
└───vendor
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

- [Your First Leaf API](/leaf-api/v/2.0/intro/first-app)
- [Routing](/leaf-api/v/2.0/core/routing)
- [Leaf Console](/leaf-api/v/2.0/utils/console)
- [Controllers](/leaf-api/v/2.0/core/controllers)

Built with ❤ by [**Mychi Darko**](//mychi.netlify.app)
