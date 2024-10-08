# Overview

<!-- markdownlint-disable no-inline-html -->

<script setup>
import VideoDocs from '/@theme/components/VideoDocs.vue'
</script>

Unlike other frameworks, Leaf requires no configuration out of the box. However, Leaf provides options for those who want to customize the framework to their needs.

## Applying Config

There are <span class="class-mode">3</span><span class="functional-mode">2</span> main ways to apply config to your Leaf application. Although they achieve the same result, each method has its own advantages and disadvantages. Let's take a look:

<div class="class-mode">

- **Passing config during instantiation**

  To define settings upon instantiation, pass an associative array into the Leaf constructor. The array keys are the setting names and the array values are the setting values. This is the most performant way to define settings for Leaf, and we'll recommend this if you're using class mode.

  ```php
  $app = new Leaf\App([
    'debug' => true
  ]);
  ```

- **Using the `config()` method**

  This method is the most common way to apply config to your Leaf application. It's also the most flexible way to apply config. You can apply config at any point in your application, and you can apply multiple config at once. *Note that the config will only be applied to code that comes after the config method.*

  ```php
  $app = new Leaf\App;
  $app->config([
    'debug' => true,
    'views.path' => '../views'
  ]);
  ```

</div>
<div class="functional-mode">

- **Using the `config()` method**

  The `config()` method is the recommended way to apply config to your Leaf application. It allows you to set and get config values at any point in your application, and you can apply multiple config at once. *Note that the config will only be applied to code that comes after the config method.*

  ```php
  app()->config([
    'debug' => true,
    'views.path' => '../views'
  ]);
  ```

</div>

- **Using the `Leaf\Config` class**

  The Config class is the central point for all of Leaf's config. It allows you to set and get config from anywhere in your app. However, it is best to set config before initializing Leaf.

  ```php
  Leaf\Config::set([
    'views.path' => 'views',
    'views.cachePath' => 'views/cache'
  ]);

  // your leaf app after this
  ```
