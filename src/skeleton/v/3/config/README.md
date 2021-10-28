# Config

As mentioned before skeleton is really customizable and allows you to configure everything including the way Leaf itself behaves.

## Available configuration

```sh
├── Config
│   ├── app.php
│   ├── auth.php
│   ├── bootstrap.php
│   ├── functions.php
│   ├── paths.php
│   └── view.php
```

`Config/app.php` holds all configuration pertaining to your Leaf app. You can directly change your app's state and all the configuration you need.

`Config/auth.php` holds configuration for Leaf Auth.

`functions.php` holds shortcut methods you can call from anywhere in your application.

`paths.php` holds paths configurations. If you want to customize Skeleton's directory structure, this is the file to go to.

`view.php` houses Leaf's view configuration.
