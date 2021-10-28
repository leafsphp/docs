# leafMVC

<p class="alert -info">
  Leaf MVC v2.0 is finally here🎉🎉🎉. Read the docs <a href="/#/leaf-mvc/v/2.0/">here</a>
</p>

Leaf MVC is a lightweight PHP MVC framework that allows you to quickly build powerful web apps and APIs. LeafMVC serves as minimal MVC wrapper around Leaf PHP Framework which allows you to use Leaf in an MVC environment, as such you're still using Leaf.

## Installation

### Composer

You can quickly create a Leaf MVC project with [composer](https://getcomposer.org).

```bash
composer create-project leafs/mvc <project-name>
```

That's it! This will create a new Leaf MVC project named `<project-name>`.

### Github

You can [download the source files](https://github.com/leafsphp/leafMVC/archive/v2.0.zip) from github and  extract it to get the leafMVC files. All that's left is to install the dependencies.

```sh
composer install
```

After this has completed it's installation, you just need to generate your application env file. You can copy and rename your `.env.example` file to `.env`, but aloe cli provides a way easier approach.

```sh
php leaf env:generate
```

That's all!

## Directory Structure

In your project directory, you should have a structure like this.

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

In the project root, you can open up your console tool and type in

```bash
php leaf serve
```

This will start the php web server and load your project at `http://localhost:5500` by default.

## Next Steps

- [First App](/leaf-mvc/v/2.0/intro/first-app)
- [Routing](/leaf-mvc/v/2.0/core/routing)
- [Leaf Console](/leaf-mvc/v/2.0/utils/console)
- [Controllers](/leaf-mvc/v/2.0/core/controllers)

Built with ❤ by [**Mychi Darko**](//mychi.netlify.app)
