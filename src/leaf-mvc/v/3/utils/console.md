# Aloe CLI 💻

**This console uses the `php` console, so you should have php path defined😉**

<p class="alert -warning">
  Note that v2+ will ship with <a href="/#/aloe-cli/">aloe cli</a> instead of the standard Leaf CLI
</p>

Aloe is CLI that comes with leaf MVC and Leaf MVC v2 upwards. Aloe is integrated into the `leaf` script and provides a number of helpful commands that can assist you while you build your application. To view all available commands, you can use the `list` command or call `leaf`.

```bash
php leaf list
# or
php leaf
```

Every command also includes a "help" screen which displays and describes the command's available arguments and options. To view a help screen, precede the name of the command with help:

```sh
php leaf help db:migrate
```

## Interact (REPL)

Aloe comes with aloe-interact which is basically powerful REPL powered by [PSY Shell](https://github.com/bobthecow/psysh). Interact allows you to interact with your app, access variables and methods in your Leaf app, run and rollback migrations, perform database operations and so much more. You can access interact on aloe like this:

```sh
php leaf interact
```

## Writing Commands

Aside all the commands provided by aloe, you can also create your own commands and run them through the aloe cli. Aloe CLI allows you to directly generate commands to run in the CLI.

### Generating Commands

To create a new command, you may use the `g:command` aloe command. This command will create a new command class in the default commands directory.

The default directory for commands in leaf MVC and Leaf MVC is `App\Console`, with skeleton, you're free to decide where to place your commands.

```sh
php leaf g:command SendMail
```

Aloe can also generate namespaced commands directly for you. You don't have to manually set namespaces as done with other CLI tools.

```sh
php leaf g:command mail:send
```

If you want to, you can even generate the command by it's name instead of it's class. Aloe is smart enough to differentiate them.

```sh
php leaf g:command shutdown 
```

### Command Structure

After generating your command, you should start writing what to execute once the command is called. Aloe smartly generates a command name for you, even if you create the command using the class name, however, if it doesn't match what you need, you can always change it.

With the `mail:send` example above, Aloe wil generate `App\Console\MailSendCommand`, in this file, we'll have something that looks like this:

```php
<?php
namespace App\Console;

use Aloe\Command;

class ExampleCommand extends Command
{
    protected $command = "mail:send";
    protected $description = "mail:send command's description";
    protected $help = "mail:send command's help";

    public function handle()
    {
        $this->comment("mail:send command's output");
    }
}
```

We can add an argument to find the user to send the email to, and output a message while sending the email.

```php
public function config()
{
    $this->setArgument("user", "required");
}

public function handle()
{
    $user = $this->argument('user');

    $this->comment("Sending email to $user");

    $success = CustomEmailHandler::send($user);

    if ($success) {
        $this->info("Email sent successfully");
    } else {
        $this->error("Couldn't send email, pls try again");
    }
}
```

### IO

Stuff about input and output

### Registering Commands

By default, aloe cli registers all commands generated, however, if you have a command you want to register manually, or commands from a package which need to use Aloe, you can also add them pretty easily.

Simply locate the `aloe` file in the root directory of your project, open it up and find a commented section talking about custom commands.

```php
/*
|--------------------------------------------------------------------------
| Add custom command
|--------------------------------------------------------------------------
|
| If you have a new command to add to Leaf
|
*/
$aloe->register(\App\Console\ExampleCommand::class);
```

An example command has already been registered, so you can follow this example. Simply call the `register` method. You can also pass in an array of commands to register, as such, a custom package with a couple of commands to register can simply return an array of all those commands.

```php
$aloe->register([
    \App\Console\AppCommand::class,
    CustomPackage::commands(),
]);
```

## Commands

```sh
Available commands:
  example        example command's description
  help           Displays help for a command
  interact       Interact with your application
  list           Lists commands
  serve          Start the leaf development server
 aloe
  aloe:config    Install aloe config
 app
  app:down       Place app in maintainance mode
  app:up         Remove app from maintainance mode
 d
  d:command      Delete a console command
  d:controller   Delete a controller
  d:factory      Delete a model factory
  d:migration    Delete a migration
  d:model        Delete a model
  d:seed         Delete a model seeder
 db
  db:install     Create new database from .env variables
  db:migrate     Run the database migrations
  db:rollback    Rollback all database migrations
  db:seed        Seed the database with records
 env
  env:generate   Generate .env file
 g
  g:command      Create a new console command
  g:controller   Create a new controller class
  g:factory      Create a new model factory
  g:helper       Create a new helper class
  g:migration    Create a new migration file
  g:model        Create a new model class
  g:seed         Create a new seed file
  g:template     Create a new view file
 scaffold
  scaffold:auth  Scaffold basic app authentication
```

**For the full documentation, you can refer to [aloe-cli docs](aloe-cli/)**

## Next Steps

- [Helper Functions](/leaf-mvc/v/2.0/utils/functions)
- [Routing](/leaf-mvc/v/2.0/core/routing)
- [Controllers](/leaf-mvc/v/2.0/core/controllers)
- [Models](/leaf-mvc/v/2.0/core/models)

Built with ❤ by [**Mychi Darko**](//mychi.netlify.app)
