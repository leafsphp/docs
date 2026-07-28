# Writing Commands

Commands let you automate repetitive tasks—whether it's spinning up a project, running tests, or deploying your app. You can wrap all that logic into reusable commands that you or your team run in a heartbeat.

::: details Choosing Seedling over Leaf MVC

If you're focused on building command-line tools rather than full web apps, consider using [Leaf's Seedling](/docs/seedling/) over Leaf MVC. Seedling offers a lightweight, optimized environment solely for CLI workflows — no HTTP or view layers required. It's perfect when your project is all about commands and utilities.

:::

This documentation covers both Leaf MVC and Seedling.

## Creating a command

You can create a new command using the `g:command` command. This command will create a new command class in your `app/console` directory.

```bash:no-line-numbers
leaf g:command cache:purge
```

This will create a `CachePurgeCommand.php` file in your `app/console` directory. The file will contain a class that extends the `Command` class and implements the `handle()` method.

```php
<?php

namespace App\Console;

use Leaf\Sprout\Command;

class CachePurgeCommand extends Command
{
    protected $signature = 'cache:purge
        {argument? : argument description}
        {--o|option= : option description}';
    protected $description = 'cache:purge command\'s description';
    protected $help = 'cache:purge command\'s help';

    /**
     * Main body for your command
     */
    protected function handle()
    {
        $this->comment(
            "cache:purge command's output {$this->argument('argument')} {$this->option('option')}"
        );

        return 0;
    }
}
```

This has a few parts:

- `protected $signature`: This is where you define the name of your command, its arguments, and its options. In this example, the command is named `cache:purge`, it has one optional argument named `argument`, and one optional option named `option` with a shortcut of `o`. This means that to call this command, you would run `leaf cache:purge` in your terminal, and it can accept an optional argument and option like this: `leaf cache:purge myArgument --option myOption` or `leaf cache:purge myArgument -o myOption`.

- `protected $description`: This is a brief description of what your command does. This will be displayed when you run `leaf list` in your terminal.

- `protected $help`: This is a more detailed description of what your command does. This will be displayed when you run `leaf cache:purge --help` in your terminal.

- `protected function handle()`: This is where you put the main logic for your command. This method will be called when you run your command in the terminal. In this example, it simply outputs a comment to the console with the values of the argument and option that were passed in.

Unlike in the Symfony console, you don't have to manually deal with the `$input` and `$output`, or use a config method to define your arguments and options. Sprout makes it easier to work with commands by providing methods that allow you to access the input and output directly from within your command class.

After creating the command, Leaf will automatically register it so you can start using it right away.

## Command Arguments

Command arguments are values that are passed to the command when it is run in the console. For example, if you have a command named `example` and you run it like this:

```bash:no-line-numbers
leaf example argument1 argument2
```

For example, with system commands like `cd`, the argument is the directory you want to change to. In this case, `argument1` and `argument2` are arguments that are passed to the command.

To define an argument for your command, you need to add it to the `protected $signature` property of your command class. You can define whether the argument is required or optional by adding a `?` at the end of the argument name.

```php
protected $signature = 'example
    {argument1 : argument1 description}
    {argument2? : argument2 description}';
```

In this case, `argument1` is a required argument and `argument2` is an optional argument, so a user could run the command like this:

```bash:no-line-numbers
leaf example value1
```

Or passing both arguments like this:

```bash:no-line-numbers
leaf example value1 value2
```

You can then access the argument in the command's body using the `argument()` method.

```php
protected function handle()
{
  $this->comment("example command's output {$this->argument('argument1')} {$this->argument('argument2')}");
}
```

In some cases, you might want to define an argument that can accept multiple values. You can do this by adding `*` at the end of the argument name.

```php
protected $signature = 'example
    {argument* : argument description}';
```

In this case, `argument` can accept multiple values, so a user could run the command like this:

```bash:no-line-numbers
leaf example value1 value2 value3
```

## Command Options

Command options are also known as flags or switches, and they are additional parameters that modify the behavior of a command. They are typically optional and can be specified in various ways, such as with a `--` prefix or a shorthand `-` prefix. For example, if you have a command named `example` and you run it like this:

```bash:no-line-numbers
leaf example --option1 --option2 valueForOption2 -o valueForOption3
```

