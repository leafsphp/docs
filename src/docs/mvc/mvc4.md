# Leaf MVC 4 <Badge type="warning">ALPHA</Badge>

<!-- markdownlint-disable no-inline-html -->

<script setup>
import VideoModal from '@theme/components/shared/VideoModal.vue';
</script>

Leaf MVC 4 is a new version of the Leaf MVC framework that is currently in development. It is designed to be more flexible and easier to use than v3 and comes with a ton of improvements, enhanced simplicity, new features, and a more modern codebase with cutting-edge features tailored to improve your development experience. While working on Leaf MVC 4, we were able to backport some of the features to Leaf MVC 3, so if you have used Leaf MVC 3.8 or later, switching to v4 should be a breeze.

<VideoModal
  buttonText="Building with Leaf MVC 4"
  description="This video talks about building with Leaf MVC v4"
  videoUrl="https://www.youtube.com/embed/s6jkGBaJVQE"
/>

![image](https://github.com/user-attachments/assets/5fc4e221-8728-4d37-8683-28455f685d1f)

## Key Highlights

Here are some of the key highlights of Leaf MVC 4:

1. Minimalist Philosophy

- Smaller Core: Streamlined codebase for faster performance and reduced footprint.
- Modular Architecture: Customize your projects with opt-in integrations.

2. Simplified Folder Structure

- Modularized structure with flexibility to include only what you need.
- Clear separation of concerns: Controllers, Models, Views, and Configs.

3. Enhanced Developer Tools

- YAML-based database schema management.
- Console commands with interactive prompts.
- Automatic setup of Leaf modules.

## Installation

To install Leaf MVC 4, you can use Composer:

```bash:no-line-numbers
composer create-project leafs/mvc:v4.0-alpha my-app
```

This will create a new Leaf MVC 4 project in the `my-app` directory. Since Leaf MVC 4 is still in alpha, you can't install it using the Leaf CLI tool yet, but we'll keep you updated as soon as it's available.

## Folder Structure

Leaf MVC ships with a really lean folder structure that is designed to be flexible, easy to understand and easy to work with, especially for beginners. Here's a quick overview of the folder structure:

```bash
├───app
│   ├── controllers
│   ├── database
│   ├── models
│   ├── routes
│   └── views
│       └── errors
└───public
    └───assets
        ├── css
        └── img
```

- `app`: Contains all the application code including controllers, models, views, and routes, as well as your database files.
- `public`: Contains all the publicly accessible files including assets like CSS and images.

This is much leaner than the folder structure in Leaf MVC 3, which had a lot of directories that were not always necessary. Another thing to note in v4 is that the `config` directory has been removed and configuration files are now provided automatically by Leaf. However, you can still create a `config` directory if you need to add custom configuration files or use the `php leaf config:publish` command to publish the default configuration files.

Also, although this is the default folder structure, if Leaf or any of its modules require additional directories, they will be created automatically. For instance, Blade templates will create a `storage/views` directory for compiled views.

## Customizable view layer

Leaf MVC 4 comes with a customizable view layer that not only allows you to bring in your own view engine but also allows you to extend the default view engine. This means you can use any view engine you want, including Twig, Smarty, etc., or you can extend the default Leaf view engine to add your own custom features like custom directives, filters, etc.

If you need to add anything new to your view layer, you can publish the view config using the `config:publish` command:

```bash:no-line-numbers
php leaf config:publish view
```

This will create a `config/view.php` file in your `app` directory where you can add your custom view configurations. For this example, we will add a new directive to the view engine:

```php
<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Template Engine [EXPERIMENTAL]
    |--------------------------------------------------------------------------
    |
    | Leaf MVC unlike other frameworks tries to give you as much control as
    | you need. As such, you can decide which view engine to use.
    |
    */
    'viewEngine' => \Leaf\Blade::class,

    /*
    |--------------------------------------------------------------------------
    | Custom config method
    |--------------------------------------------------------------------------
    |
    | Configuration for your templating engine.
    |
    */
    'config' => function (\Leaf\Blade $engine, array $config) {
        $engine->configure($config['views'], $config['cache']);
    },

    /*
    |--------------------------------------------------------------------------
    | Custom render method
    |--------------------------------------------------------------------------
    |
    | This render method is triggered whenever render() is called
    | in your app if you're using a custom view engine.
    |
    */
    'render' => null,

    /*
    |--------------------------------------------------------------------------
    | Extend view engine
    |--------------------------------------------------------------------------
    |
    | Some view engines like blade allow you extend the engine to
    | add extra functions or directives. This is just the place to
    | do all of that. Extend is a function that accepts an instance
    | of your view engine which you can 'extend'
    |
    */
    'extend' => null,
];
```

We can pass a function to the `extend` key to extend the Blade view engine. Leaf will give us the instanciated view engine as the first argument, so we can use it to add our custom directive:

```php
'extend' => function (\Leaf\Blade $engine) {
    $engine->directive('Button', function ($expression) {
        return "<?php echo '<button>$expression<button>'; ?>";
    });
},
```

Now, we can use the `@Button` directive in our Blade templates:

```blade
...

@Button('Click me')
```

## Auto initialization

A lot of small annoying setup tasks have been automated in Leaf MVC 4. For instance, Leaf MVC will automatically create missing folders and install missing dependencies when you run certain commands like generator commands and scaffold commands. This means you don't even need to use `leaf install` to add things like authentication, mailing, etc. to your project. Leaf will automatically install the necessary dependencies and create the necessary files for you.

## Schema Files

Schema files are the real star of the show in Leaf MVC simply because they are the biggest change to Leaf MVC in a long time. Schema files are YAML files that define your database schema and additional options like dummy data, indexes, etc. Schema files are a great way to manage your database schema and keep it in sync with your codebase. Changes are automatically detected and applied to your database when you run the `db:migrate` command.

Here's an example of a schema file:

```yaml
# schema files add auto-increments and timestamps by default

# you can add all the columns you want under the columns key
columns:
  name: string
  identifier:
    type: string
    unique: true
  verified_at:
    type: timestamp
    nullable: true

# you can add foreign ids for other models under the relationships key key
relationships:
  - User

# seeds are optional and can be used to populate the database with dummy data
seeds:
  count: 5
  truncate: true
  data:
    name: '@faker.name'
    identifier: '@faker.uuid'
    verified_at: '@tick.format:YYYY-MM-DD HH:mm:ss'
```

You can find the full documentation on the [schema files page](/docs/database/files).

## Db command updates

The `db` command namespace works a bit differently because of the new schema files. The available db commands are:

```bash:no-line-numbers
 db
  db:migrate        Migrate your db schema files
  db:reset          Reset migration history + db tables
  db:rollback       Rollback database to a previous state
  db:seed           Seed the database with records
```

- The `db:migrate` command is used to migrate your schema files to your database. When changes are made to your schema files, you can run this command to apply the changes to your database.
- The `db:rollback` command is used to rollback your database to a previous state. You can specify the number of steps to rollback using `-s`.
- The `db:reset` command is used to reset your database and migration history.
- The `db:seed` command is used to seed your database with dummy data.

## New UIs

Leaf MVC 4 comes with a new set of UIs that are designed to be more user-friendly and easier to use. Our welcome screen and scaffolded authentication UIs have been redesigned to be more modern and more intuitive. Give it a try and let us know what you think!

## Feedback & Support

This is an alpha release, and we’d love your feedback! If you encounter any issues or have suggestions, please:

- Report bugs on our [GitHub repository](https://github.com/leafsphp/leafMVC).

- Join our weekly [YouTube hangouts](https://www.youtube.com/@leafphp/live) to share your thoughts.

Thank you for trying Leaf MVC 4 Alpha! Together, we’re building the future of minimalistic PHP frameworks.
