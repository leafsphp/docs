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

After installing the package, you need to register the Leaf Queue commands in the Leaf MVC console. You can do this by adding the following line to your `leaf` file in the root of your Leaf MVC app:

```php
/*
|----------------------------------------------------------------
| Load Leaf configuration
|----------------------------------------------------------------
|
| Leaf MVC allows you to customize Leaf and it's modules using
| configuration files defined in the config folder. This line
| loads the configuration files and makes them available to
| your application.
|
*/
Leaf\Core::loadConsole([
  Leaf\Redis::commands() // [!code ++]
]);
```

This gives you access to new commands which you can use to manage your queues and workers.

<!-- This should give you access to the following commands:

- `php leaf config:publish queue` - Generate a queue configuration file.
- `php leaf g:job` - Generate a job class.
- `php leaf d:job` - Delete a job class.
- `php leaf queue:install` - Generate and run a schema file for the queue table.
- `php leaf queue:run` - Start the queue worker. -->

Leaf queues have three parts: the queue (stores jobs), the job (task to run), and the worker (processes jobs). You push jobs to the queue, and the worker processes them.

By default, Leaf MVC uses your database as the queue backend, a new table called `leaf_php_jobs` is created to store your jobs. If you are okay with these defaults, you can start using the queue right away without any additional configuration by starting your worker:

```bash:no-line-numbers
php leaf queue:work
```

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

After creating a job, you can dispatch it to the queue using the `dispatch()` method:

```php:no-line-numbers
dispatch(SendEmailJob::class);
```

Some jobs like the send email job above may require some data to be passed to the job. You can pass data to the job using the `with()` method:

```php:no-line-numbers
dispatch(SendEmailJob::with($userId));
```

## Specifying options for a job

In the Worker config, you can specify default options for your jobs. However, you can also specify options for a job when dispatching it to the queue. For example, if you want to delay a job for 5 minutes, you can do so by passing the `delay` option to the `dispatch()` method:

```php:no-line-numbers
dispatch(SendEmailJob::with($userId), [
  'delay' => 5
]);
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

Remember to start your worker to process the job:

```bash:no-line-numbers
php leaf queue:work
```

Without a worker running, your jobs will just sit in the queue without being processed.

## Batching Jobs

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
```

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
    | Drivers: "redis", "database", "file (BETA)"
    |
    */
    'connections' => [
        'redis' => [
            'host' => _env('REDIS_HOST', '127.0.0.1'),
            'port' => _env('REDIS_PORT', '6379'),
            'password' => _env('REDIS_PASSWORD', ''),
            'dbname' => _env('REDIS_DB', 0),
            'after_commit' => false,
        ],

        'database' => [
            'driver' => 'database',
            'connection' => _env('DB_QUEUE_CONNECTION'),
            'table' => _env('DB_QUEUE_TABLE', 'leaf_php_jobs'),
            'queue' => _env('DB_QUEUE', 'default'),
            'retry_after' => (int) _env('DB_QUEUE_RETRY_AFTER', 90),
            'after_commit' => false,
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Worker config
    |--------------------------------------------------------------------------
    |
    | This section sets up the configuration for your worker. This config
    | is used by default when you dispatch a job. You can override this
    | config by passing a config array to the dispatch method.
    |
    */
    'workerConfig' => [
        /*
        |----------------------------------------------------------------------
        | Job execution delay
        |----------------------------------------------------------------------
        |
        | This option allows you to set a delay for when a job should
        | be executed. This is useful for scheduling jobs to run
        | at a later time.
        |
        */
        'delay' => 0,

        /*
        |----------------------------------------------------------------------
        | Delay before retry
        |----------------------------------------------------------------------
        |
        | This option allows you to set a delay for when a job should
        | be retried. This is useful when you need to setup
        | something before retrying a job.
        |
        */
        'delayBeforeRetry' => 0,

        /*
        |----------------------------------------------------------------------
        | Expire time
        |----------------------------------------------------------------------
        |
        | Set a time limit for how long a job should be kept in the queue.
        | This is useful for archiving old jobs that you may need to
        | reference later for data or other purposes.
        |
        */
        'expire' => 60,

        /*
        |----------------------------------------------------------------------
        | Force job execution
        |----------------------------------------------------------------------
        |
        | Force a job to run even if it has expired or reached its retry
        | limit. This is useful for jobs that you need to run
        | at all costs.
        |
        */
        'force' => false,

        /*
        |----------------------------------------------------------------------
        | Memory limit
        |----------------------------------------------------------------------
        |
        | This option allows you to set a memory limit for the worker.
        | This is useful for preventing memory leaks and
        | other memory related issues.
        |
        */
        'memory' => 128,

        /*
        |----------------------------------------------------------------------
        | Quit when queue is empty
        |----------------------------------------------------------------------
        |
        | Should the worker should quit when the queue is empty?
        | By default, the worker will keep running even when
        | the queue is empty.
        |
        */
        'quitOnEmpty' => false,

        /*
        |----------------------------------------------------------------------
        | Worker sleep time
        |----------------------------------------------------------------------
        |
        | Set how long the worker should sleep when the queue is empty.
        | This is useful for preventing the worker from consuming
        | too much CPU when the queue is empty.
        |
        */
        'sleep' => 3,

        /*
        |----------------------------------------------------------------------
        | Queue timeout
        |----------------------------------------------------------------------
        |
        | This option allows you to set a timeout for the queue.
        | This is useful for preventing the queue from
        | running for too long.
        |
        */
        'timeout' => 60,

        /*
        |----------------------------------------------------------------------
        | Job retry limit
        |----------------------------------------------------------------------
        |
        | This option allows you to set a retry limit for a job.
        | This is useful for preventing a job from
        | running too many times.
        |
        */
        'tries' => 3,
    ],
];
```

## Configuration options

There are several configuration options available to you in the `config/queue.php` configuration file. These options are used to determine the connection information for your queues, as well as various other options such as queue retry settings, queue logging, queue worker sleep durations, and more.

### Adapter

The `adapter` option specifies the system that will be used to run your queues. Leaf supports `redis` and `db` as queue adapters. The `redis` adapter uses Redis as a queue backend, while the `db` adapter uses your database as a queue backend.

### Default

The `default` option specifies which of the queue connections found in your config should be used as the default connection for all queue operations. Leaf supports `redis`, `sqlite`, `mysql`, `pgsql`, and `sqlsrv` as queue connections. You can also specify a custom connection by providing the name of a connection that is defined in the `connections` array of your `config/queue.php` file.

### Connections

The `connections` option contains an array of all of the queue connections defined for your application. Each connection corresponds to a queue adapter supported by Leaf. For example, the following configuration defines a connection named `redis` that uses the `redis` adapter to connect to a Redis server:

```php
'connections' => [
  'redis' => [
    'host' => _env('REDIS_HOST', '127.0.0.1'),
    'port' => _env('REDIS_PORT', '6379'),
    'password' => _env('REDIS_PASSWORD', ''),
    'dbname' => _env('REDIS_DB', 0),
  ],

  ...
```

### Queue table

If you are using the `db` adapter, you will need to configure a database table to store your jobs. You can use the `table` option to specify the name of the table. By default, Leaf will use the `leafphp_main_jobs` table that is already included with your application. If you would like to use a different table, you should create the table and specify its name in your `config/queue.php` configuration file:

```php:no-line-numbers
'table' => 'leaf_php_jobs',
```

### Worker Config

Worker config includes the default settings used by your worker when executing a job. These settings can be specified when dispatching a job, but if not specified, the worker will use these settings instead.

| Option          | Description                                                                                   |
| --------------- | --------------------------------------------------------------------------------------------- |
| delay           | The number of seconds to wait before processing a job.                                        |
| delayBeforeRetry| The number of seconds to wait before retrying a job that has failed.                          |
| expire          | The number of seconds to wait before archiving a job that has not yet been processed.        |
| force           | Whether to force the worker to process the job, even if it has expired or has reached its maximum number of retries. |
| memory          | The maximum amount of memory the worker may consume.                                          |
| quitOnEmpty     | Whether the worker should quit when the queue is empty.                                       |
| sleep           | The number of seconds to wait before polling the queue for new jobs.                         |
| timeout         | The number of seconds a child process can run before being killed.                            |
| tries           | The maximum number of times a job may be attempted.                                           |

## Connecting to your queue

As mentioned above, Leaf queue only supports `redis` and `db` as queue adapters. To connect to your queue, you need to specify the adapter and connection you want to use. You can do this by specifying the adapter and connection in the `config/queue.php` file:

```php
'default' => 'redis', // the connection to use for your queues and workers by default
'adapter' => 'redis',
```

<!-- ## Deployment -->