To add an option to your command, you need to add it to the `protected $signature` property of your command class. Options are always optional — what changes is whether they act as a simple on/off switch or expect a value. You can also define a shortcut for an option by adding it before the option name, separated by a `|`.

```php
protected $signature = 'example
    {--option1 : a switch, false unless passed}
    {--option2= : an option that expects a value}
    {--o|option3=leaf : an option with a shortcut and a default value}';
```

In this case, `option1` is a boolean switch (`option('option1')` returns `false` unless the user passes `--option1`), `option2` expects a value, and `option3` expects a value, defaults to `leaf`, and has a shortcut of `o`. A user could run the command like this:

```bash:no-line-numbers
leaf example --option1 --option2 valueForOption2 -o valueForOption3
```

You can then access the option in the command's body using the `option()` method.

```php
protected function handle()
{
  $this->comment("example command's output {$this->option('option1')} {$this->option('option2')} {$this->option('option3')}");
}
```

## Command Output

Sprout allows you to easily output text to the console using various methods. This makes it easier to format your output and make it more readable. You can use `write()`, `writeln()`, `comment()`, `info()` and `error()` methods.

### write()

This method writes text to the console.

```php
public function handle()
{
  $this->write('Hello World');
}
```

### writeln()

This method writes text to the console and adds a new line.

```php
public function handle()
{
  $this->writeln('Hello World');
}
```

### Styled Output

Leaf Sprout comes with a built-in output styling system that allows you to style your output using a simple API inspired by Symfony Console. Here's an example of how you can style your output:

```php
$this->write("<info>Hello</info>, <comment>world</comment>!");
$this->write("<error>Error occurred!</error>");
$this->write("<question>Are you sure?</question>");
```

Or you can use pre-configured styles like success(), error(), warning(), and info():

```php
$this->success('Operation successful');
$this->error('Operation failed');
$this->warning('This is a warning');
$this->info('This is some information');
```

Later versions will include more advanced styling options modelled after TailwindCSS and TermWind.

## User Input/Prompts

Leaf Sprout provides a unique, dead-simple way to interact with users via the console. You can ask questions, get input, and even create interactive prompts. Prompts basically allow you to ask a question and get a response from the user.

```php
$name = sprout()->prompt([
    'type' => 'text',
    'message' => 'What is your name?',
]);

$command->write("Hello, $name!"); // Hello, John Doe!
```

This will display a prompt in the console asking the user for their name.

```bash:no-line-numbers
? What is your name?
```

And when the user types their name and presses enter, it will be stored in the `$name` variable. This is a simple text prompt, but you can create more complex prompts as well.

### Confirm Prompt

A confirm prompt is a simple yes/no question that the user can answer by typing `y` or `n`. You can create a confirm prompt like this:

```php
$confirm = sprout()->prompt([
    'type' => 'confirm',
    'message' => 'Do you want to continue?',
]);

if ($confirm) {
    $command->write("Continuing...");
} else {
    $command->write("Exiting...");
}
```

This will display a prompt in the console asking the user if they want to continue.

```bash:no-line-numbers
? Do you want to continue? (Y/n)
```

And when the user types `y` or `n`, it will be stored in the `$confirm` variable as a boolean value.

### Select Prompt

A select prompt allows the user to choose from a list of options. You can create a select prompt like this:

```php
$appType = sprout()->prompt([
    'type' => 'select',
    'message' => 'What type of project do you want?',
    'default' => 0,
    'choices' => [
        ['title' => 'Leaf App', 'value' => 'leaf'],
        ['title' => 'Laravel App', 'value' => 'laravel'],
        ['title' => 'CodeIgniter App', 'value' => 'codeigniter'],
        ['title' => 'Symfony App', 'value' => 'symfony'],
        ['title' => 'CakePHP App', 'value' => 'cakephp'],
    ],
]);

$command->write("You selected: $appType"); // You selected: leaf
```

This will display a prompt in the console asking the user to select a project type.

```bash:no-line-numbers
? What type of project do you want? (Use arrow keys)
> Leaf App
  Laravel App
  CodeIgniter App
  Symfony App
  CakePHP App
```

