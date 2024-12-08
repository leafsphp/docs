# MVC Console

<!-- markdownlint-disable no-inline-html -->

Leaf MVC includes a powerful command-line tool called Aloe to help you manage your application from the terminal. With Aloe, you can scaffold projects, manage databases, and handle various app tasks efficiently, all with simple commands. To get started and see the list of all available commands, just run:

```bash:no-line-numbers
php leaf list
```

::: details Missing commands?

If you get errors from commands which you saw in the documentation, you are probably running an older version of the Leaf MVC console. We add more handy commands regularly, but as the console does not automatically update, you may run into the missing command error. To fix that problem, you need to install the latest version of Aloe:

```bash:no-line-numbers
leaf install aloe

# or with composer

composer require leafs/aloe
```

:::

## Aloe vs. Leaf CLI: What's the Difference?

Before diving in, it’s important to know that Aloe is different from Leaf CLI.

Leaf CLI is a general tool used for creating and managing any Leaf application. It's installed globally and works across different Leaf apps, including Leaf MVC.

Aloe is more specific. It's used only in the root directory of your Leaf MVC apps. Aloe has commands that are specifically designed for managing Leaf MVC projects.

## Aloe Command Categories

Aloe commands are divided into six groups to help with different parts of your development process:

- App Commands: Manage your app's state and dependencies.
- Scaffold Commands: Create files and structures in your app.
- Generate Commands: Quickly create controllers, models, and more.
- Delete Commands: Remove unwanted files.
- Database Commands: Manage your app’s database.
- View Commands: Build and serve your frontend.

### App Commands

- Serve

  To run your app, use the serve command, which starts a development server. It’s similar to running php -S localhost:[PORT], but with some added setup specific to Leaf.

  ```bash:no-line-numbers
  php leaf serve
  ```

  You can also specify a custom port:

  ```bash:no-line-numbers
  php leaf serve --port=8000
  ```

- Interact

  If you want to interact with your app directly in the terminal, use interact. This opens a REPL (Read-Eval-Print Loop) powered by PsySH.

  ```bash:no-line-numbers
  php leaf interact
  ```

- Maintenance Mode

  Sometimes you need to take your app down for maintenance. Use app:down to put your app in maintenance mode (it will return a 503 status), and app:up to bring it back online.

  ```bash:no-line-numbers
  php leaf app:down
  php leaf app:up
  ```

### Scaffold Commands

These commands help you quickly create files and structure your app.

- Scaffold Authentication

  Need basic user authentication? Use the auth:scaffold command to automatically generate everything you need for login and registration (routes, models, controllers, views, etc.).

  ```bash:no-line-numbers
  php leaf auth:scaffold
  ```

  For a Leaf MVC app: generates full login and registration views and controllers. You can force it to generate API files using `--api`.

  ```bash:no-line-numbers
  php leaf auth:scaffold --api
  ```

- Mail Setup

  To set up mailing for your app, run:

  ```bash:no-line-numbers
  php leaf mail:setup
  ```

  This installs the Leaf Mail package and sets up the necessary configuration files.

### Generate Commands

These commands are used to generate files for your project, saving you time by automating tasks like creating controllers, models, migrations, etc.

- Create a Controller

  To generate a new controller, use:

  ```bash:no-line-numbers
  php leaf g:controller [name]
  ```

  You can add a resource route (for standard CRUD operations) with:

  ```bash:no-line-numbers
  php leaf g:controller [name] --resource
  ```

  You can also create a controller with a model or migration:

  ```bash:no-line-numbers
  php leaf g:controller [name] --model
  php leaf g:controller [name] --all # or -a to generate everything
  ```

- Create a Model

  Need a model for your database? Generate one with:

  ```bash:no-line-numbers
  php leaf g:model [name]
  ```

  To create a model with a migration, use:

  ```bash:no-line-numbers
  php leaf g:model [name] --migration
  ```

- Other Generate Commands

  - Factory: php leaf g:factory [name]
  - Helper: php leaf g:helper [name]
  - Mailer: php leaf g:mailer [name]
  - Migration: php leaf g:migration [name]
  - Seed: php leaf g:seed [name]
  - View Template: php leaf g:template [name] --type=[blade|jsx|vue|html]

