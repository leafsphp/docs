# Leaf + Blade

<!-- markdownlint-disable no-inline-html -->

<script setup>
import VideoModal from '@theme/components/shared/VideoModal.vue'
import Button from '@theme/components/shared/Button.vue'
</script>

Blade is Laravel's own templating engine that makes creating dynamic views easy. It lets you mix regular PHP code with its own features for more flexibility, has a clean syntax and caches your views for faster performance.

Leaf Blade is an adaptation of the original Blade package that allows you to use Blade templates in your Leaf PHP projects powered by [jenssegers/blade](https://github.com/jenssegers/blade).

<!-- Leaf Blade is an adaptation of the original Blade package, which provides a powerful engine that is familiar to most PHP developers. While similar, Leaf Blade has some differences from the original Blade package, so be sure to keep this documentation handy. -->

::: details New to Blade?

This video by The Net Ninja will help you get started with blade.

<VideoModal
  title="New to Blade?"
  subject="Laravel Tutorial for Beginners #5 - Blade Basics"
  description="This video by The Net Ninja will help you get started with blade."
  videoUrl="https://www.youtube.com/embed/pQ2vxa4_f2w"
/>

:::

## Setting Up

Blade comes with Leaf MVC out of the box, fully configured and ready to use, however, if you're using Leaf on its own, you can install Blade using the Leaf CLI or Composer.

::: code-group

```bash:no-line-numbers [Leaf CLI]
leaf install blade
```

```bash:no-line-numbers [Composer]
composer require leafs/blade
```

:::

::: details Configuring your paths

After installing Blade in your Leaf app, you just need to inform Leaf of Blade's existence:

```php:no-line-numbers
app()->attachView(Leaf\Blade::class);
```

This will magically set up Blade for you and pop up a `blade()` function you can use to render your Blade views.

```php
app()->blade()->configure([
  'views' => 'views',
  'cache' => 'storage/cache'
]);
```

Once again, this is only necessary if you're using Leaf on its own. If you're using Leaf MVC, Blade is already set up for you.

:::

Magic! You can now use Blade to create and render your views.

## Creating Blade Views

Blade views are a pretty sweet mixture of HTML, PHP, and clean syntax. You can create a new Blade view by creating a new file with the `.blade.php` extension in your "views" folder. Here's an example of a simple Blade view:

::: code-group

```blade [hello.blade.php]
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <h1>Hello, {{ $name }}</h1>
</body>
</html>
```

:::

This should look pretty familiar if you know HTML (of course you do). The only difference is the <span v-pre>`{{ $name }}`</span> part. This is Blade's way of creating a variable in your view. When you render this view, Blade will allow you pass in a variable called `$name` and it will be displayed in place of <span v-pre>`{{ $name }}`</span>. Let's see how you can render this view.

<!-- <section id="leaf-zero" class="rounded-2xl shadow-md outline outline-gray-100 dark:outline-gray-800 p-4 md:p-10 bg-[var(--vp-c-bg-alt)]">
    <p
        class="mt-4 text-3xl sm:text-4xl text-slate-900 font-extrabold tracking-tight dark:text-slate-50"
    >
        Ship even faster with Leaf Zero.
    </p>
    <p class="mt-4 max-w-3xl space-y-6">
        Zero is a collection of free pre-built components, page sections, and templates powered by Blade, Tailwind and Alpine JS to help you build your UIs faster.
    </p>
    <Button as="a" href="/docs/frontend/zero/" class="!text-white bg-red-500 hover:bg-red-600">View Leaf Zero</Button>
    <div class="relative pt-10 xl:pt-0 mt-10">
        <div
            class="hidden dark:block absolute top-0 inset-x-0 h-[37.5rem] bg-gradient-to-b from-[#0c1120] xl:top-18"
        ></div>
        <div
            class="absolute inset-x-0 bg-top bg-no-repeat GridLockup_beams-0___8Vns top-0 xl:top-18"
        ></div>
        <div
            class="absolute inset-x-0 h-[37.5rem] bg-grid-slate-900/[0.04] bg-top [mask-image:linear-gradient(0deg,transparent,black)] dark:bg-grid-slate-100/[0.03] dark:bg-[center_top_-1px] dark:border-t dark:border-slate-100/5 top-0 xl:top-18"
        ></div>
        <div
            style="
                mask-image: linear-gradient(
                    to bottom,
                    white,
                    white,
                    transparent
                );
                -webkit-mask-image: linear-gradient(
                    to bottom,
                    white,
                    white,
                    transparent
                );
            "
            class="max-w-7xl mx-auto sm:px-6 md:px-8"
        >
            <div class="flex justify-center">
                <div class="w-[216%] ml-[28%] flex-none sm:w-[76rem] sm:ml-0">
                    <div
                        class="relative"
                        style="padding-top: 30.647155812036274%"
                    >
                        <img
                            alt=""
                            loading="lazy"
                            decoding="async"
                            src="https://github.com/user-attachments/assets/97489e45-dde4-4645-b074-2dfabff5d518"
                            class="absolute shadow-xl rounded-lg border border-gray-400/20 border-t-0"
                            style="
                                top: 0%;
                                left: 20%;
                                width: 46.7436%;
                                opacity: 1;
                                transform: none;
                            "
                        /><img
                            alt=""
                            loading="lazy"
                            decoding="async"
                            src="https://github.com/user-attachments/assets/b1397a2e-d1ab-4b35-b2a3-d055cc8918d0"
                            class="absolute shadow-xl rounded-lg border border-gray-400/20 !border-t-0"
                            style="
                                top: 0%;
                                left: 57.22589%;
                                width: 19.4559%;
                                opacity: 1;
                                transform: none;
                            "
                        /><img
                            alt=""
                            loading="lazy"
                            decoding="async"
                            src="https://github.com/user-attachments/assets/49e18a39-45fd-419d-8033-050528a4052e"
                            class="absolute shadow-xl rounded-lg border border-gray-400/20"
                            style="
                                top: 22.96296%;
                                left: 52.3825%;
                                width: 25.3916%;
                                opacity: 1;
                                transform: none;
                            "
                        /><img
                            alt=""
                            loading="lazy"
                            decoding="async"
                            src="https://github.com/user-attachments/assets/791fbd51-46b9-4227-8a4c-d1959b1ee984"
                            class="absolute shadow-xl rounded-lg border border-gray-400/20"
                            style="
                                top: 42.8148%;
                                left: 3%;
                                width: 38.9118%;
                                opacity: 1;
                                transform: none;
                            "
                        /><img
                            alt=""
                            loading="lazy"
                            decoding="async"
                            src="https://github.com/user-attachments/assets/1c893655-f66d-49e0-b5ed-2842bcf69b43"
                            class="absolute shadow-xl rounded-lg border border-gray-400/20"
                            style="
                                top: 42.8148%;
                                left: 40.8904%;
                                width: 36.3561%;
                                opacity: 1;
                                transform: none;
                            "
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</section> -->

## Rendering Blade Views

Remember we set up Blade earlier? Now we can use it to render our Blade views. Here's how you can render the `hello.blade.php` view we created earlier:

```php:no-line-numbers
response()->render('hello', ['name' => 'Michael']);
```

This will render the `hello.blade.php` view and pass in a variable called `name` with the value `Michael`. When you open the view in your browser, you should see a big "Hello, Michael" on your screen.

## Directives included in Leaf Blade

Although Leaf Blade is just an adaptation of the original Blade package, it comes pre-packaged with some original Blade directives remodelled to work with Leaf and a few custom directives to make your life easier. You can find all common Blade directives in the [Blade documentation](https://laravel.com/docs/11.x/blade#blade-directives).

Here are some of the directives you can use in your Blade views:

### CSRF protection

The `@csrf` directive generates a hidden CSRF token field for forms. This is useful when you want to include a CSRF token in your form.

```blade:no-line-numbers
<form method="POST">
  @csrf
  ...
</form>
```

### Working with JSON

You can use the `@json` directive to convert a PHP array to a JSON string. This is useful when you want to pass a JSON string to a JavaScript variable.

```blade:no-line-numbers
<script>
  var app = @json($array);
</script>
```

### Loading assets with vite

You can use the `@vite` directive to load assets like CSS and JS files in your Blade views using Vite.

```blade:no-line-numbers
@vite('app.js')
@vite(['app.js', 'app.css'])
```

### Adding Alpine.js

Alpine.js is a minimal framework for composing JavaScript behavior in your views. You can use the `@alpine` directive to add Alpine.js to your Blade views.

```blade:no-line-numbers
<head>
  ...

  @alpine
</head>
```

### Checking for null

You can use the `@isNull` directive to check if a variable is null.

```blade
@isNull($variable)
  <p>This will only show if $variable is null</p>
@else
  <p>This will show if $variable is not null</p>
@endisNull
```

### Conditional rendering with env

You can use the `@env` directive to conditionally render content based on the environment.

```blade
@env('local')
  <p>This will only show in the local environment</p>
@else
  <p>This will show in all other environments</p>
@endenv
```

### Working with sessions

The `@session` directive may be used to determine if a session value exists. If the session value exists, the template contents within the `@session` and `@endsession` directives will be evaluated. Within the `@session` directive's contents, you may echo the `$value` variable to display the session value:

```blade
@session('status')
  <div class="p-4 bg-green-100">
    {{ $value }}
  </div>
@endsession
```

### Working with flash messages

The `@flash` directive may be used to determine if a flash message exists. If the flash message exists, the template contents within the `@flash` and `@endflash` directives will be evaluated. Within the `@flash` directive's contents, you may echo the `$message` variable to display the flash message:

```blade
@flash('status')
  <div class="p-4 bg-green-100">
    {{ $message }}
  </div>
@endflash
```

### Conditional Classes & Styles

The `@class` directive conditionally compiles a CSS class string. The directive accepts an array of classes where the array key contains the class or classes you wish to add, while the value is a boolean expression. If the array element has a numeric key, it will always be included in the rendered class list:

```blade
@php
  $isActive = false;
  $hasError = true;
@endphp

<span @class([
  'p-4',
  'font-bold' => $isActive,
  'text-gray-500' => ! $isActive,
  'bg-red' => $hasError,
])></span>

OUTPUT: <span class="p-4 text-gray-500 bg-red"></span>
```

Likewise, the @style directive may be used to conditionally add inline CSS styles to an HTML element:

```blade
@php
  $isActive = true;
@endphp

<span @style([
  'background-color: red',
  'font-weight: bold' => $isActive,
])></span>

OUTPUT: <span style="background-color: red; font-weight: bold;"></span>
```

### Additional Attributes

For convenience, you may use the @checked directive to easily indicate if a given HTML checkbox input is "checked". This directive will echo checked if the provided condition evaluates to true:

```blade
<input
  type="checkbox"
  name="active"
  value="active"
  @checked($isActive)
/>
```

Likewise, the @selected directive may be used to indicate if a given select option should be "selected":

```blade
<select name="version">
  @foreach ($product->versions as $version)
    <option ... @selected($shouldBeSelected)>
      ...
    </option>
  @endforeach
</select>
```

Additionally, the @disabled directive may be used to indicate if a given element should be "disabled":

```blade:no-line-numbers
<button type="submit" @disabled($shouldBeDisabled)>Submit</button>
```

Moreover, the @readonly directive may be used to indicate if a given element should be "readonly":

```blade
<input
  type="email"
  name="email"
  value="email@laravel.com"
  @readonly($shouldBeReadonly)
/>
```

In addition, the @required directive may be used to indicate if a given element should be "required":

```blade
<input
  type="text"
  name="title"
  value="title"
  @required($shouldBeRequired)
/>
```

### Leaf Auth

The `@auth` and `@guest` directives may be used to quickly determine if the current user is authenticated or is a guest:

```blade
@auth
  // The user is authenticated...
@endauth

@guest
  // The user is not authenticated...
@endguest
```

### Roles & Permissions

You can use the `@is` directive to check if the current user has a specific role:

```blade
@is('admin')
  // The user has the admin role...
@else
  // The user does not have the admin role...
@endis
```

You can also use the `@can` directive to check if the current user has a specific permission:

```blade
@can('edit articles')
  // The user can edit articles...
@else
  // The user cannot edit articles...
@endcan
```

<!-- ### SEO Meta Tags

You can use the `@Meta` directive to add SEO meta tags to your Blade views.

```blade:no-line-numbers
@Meta([
  'title' => 'My Page',
  'description' => 'This is my page',
  'keywords' => 'page, my',
  'author' => 'Michael',
  'robots' => 'index, follow',
  'canonical' => 'https://example.com/page',
  'image' => 'https://example.com/image.jpg',
  'og' => [
    'title' => 'My Page',
    'description' => 'This is my page',
    'image' => 'https://example.com/image.jpg',
    'url' => 'https://example.com/page',
    'type' => 'website'
  ],
  'twitter' => [
    'title' => 'My Page',
    'description' => 'This is my page',
    'image' => 'https://example.com/image.jpg',
    'card' => 'summary_large_image'
  ]
])
``` -->

<!-- ### `@method`

The `@method` directive generates a hidden input field with the value of the method you specify. This is useful when you want to use methods other than `GET` and `POST` in your forms.

```blade:no-line-numbers
<form method="POST">
  @method('PUT')
  ...
</form>

<form method="POST">
  @method('DELETE')
  ...
</form>
````

### `@submit`

The `@submit` directive allows you to wrap an item with a form that submits when the item is clicked. This is useful when you want to redirect to a post route when an item is clicked.

````blade:no-line-numbers
@submit('DELETE', '/posts/1')
  <button>Delete</button>
@endsubmit
``` -->

## Extending Blade Views

Blade allows you to define custom directives using the `directive()` method. When the Blade compiler encounters the custom directive, it will call the provided callback with the expression that the directive contains. The callback is free to return the value of its contents however you like:

```php
app()->blade()->directive('datetime', function ($expression) {
    return "<?php echo tick({$expression})->format('DD MM YYYY'); ?>";
});
```

::: details Extending blade in Leaf MVC
If you use Leaf MVC, you will need to publish your view config to add custom directives. You can do this by running the following command:

```bash:no-line-numbers
php leaf config:publish view
```

After that, you can add your custom directives to the `config/view.php` file. Here's an example of how you can add a custom directive:

```php:no-line-numbers [config/view.php]
    ...

    /*
    |--------------------------------------------------------------------------
    | Extend view engine
    |--------------------------------------------------------------------------
    |
    | Some view engines like blade allow you extend the engine to
    | add extra functions or directives. This is just the place to
    | do all of that. Extend is a function that accepts an instance
    | of your view engine which you can 'extend'
    |
    */
    'extend' => function (\Leaf\Blade $engine) {
        $engine->directive('datetime', function ($expression) {
            return "<?php echo tick({$expression})->format('DD MM YYYY'); ?>";
        });
    },
```

:::

Which allows you to use the following in your blade template:

```blade:no-line-numbers
Current date: @datetime($date)
```

This will output the current date in the format `DD MM YYYY`. You can define as many custom directives as you want to make your Blade views more powerful.

## Conclusion

This is just the beginning of what you can do with Blade. Blade is a powerful templating engine that allows you to create dynamic views with ease. You can use Blade to create complex views with loops, conditions, and even include other views. As this is just an adapter for the original Blade package, you can check out the [Blade documentation](https://laravel.com/docs/8.x/blade) for more information on what you can do with Blade.
