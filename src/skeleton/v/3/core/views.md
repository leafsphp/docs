# Views

Unlike the other Leaf setups, Skeleton runs on [Bare UI](/leaf/v/2.5.0/views/bareui) which is a new simple templating language added in recent versions of Leaf.

Skeleton views are kept in the pages directory. You can create your own bare ui by simply naming your file with `.view.php`. Skeleton also comes with shortcut methods to quickly reference your views.

```php
Route('GET', '/', function () {
    echo View('hello', ['name' => 'Mike']);
});

Route('GET', '/', function () {
    markup(View('hello', ['name' => 'Mike']));
});

Route('GET', '/dashboard', function () {
    render('hello', ['name' => 'Mike']);
});
```

As you can see, the first argument passed to the view helper corresponds to the name of the view file in the `App/Views` directory. The second argument is an array of data that should be made available to the view. In this case, we are passing the name variable, which is displayed in the view using [Leaf Blade](leaf/v/2.5.0/views/blade).

Views may also be nested within subdirectories of the resources/views directory. "Dot" notation may be used to reference nested views. For example, if your view is stored at `pages/admin/profile.view.php`, you may reference it like so:

```php
render('admin/profile', $data);
```

An example bare UI will look like this:

```php
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome</title>
    <link rel="stylesheet" href="<?php echo views_path('styles.css'); ?>">
</head>

<body>
    <h1><?php echo $title; ?></h1>
    <?php
        // You can use another render in here to include bare UI partials
        render("body", [
            "communityTitle" => "Leaf Framework Community"
        ]);
    ?>
</body>

</html>
```

As seen above, you can also nest bare UIs. Read the bare ui docs for more information.

## Next Steps

- [Bare UI docs](/leaf/v/2.5.0/views/bareui)
- [Skeleton Helpers](/leaf-api/v/2.0/utils/functions)

Built with ❤ by [**Mychi Darko**](//mychi.netlify.app)
