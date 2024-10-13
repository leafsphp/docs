# MVC Configuration

Leaf MVC tries to maintain a clean and easy-to-understand structure that works out-of-the-box for most applications. However, there are times when you need to customize some features to fit your specific use-cases.

You can find all the configuration options used by Leaf MVC in the `config` directory of your Leaf MVC project. Each feature has its own configuration file, and you can customize these files to fit your needs, e.g. the database configuration file is `config/database.php`.

You only need to change only the specific values you want to customize so you can leave the rest of the configuration as it is. Each option is documented, so feel free to look through the files and get familiar with the options available to you.

For the final bit, we hooked up most of the configuration files to your `.env` file so you can easily change your configuration values without having to touch the configuration files directly. This is especially useful when you want to deploy your application to different environments.

## Application Environment

A fresh Leaf MVC installation comes with a `.env.example` file which is automatically duplicated to a `.env` file on installation. This file is used to store your application's environment variables, and you can put sensitive information like your database credentials or mail server credentials in this file. This allows you to have different configurations for different environments like development, testing, and production.

Any value in your `.env` file is automatically loaded into your application's environment variables, and you can access these values using the `_env()` helper function. This function takes in the key of the environment variable you want to access and an optional default value if the environment variable is not set.

Here's an example of how you can use the `_env()` helper function:

```php
$database = _env('DB_DATABASE');
$databaseWithDefault = _env('DB_DATABASE', 'leaf');
```

Be careful not to commit your `.env` file to your version control system as it contains sensitive information. We have already added the `.env` file to your `.gitignore` file so you don't have to worry about this.


