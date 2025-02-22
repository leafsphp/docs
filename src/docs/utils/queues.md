# Queues/Workers

<!-- markdownlint-disable no-inline-html -->

<script setup>
import VideoModal from '@theme/components/shared/VideoModal.vue';
import Button from '@theme/components/shared/Button.vue';
</script>

Some tasks, like processing large CSV uploads, can slow down your app and hurt the user experience. Leaf makes it easy to offload heavy work to background jobs, keeping your app fast and responsive. With built-in queuing, you get better performance without the complexity.

<section class="flex mt-4">
    <div
        class="w-full relative text-white overflow-hidden rounded-3xl flex shadow-lg"
    >
        <div
            class="w-full flex md:flex-col bg-gradient-to-br from-pink-500 to-rose-500"
        >
            <div
                class="sm:flex-none md:w-auto md:flex-auto flex flex-col items-start relative z-10 p-6 xl:p-8"
            >
                <!-- <h3 class="text-xl font-semibold mb-2 text-shadow !mt-0">
                  Leaf MVC
                </h3> -->
                <p class="font-medium text-rose-100 text-shadow mb-4">
                  Queues are only supported by Leaf MVC. We plan to add support for Leaf Core in the near future.
                </p>
            </div>
            <!-- <div
                class="relative md:pl-6 xl:pl-8 hidden sm:block"
            >
                Hello
            </div> -->
        </div>
        <div
            class="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-rose-500 hidden sm:block"
        ></div>
    </div>
</section>

<!-- <VideoDocs
  title="New to Queues/Jobs/Workers?"
  subject="Understanding queues & background processing"
  description="Watch the this video by Mateus Guimarães"
  link="https://www.youtube.com/embed/GsdfZ5TfGPw"
/> -->

Leaf queues have three parts: the queue (stores jobs), the job (task to run), and the worker (processes jobs). You push jobs to the queue, and the worker processes them.

## Installation

To get started with Queues in Leaf, you need to install the `leaf/queue` package:

::: code-group

```bash:no-line-numbers [Leaf CLI]
leaf install queue
```

```bash:no-line-numbers [Composer]
composer require leafs/queue
```

:::

This will install the Leaf Queue package and set up the necessary files and commands for you to start using queues in your Leaf app.

<!-- This should give you access to the following commands:

- `php leaf config:publish queue` - Generate a queue configuration file.
- `php leaf g:job` - Generate a job class.
- `php leaf d:job` - Delete a job class.
- `php leaf queue:install` - Generate and run a schema file for the queue table.
- `php leaf queue:run` - Start the queue worker. -->

By default, Leaf MVC uses your database as the queue backend, storing jobs in a `leaf_php_jobs` table. If you're fine with these defaults, just restart your server—Leaf will detect the queue setup and automatically start processing jobs alongside the PHP and Vite servers.

## Creating a job

Jobs handle background tasks like sending emails after user registration. Instead of delaying the response, you can dispatch a job to the queue, keeping your app fast and responsive.

You can create a new job using the `g:job` command:

```bash:no-line-numbers
php leaf g:job SendEmail
```

This creates a `SendEmailJob` class in `app/jobs` with a `handle()` method that runs when the job is processed. You can add any logic here, like using UserMailer to send an email:

```php
<?php

namespace App\Jobs;

use Leaf\Job;
use App\Mailers\UserMailer;

class SendEmailJob extends Job
{
    /**
     * Handle the job.
     * @return void
     */
    public function handle($userId)
    {
       UserMailer::welcome($userId)->send();
    }
}
```

## Dispatching a job

After creating a job, you can dispatch it to the queue using the global `dispatch()` function:

```php:no-line-numbers
dispatch(SendEmailJob::class);
```

Some jobs like the send email job above may require some data to be passed to the job. You can pass data to the job using the `with()` method on the job:

```php:no-line-numbers
dispatch(SendEmailJob::with($userId));
```

You can also dispatch multiple jobs at once:

```php:no-line-numbers
dispatch([
  SendEmailJob::with($userId),
  SendReminderJob::with($userId),
  ScheduleFlightJob::with($userId),
]);
```

## Specifying options for a job

There are times when you need a job to behave a specific way, for instance, you may want to delay a job for a few minutes or specify the number of times a job should be attempted. You can do that by directly setting the options on the job:

```php
<?php

namespace App\Jobs;

use Leaf\Job;
use App\Mailers\UserMailer;

class SendEmailJob extends Job
{
    protected $delay = 10; // add 10 sec delay // [!code ++]
    protected $tries = 1; // try job only once (default 3) // [!code ++]

    /**
     * Handle the job.
     * @return void
     */
    public function handle($userId)
    {
       UserMailer::welcome($userId)->send();
    }
}
```

The available options are:

| Option          | Description                                                                                   |
| --------------- | --------------------------------------------------------------------------------------------- |
| delay           | The number of seconds to wait before processing a job.                                        |
| delayBeforeRetry| The number of seconds to wait before retrying a job that has failed.                          |
| expire          | The number of seconds to wait before archiving a job that has not yet been processed.        |
| force           | Whether to force the worker to process the job, even if it has expired or has reached its maximum number of retries. |
| memory          | The maximum amount of memory the worker may consume.                                          |
| timeout         | The number of seconds a child process can run before being killed.                            |
| tries           | The maximum number of times a job may be attempted.                                           |

Without a worker running, your jobs will just sit in the queue without being processed.

<!-- ## Batching Jobs

You can use batches to to queue multiple jobs in sequence—they will be processed in the order they were dispatched. The key advantage of batching is that it allows you to specify a callback that runs only after all the jobs have been completed. This is useful for cases where you need to perform an action after a set of jobs finishes successfully, such as logging the results or notifying a user when all tasks are done. To create a batch, you can use the `g:job` command:

```bash:no-line-numbers
php leaf g:job ProcessPodcast --batch
```

This will generate a file in the `app/jobs` directory with a `handle()` method that runs when the job is processed. You can add any the list of jobs you want to batch like this:

```php:no-line-numbers
<?php

namespace App\Jobs;

use Leaf\Queue\Batch;

class ProcessPodcastBatch extends Batch
{
    /**
     * Handle the batch.
     * @return void
     */
    public function handle()
    {
        $this->add([
            ProcessPodcastJob::with('file1.mp3'),
            ProcessPodcastJob::with('file2.mp3'),
            ProcessPodcastJob::with('file3.mp3'),
        ])->then(function () {
            // All jobs have been processed
        })->catch(function ($exception) {
            // An error occurred while processing the jobs
        });
    }
}
```

You can then dispatch the batch to the queue:

```php:no-line-numbers
dispatch(ProcessPodcastBatch::class);
``` -->

## Limitations of Queues/Workers

Just as with every other aspect of Leaf, we try to set everything up for you so you can get started right after running `leaf install`. This makes Leaf's queue system very easy to use, but it also comes with some limitations:

- Queues are completely stateless. This means that you can't access the current request, user, session, or any other stateful data in your jobs. If you need to access the current request, you should pass the necessary data to the job as a parameter.
- Due to its simplicity, Leaf's queue system is not as feature-rich as other queue systems like Laravel's. We are working on adding more features to the queue system.

## Configuration

If you want to change the default config for the queues and workers, you need to publish the queue config file using the MVC console:

```bash:no-line-numbers
php leaf config:publish queue
```

This will generate a `queue.php` file in your `config` directory which looks something like this:

```php
<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Default Queue Connection
    |--------------------------------------------------------------------------
    |
    | Here you may specify which of the queue connections below you wish
    | to use as your default connection for all queue work.
    |
    */
    'default' => _env('QUEUE_CONNECTION', 'database'),

    /*
    |--------------------------------------------------------------------------
    | Queue Connections
    |--------------------------------------------------------------------------
    |
    | Here you may configure the connection options for every queue backend
    | used by your application. An example configuration is provided for
    | each backend supported by Leaf. You're also free to add more.
    |
    | Drivers: "database", "redis (BETA)", "file (WIP)"
    |
    */
    'connections' => [
        'database' => [
            'driver' => 'database',
            'connection' => _env('DB_QUEUE_CONNECTION', 'default'),
            'table' => _env('DB_QUEUE_TABLE', 'leaf_php_jobs'),
        ],

        'redis' => [
            'driver' => 'redis',
            'connection' => _env('REDIS_QUEUE_CONNECTION', 'default'),
            'queue' => _env('REDIS_QUEUE', 'default'),
        ],
    ],
];
```

You can set up multiple queue connections, and Leaf will connect to them when a job is run. For now, only database queues are supported, but we are working on redis and file drivers which will be available pretty soon.

## Using a different connection

Once you have configured another database connection, you can run a job using that queue connection by specifying it inside the job you create like this:

```php
<?php

namespace App\Jobs;

use Leaf\Job;
use App\Mailers\UserMailer;

class SendEmailJob extends Job
{
    protected $connection = 'myOtherConnection';

    /**
     * Handle the job.
     * @return void
     */
    public function handle($userId)
    {
       UserMailer::welcome($userId)->send();
    }
}
```

From there, you can dispatch the job just as you always do:

```php:no-line-numbers
dispatch(SendEmailJob::with($userId));
```

## Deployment

Leaf sets up the necessary files and commands for you to start using queues in your Leaf app. However, once deployed, you’ll need to set up your server to keep your workers running continuously. Check out this guide on [deploying queues/workers](/learn/deployment/#deploying-queues-workers) for more information.