### Delete Commands

These are the reverse of generate commands—use them to delete files.

- Delete Controller: php leaf d:controller [name]
- Delete Model: php leaf d:model [name]
- Delete Migration: php leaf d:migration [name]
- Delete Seed: php leaf d:seed [name]

### Database Commands

Leaf MVC makes database management easy with these commands.

- Create a Database

  To create a new database from the credentials in your .env file, use:

  ```bash:no-line-numbers
  php leaf db:install
  ```

- Migrate Database

  To run your migrations and set up your database schema, run:

  ```bash:no-line-numbers
  php leaf db:migrate
  ```

- Reset Database

  This command rolls back, migrates, and seeds your database in one go:

  ```bash:no-line-numbers
  php leaf db:reset
  ```

  You can skip the seeding step if you want:

  ```bash:no-line-numbers
  php leaf db:reset --noSeed
  ```

- Rollback Database

  If you need to undo recent changes, you can roll back your migrations with:

  ```bash:no-line-numbers
  php leaf db:rollback
  ```

  You can also rollback a specific number of migrations using the --step flag:

  ```bash:no-line-numbers
  php leaf db:rollback --step=2
  ```

- Seed Database

  To populate your database with dummy data, use:

  ```bash:no-line-numbers
  php leaf db:seed
  ```

### View Commands

These commands handle your frontend setup, building, and serving.

- Build Your Frontend

  When you’re ready to compile your frontend for production, run:

  ```bash:no-line-numbers
  php leaf view:build
  ```

- Serve Your Frontend

  To start your frontend development server, use:

  ```bash:no-line-numbers
  php leaf view:serve
  ```

- Viewing All Commands

  You can always view the full list of Aloe commands by running:

  ```bash:no-line-numbers
  php leaf list
  ```

  This will display all available commands for your version of Leaf MVC.

  With this guide, you should be ready to take full advantage of Aloe and streamline your Leaf MVC app development. Happy coding! 😊

## Command List

This is a list of every command available in Aloe. To view this list from your terminal, run `php leaf list`.

```bash:no-line-numbers
Leaf MVC v3.8.0

Usage:
  command [options] [arguments]

Options:
  -h, --help            Display help for the given command. When no command is given display help for the list command
  -q, --quiet           Do not output any message
  -V, --version         Display this application version
      --ansi|--no-ansi  Force (or disable --no-ansi) ANSI output
  -n, --no-interaction  Do not ask any interactive question
  -v|vv|vvv, --verbose  Increase the verbosity of messages: 1 for normal output, 2 for more verbose output and 3 for debug

Available commands:
  completion        Dump the shell completion script
  help              Display help for a command
  interact          Interact with your application
  link              Create a symbolic link for the storage directory
  list              List commands
  serve             Start the leaf development server
 app
  app:down          Place app in maintainance mode
  app:up            Remove app from maintainance mode
 auth
  auth:scaffold     Scaffold basic app authentication
 config
  config:lib        Setup Leaf MVC to use external libraries
  config:mail       Install leaf mail and setup mail config
 d
  d:command         Delete a console command
  d:controller      Delete a controller
  d:factory         Delete a model factory
  d:migration       Delete a migration
  d:model           Delete a model
  d:seed            Delete a model seeder
 db
  db:install        Create new database from .env variables
  db:migrate        Run the database migrations
  db:reset          Rollback, migrate and seed database
  db:rollback       Rollback all database migrations
  db:seed           Seed the database with records
 devtools
  devtools:install  Install the Leaf PHP devtools
 env
  env:generate      Generate .env file
 g
  g:command         Create a new console command
  g:controller      Create a new controller class
  g:factory         Create a new model factory
  g:helper          Create a new helper class
  g:mailer          Create a new mailer
  g:middleware      Create a new application middleware
  g:migration       Create a new migration file
  g:model           Create a new model class
  g:seed            Create a new seed file
  g:template        Create a new view file
 key
  key:generate      Run your frontend dev server
 view
  view:build        Run your frontend dev server
  view:dev          [view:serve] Run your frontend dev server
  view:install      Run a script in your composer.json
```
