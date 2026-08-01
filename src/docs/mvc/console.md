# MVC Console

<!-- markdownlint-disable no-inline-html -->

Leaf MVC ships with a built-in console for managing your application from the terminal: generators, scaffolds, database commands, and app utilities, all through the `leaf` file in your project root. It's powered by [Sprout](https://seedling.leafphp.dev), Leaf's console engine, and there's nothing to install: every Leaf MVC app has it from the first `leaf create`.

To see every command available in your app, run:

```bash:no-line-numbers
php leaf list
```

::: info Coming from Leaf 4?
Earlier Leaf MVC versions used a separate console package called Aloe. Aloe is retired in Leaf 5. The console is now part of MVC core itself, so there's no extra dependency to install or update. Your muscle memory survives: the command names (`g:controller`, `db:migrate`, `scaffold:auth`, …) are the same.
:::

## The console vs. Leaf CLI

Two different tools, two different jobs:

- **Leaf CLI** (`leaf` installed globally) creates and manages projects from anywhere: `leaf create`, `leaf install`, `leaf serve`.
- **The MVC console** (`php leaf` inside a project) manages *this* app: generating files, running migrations, scaffolding features.

Inside a Leaf MVC project, the global CLI hands commands it doesn't know over to your app's console, so `leaf g:controller Posts` and `php leaf g:controller Posts` do the same thing.

## Generators

Create app files with the right structure and namespaces in one command:

```bash:no-line-numbers
php leaf g:controller Posts              # controller
php leaf g:controller Posts -m           # controller + model
php leaf g:controller Posts -a           # controller + model + schema
php leaf g:controller Posts --resource   # full CRUD controller
php leaf g:model Post                    # model
php leaf g:schema posts                  # schema YAML file
php leaf g:middleware LogRequest         # middleware class
php leaf g:mailer Welcome                # mailer class
php leaf g:job SendEmail                 # queue job
php leaf g:route posts                   # route partial in app/routes
php leaf g:template home                 # view file
php leaf g:helper Format                 # helper class
```

Some generators come with the modules that power them: `g:model` and `g:schema` arrive with the db/schema module, `g:job` with the queue module. They register themselves automatically when the module is installed, and `php leaf list` always shows what your app can do right now.

Made a mess? Every generator has a matching delete command: `d:controller`, `d:model`, `d:schema`, `d:job`.

## Scaffolds

Scaffolds generate complete features, not single files:

```bash:no-line-numbers
php leaf scaffold:auth           # full authentication: signup, login, protected routes
php leaf scaffold:landing-page   # landing page for your app
php leaf scaffold:waitlist       # waitlist capture
php leaf scaffold:mail           # leaf mail + config
php leaf scaffold:shadcn         # shadcn/ui for your React frontend
php leaf scaffold:ai             # streaming AI chat powered by Claude
php leaf scaffold:blog           # markdown blog with a sample post
php leaf scaffold:contact        # contact form wired to leaf mail
php leaf scaffold:legal          # editable privacy + terms pages
php leaf scaffold:subscriptions  # billing/subscriptions (needs leaf billing)
```

## Database

Your schema lives in YAML files under `app/database/` (one per table), and these commands move it into your database:

```bash:no-line-numbers
php leaf db:migrate     # apply your schema files
php leaf db:seed        # seed the database with records
php leaf db:rollback    # roll back to a previous state
php leaf db:reset       # reset migration history + tables
php leaf db:drop        # drop tables and reset migration history
```

See [Database](/docs/database/) for how schema files work.

## App utilities

```bash:no-line-numbers
php leaf serve             # start the development server
php leaf app:down          # put the app in maintenance mode
php leaf app:up            # bring it back
php leaf env:generate      # generate a .env file
php leaf env:set KEY=val   # set an environment variable
php leaf key:generate      # generate/regenerate your app key
php leaf link              # symlink the storage directory
php leaf config:publish    # publish config files to your project
php leaf interact          # interact with your app in a REPL-style session
```

## Frontend

When your app has a frontend setup, the console proxies your asset tooling so you never leave one terminal:

```bash:no-line-numbers
php leaf view:install    # install frontend scaffolding
php leaf view:dev        # run your frontend dev command
php leaf view:build      # run your frontend build command
```

## Queues

With the queue module installed:

```bash:no-line-numbers
php leaf queue:work      # start your queue worker
```

## Writing your own commands

Your app's own commands live in `app/console/` (autoloaded under `App\Console`). A command is a small Sprout class (a `signature`, a `description`, and a `handle()` method) and it appears in `php leaf list` alongside the built-ins:

```php
<?php

namespace App\Console;

use Leaf\Sprout\Command;

class SendReportsCommand extends Command
{
    protected $signature = 'send-weekly-reports
        {team? : Only send for this team}
        {--dry-run : Preview without sending}';
    protected $description = 'Send the weekly report emails';

    protected function handle(): int
    {
        $team = $this->argument('team') ?? 'everyone';

        if ($this->option('dry-run')) {
            $this->info("Would send reports for: $team");

            return 0;
        }

        // your app's models, helpers and lib/ functions are all available here
        $this->info("Reports sent for: $team");

        return 0;
    }
}
```

```bash:no-line-numbers
php leaf send-weekly-reports design --dry-run
```

Command names take dashes and namespaces freely (`send-weekly-reports`, `reports:send-weekly`), and everything your app loads (models, helpers, `lib/` functions) is available inside `handle()`. See the [Seedling docs](https://seedling.leafphp.dev) for the full command-writing guide.