And when the user selects an option and presses enter, the value of the selected option will be stored in the `$appType` variable. In this case, if the user selects "Leaf App", the value `leaf` will be stored in the `$appType` variable.

## Confirmation Prompt

For simple yes/no confirmations, you can use the `confirm()` method which is a shorthand for creating a confirm prompt.

```php
if (sprout()->confirm('Do you want to continue?')) {
    $command->write("Continuing...");
} else {
    $command->write("Exiting...");
}
```

This works the same way as the confirm prompt example above, but it's more concise.

## Multi-question Prompts

You can also ask multiple questions in a single prompt by passing an array of questions to the `prompt()` method. Each question can have its own type, message, and other options.

```php
$answers = sprout()->prompt([
    [
        'type' => 'text',
        'name' => 'username',
        'message' => 'What is your name?',
    ],
    [
        'type' => 'confirm',
        'name' => 'userConfirm',
        'message' => 'Are you above 18?',
    ],
    [
        'type' => 'select',
        'name' => 'userSelect',
        'message' => 'What is your favorite color?',
        'choices' => [
            ['title' => 'Red', 'value' => 'red'],
            ['title' => 'Green', 'value' => 'green'],
            ['title' => 'Blue', 'value' => 'blue'],
        ],
    ],
]);

$command->write("Hello, {$answers['username']}!"); // Hello, John Doe!
$command->write($answers['userConfirm'] ? "You are above 18." : "You are below 18."); // You are above 18.
$command->write("Your favorite color is {$answers['userSelect']}."); // Your favorite color is red.
```

This will display a series of prompts in the console asking the user for their name, if they are above 18, and their favorite color, one after the other. When the user answers all the questions, their answers will be stored in the `$answers` array, which you can then access using the question names as keys, as well as their order in the array.

We recommend using the `name` key to access the answers, as it makes your code more readable and easier to maintain. On top of that, some questions may be optional, and if the user skips them, the answers array may not have the same number of elements as the questions array. Using the `name` key ensures that you can always access the correct answer regardless of whether the question was answered or not.

### Optional Questions

There are situations where you would want to skip asking the user a question based on some condition. You can do this by setting the `type` key to `null` based on a condition.

```php
$askName = true; // Change this to false to skip the name question

$answers = sprout()->prompt([
    [
        'type' => $askName ? 'text' : null,
        'name' => 'username',
        'message' => 'What is your name?',
    ],
    [
        'type' => 'confirm',
        'name' => 'userConfirm',
        'message' => 'Are you above 18?',
    ],
]);
```

You can also use a closure to determine whether to ask the question or not. The closure will receive the current answers array as its only argument, allowing you to make decisions based on previous answers.

```php
$answers = sprout()->prompt([
    [
        'type' => 'text',
        'name' => 'username',
        'message' => 'What is your name?',
    ],
    [
        'type' => function ($answers) {
            return strtolower($answers['username']) === 'admin' ? null : 'confirm';
        },
        'name' => 'userConfirm',
        'message' => 'Are you above 18?',
    ],
]);
```

## Shell Processes

Sometimes, you may want to run a shell command from within your command. You can do this using the `sprout()->process()` method. This method allows you to run a shell command and capture its output.

```php
$process = sprout()->process('ls -la');
$process->run();

if ($process->isSuccessful()) {
    $output = $process->getOutput();
    $command->write($output);
} else {
    $error = $process->getErrorOutput();
    $command->error($error);
}
```

This will run the `ls -la` command and capture its output. If the command is successful, it will output the result to the console. If the command fails, it will output the error message to the console.

You can also use the shorter `sprout()->run()` method which is a shorthand for creating a process and running it.

```php
sprout()->run('pnpm create naytive-app my-app');
```

## Composer/Npm Commands

Sprout also includes built-in methods for running Composer and NPM commands. This makes it easy to manage your dependencies from within your command.

```php
sprout()->composer()->install('leafs/leaf');
sprout()->composer()->runScript('dev');
sprout()->composer()->remove('some/package');

$composerJsonFile = sprout()->composer()->json();

sprout()->npm()->install('express');
sprout()->npm()->runScript('build');
sprout()->npm()->remove('some-package');

$packageJsonFile = sprout()->npm()->json();
```
