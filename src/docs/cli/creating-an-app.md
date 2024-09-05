# Creating a new app with the CLI

<!-- markdownlint-disable no-inline-html -->

<script setup>
import VideoModal from '@theme/components/shared/VideoModal.vue'
</script>

The Leaf CLI is a powerful tool and offers multiple ways to create a new Leaf app. These are all tailored towards different preferences and use cases. You can create a new Leaf app using:

- [The basic installation method](#basic-installation)
- [Custom installation method](#customizing-your-app)
- [The GUI installation method](#gui-installation)

<VideoModal
  buttonText="Leaf CLI walkthrough"
  description="You can take a look at our leaf cli setup walkthrough on youtube."
  videoUrl="https://www.youtube.com/embed/yb3LUYHtopQ"
/>

## Basic Installation

Once you have the Leaf CLI installed, you can create a new Leaf app by running the following command:

```bash:no-line-numbers
leaf create my-app
```

This will open up a prompt asking you to choose a template for your app. You can choose between a basic Leaf app, a full Leaf MVC application, or a Leaf MVC application which has been fine-tuned for creating APIs.

```bash
? What kind of app do you want to create? [leaf]
  [0] leaf
  [1] leaf mvc
  [2] leaf mvc for apis
 > 
```

After you've made your choice, the CLI will create a new directory with the name you provided and set up a new Leaf app for you. All you have to do is navigate into the new directory and run the app.

```bash:no-line-numbers
cd my-app
leaf serve
```

## Customizing your app

Leaf is modular and flexible, so you can customize your app to fit your needs. Leaf CLI allows you to do this on installation by allowing you to select only the features you need. This way, you can keep your app lightweight and only include the features you need.

To set up a new Leaf app with only the features you need, you can run the following command:

```bash:no-line-numbers
leaf create my-app --custom
```

This will open up a prompt asking you to choose the features you want to include in your app. You can choose between the following features:

```bash:no-line-numbers
? What modules would you like to add? [none] eg: 1,2,7
  [0] None
  [1] Database
  [2] Authentication
  [3] Session support
  [4] Cookie support
  [5] CSRF protection
  [6] CORS support
  [7] Leaf Date
  [8] Leaf Fetch
 > 
```

For Leaf MVC, you can also select things like the View engine you prefer to use:

```bash
? What view engine would you like to use? [Blade]
  [0] Blade
  [1] Bare UI
  [2] React/Vue
 > 
```

Whether to add a bundler for your frontend assets:

```bash
? Do you want to add Vite to bundle your assets? [Yes]
```

And whether to add a testing framework:

```bash
? What testing framework would you like to use? [none]
  [0] none
  [1] pest
  [2] phpunit
 >
```

Once you have selected the features you want, the CLI will set up a new Leaf app with only the features you selected. You can then navigate into the new directory and run the app.

```bash:no-line-numbers
cd my-app
leaf serve
```

## GUI Installation

Not everyone is comfortable with the command line, and that's okay. If you prefer a graphical user interface, you can use the Leaf GUI to create a new Leaf app. The Leaf GUI opens up a browser window where you can select the features you want and create a new Leaf app with just a few clicks.

To use the Leaf GUI, you can run the following command:

```bash:no-line-numbers
leaf ui
```

<img src="https://github.com/leafsphp/csrf/assets/26604242/937f930c-1053-4393-9e6f-fc4faa9cdfe1" style="border: 1px solid var(--vp-c-bg-alt); border-radius: 8px;" />

It allows you to select the features you want to include in your app and creates a new Leaf app with only the features you selected. You can then navigate into the new directory and run the app.

```bash:no-line-numbers
cd my-app
leaf serve
```
