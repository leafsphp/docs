# Writing Commands

Commands offer a way to encapsulate a piece of functionality that can be executed by yourself or other developers. They are a great way to automate repetitive tasks, such as setting up a new project, running tests, or deploying your app.

Leaf MVC comes with a powerful command line interface and a bunch of helpful commands to get you started, however, you can also create your own commands to automate your own tasks.

## Creating a command

You can create a new command using the `g:command` command. This command will create a new command class in your `app/console` directory.

```bash:no-line-numbers
php leaf g:command cache:purge
```

This will create a `CachePurgeCommand.php` file in your `app/console` directory. The file will contain a class that extends the `Command` class and implements the `handle()` method.

```php
<?php

namespace App\Console;

use Aloe\Command;

class CachePurgeCommand extends Command
{
  protected static $defaultName = 'cache:purge';
  public $description = 'cache:purge command\'s description';
  public $help = 'cache:purge command\'s help';

  protected function config()
  {
    $this
      ->setArgument('argument', 'optional', 'argument description')
      ->setOption('option', 'o', 'required', 'option description');
  }

  protected function handle()
  {
    $this->comment(
      "cache:purge command's output {$this->argument('argument')} {$this->option('option')}"
    );

    return 0;
  }
}
```

Leaf MVC's aloe command line tool is built on top of Symfony's console component, so you can use the same methods and properties you would use in a Symfony command. You can read more about Symfony Console [here](https://symfony.com/doc/current/components/console.html).

## Manually creating a command

All commands created through the `g:command` command are stored in the `app/console` directory and are automatically loaded by Leaf MVC. However, you can also create a command manually by creating a new class that extends the `Command` class and implementing the `handle()` method just like the example above.

```php
<?php

namespace App\Console;

use Aloe\Command;

class CachePurgeCommand extends Command
{
  protected static $defaultName = 'cache:purge';
  public $description = 'cache:purge command\'s description';
  public $help = 'cache:purge command\'s help';

  protected function config()
  {
    $this
      ->setArgument('argument', 'optional', 'argument description')
      ->setOption('option', 'o', 'required', 'option description');
  }

  protected function handle()
  {
    $this->comment(
      "cache:purge command's output {$this->argument('argument')} {$this->option('option')}"
    );

    return 0;
  }
}
```

If you are using Leaf MVC v3.8 and above, the command is automatically loaded by Leaf MVC. If you are using Leaf MVC v3.7 and below, you will need to register the command in the `app/console/Commands.php` file.

```php
<?php

namespace App\Console;

class Commands
{
    /**
     * Register commands
     *
     * @param $console
     * @return void
     *
     */
    public static function register($console): void
    {
        $console->register([
            ExampleCommand::class,
            CachePurgeCommand::class
        ]);
    }
}
```

## Command Arguments

Command arguments are values that are passed to the command when it is run in the console. For example, if you have a command named `example` and you run it like this:

```bash:no-line-numbers
php leaf example argument
```

The `argument` value is an argument that is passed to the command. You can access the argument in the `config()` method using the `setArgument()` method. It typically follows the same convention as symfony console's `addArgument` except that instead of passing in `InputArgument::state`, you just pass in the state as a string. For example, instead of `InputArgument::REQUIRED`, you just pass in `"required"`, any case is supported.

```php
protected function config()
{
  $this->setArgument('argument', 'required', 'argument description');
}
```

You can access the argument in the `handle()` method using the `argument()` method.

```php
protected function handle()
{
  $this->comment("example command's output {$this->argument('argument')}");
}
```

## Command Options

Command options are values that are passed to the command when it is run in the console. For example, if you have a command named `example` and you run it like this:

```bash:no-line-numbers
php leaf example --option=value
```

To add an option to your command, you can use the `setOption()` method in the `config()` method. It typically follows the same convention as symfony console's `addOption` except that instead of passing in `InputOption::state`, you just pass in the state as a string. For example, instead of `InputOption::VALUE_REQUIRED`, you just pass in `"required"`, any case is supported.

```php
protected function config()
{
  $this->setOption('option', 'o', 'required', 'option description');
}
```

You can access the option in the `handle()` method using the `option()` method.

```php
protected function handle()
{
  $this->comment("example command's output {$this->option('option')}");
}
```

## Command Input

Aloe makes it easier to grab the Symfony input object from anywhere in your command. This means that you don't have to pass in the `$input` variable to the `handle()` method. Instead, you can use the `input()` method.

```php
public function handle()
{
  $input = $this->input();
  $name = $input->getArgument('name');
}
```

## Command Output

Aloe makes it easier to grab and output text to the console from anywhere in your command. Unlike with symfony console, you don't have to pass in the `$output` variable to the `handle()` method. Instead, you can use `ouput()`, `write()`, `writeln()`, `comment()`, `info()`, `error()`, `question()` and `link()` methods.

### output()

This method either outputs text in your console or returns the Symfony output object. If a value is passed into `output()`, it will write the value to the console.

```php
public function handle()
{
  $this->output('Hello World');
}
```

If no value is passed into `output()`, it will return the Symfony output object.

```php
public function handle()
{
  $output = $this->output();
  $output->writeln('This is output');
}
```

### write()

This method writes text to the console. It is the same as the `output()->write()` method.

```php
public function handle()
{
  $this->write('Hello World');
}
```

### writeln()

This method writes text to the console and adds a new line. It is the same as the `output()->writeln()` method.

```php
public function handle()
{
  $this->writeln('Hello World');
}
```

### comment()

This method writes a comment styled message to the console and adds a new line. It is the same as the `output()->writeln()` method with the `SymfonyStyle::COMMENT` style.

```php
public function handle()
{
  $this->comment('Hello World');
}
```

### info()

This method writes an info styled message to the console and adds a new line. It is the same as the `output()->writeln()` method with the `SymfonyStyle::INFO` style.

```php
public function handle()
{
  $this->info('Hello World');
}
```

### error()

This method writes an error styled message to the console and adds a new line. It is the same as the `output()->writeln()` method with the `SymfonyStyle::ERROR` style.

```php
public function handle()
{
  $this->error('Hello World');
}
```

### question()

This method writes a question styled message to the console and adds a new line. It is the same as the `output()->writeln()` method with the `SymfonyStyle::QUESTION` style.

```php
public function handle()
{
  $this->question('Hello World');
}
```

### link()

This method writes a link to the console and adds a new line.

```php
public function handle()
{
  $this->link('https://leafphp.dev', 'Leaf PHP');
}
```

## Command Questions

Aloe makes it easier to ask questions in your command. You can use the `ask()`, `confirm()`, `askRaw()`, `autoComplete()`, `choice()` and `multiChoice()` methods.

### ask()

This method asks a question and returns the answer. It takes in 2 parameters:

- the question to ask
- the default answer (optional)

```php
public function handle()
{
  $name = $this->ask('What is your name?', 'Leaf');
}
```

### askRaw()

This is the same as the `ask()` method above, except that it does not trim the results that the user enters. Whatever the user enters is returned as is.

```php
public function handle()
{
  $name = $this->askRaw('What is your name?', 'Leaf');
}
```

### autoComplete()

This method allows you to ask a question and provide a list of values that the user can choose from. The user's answer will be auto-completed as they type if it matches one of the values in the list. It takes in 3 parameters:

- the question to ask
- the list of values to choose from
- the default answer (optional)

```php
public function handle()
{
  $name = $this->autoComplete('What is your name?', ['Leaf', 'PHP'], 'Leaf');
}
```

### choice()

This method allows you to ask a question and provide a list of values that the user can choose from. The user must select one of the values in the list. It takes in 4 parameters:

- the question to ask
- the list of values to choose from
- the error message to display if the user does not select one of the values in the list
- the default answer (optional)

```php
public function handle()
{
  $name = $this->choice('What is your name?', ['Leaf', 'PHP'], 'Please select a name');
}
```

### multiChoice()

This method allows you to ask a question and provide a list of values that the user can choose from. The user must select one or more of the values in the list. It takes in 4 parameters:

- the question to ask
- the list of values to choose from
- the error message to display if the user does not select one of the values in the list
- the default answer (optional)

```php
public function handle()
{
  $name = $this->multiChoice('What is your name?', ['Leaf', 'PHP'], 'Please select a name');
}
```

### confirm()

This method asks a yes/no question and returns the answer. It takes in 2 parameters:

- the question to ask
- the default answer (optional)

```php
public function handle()
{
  $name = $this->confirm('Are you sure?', 'yes');
}
```

### secret()

This method asks a question but hides the keystrokes. It takes in 2 parameters:

- the question to ask
- use hidden fallback (optional)

```php:no-line-numbers
$password = $this->secret('Confirm your password');
```
