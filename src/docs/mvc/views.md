# Views

<!-- markdownlint-disable no-inline-html -->

Views make up the 'V' in MVC. Views allow you to separate your logic from your presentation layer instead of mixing them together in a single file. This allows you to easily change the look and feel of your application without having to change any of your logic.

## View Engines

Leaf comes with support for 3 view engines designed by the team at Leaf:

| Engine                           | Use case                                     |
| -------------------------------- | -------------------------------------------- |
| [bareui](/modules/views/bareui/) | Blazing fast templating with no compile time |
| [veins](/modules/views/veins/)   | Lightweight but powerful templating engine   |
| [blade](/modules/views/blade/)   | Laravel blade templating engine for leaf     |

Leaf MVC and Leaf API come with Blade already installed and configured, but Skeleton comes with BareUI instead. Of course, you can use any templating engine you prefer with Leaf, but these templating engines are specifically created for Leaf but can be used outside Leaf apps as well.

***You can find more information on the [Views Docs Page](/modules/views/)***

## Defining Views

Views are defined in the `app/views` directory if you're using Leaf API/Leaf MVC or `pages` if you're using Skeleton. You can create subdirectories to organize your views.

- ### Leaf MVC and Leaf API

  Leaf MVC and Leaf API come with a console tool that allows you to quickly create views. You can use the `php leaf g:template` command to create a view. This command will create a view file in the `app/views` directory.

  ```bash
  php leaf g:template home
  ```

  This will create a file called `home.blade.php` in the `app/views` directory.

- ### Skeleton

  Skeleton comes with a `pages` directory that contains all of your views. To create a new view, simply create a new file in the `pages` directory. For example, if you wanted to create a view called `home`, you would create a file called `home.view.php` in the `pages` directory.

## Rendering Views

Leaf ships a `view` method as an extension of functional mode. This method allows you to render a view/template found in the views directory. This method accepts two parameters:

- The name of the view to render
- Data to pass to the view

```php
echo view('home', ['name' => 'John Doe']);
```

Notice that we pass the name of the view without the file extension. This is because Leaf will automatically append the correct file extension based on the view engine you're using.

## Next Steps

You can continue learning about MVC with Leaf from the sidebar or check out the view engines below:

<div class="vt-box-container next-steps">
  <a class="vt-box" href="/docs/mvc/controllers">
    <h3 class="next-steps-link">Controllers</h3>
    <small class="next-steps-caption">Learn how to use controllers in your Leaf applications.</small>
  </a>
  <a class="vt-box" href="/modules/views/blade/">
    <h3 class="next-steps-link">Blade Documentation</h3>
    <small class="next-steps-caption">Check out Leaf's port of Laravel's blade engine</small>
  </a>
  <a class="vt-box" href="/modules/views/bareui/">
    <h3 class="next-steps-link">BareUI Documentation</h3>
    <small class="next-steps-caption">Learn about Leaf's BareUI Engine.</small>
  </a>
</div>
