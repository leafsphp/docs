# Views

<p class="alert -warning">
  All console commands now rely on Aloe CLI, therefore, support for views would also be determined by Aloe.
</p>

Views contain the HTML served by your application and separate your controller / application logic from your presentation logic. Views are stored in the `App/Views` directory. A simple view might look something like this:

```html
hello.blade.php

<html>
    <body>
        <h1>Hello, {{ $name }}</h1>
    </body>
</html>
```

In v2 of leaf MVC, has removed default generation of templates, however, you can still create your own templates or use aloe cli as you see fit.

Since this view is stored in our `App/Views` directory, we may render it using the global `View` or `render` helper like so:

```php
Route('GET', '/', function () {
    echo view('hello', ['name' => 'Mike']);
});

Route('GET', '/', function () {
    markup(view('hello', ['name' => 'Mike']));
});

Route('GET', '/dashboard', function () {
    render('hello', ['name' => 'Mike']);
});
```

As you can see, the first argument passed to the view helper corresponds to the name of the view file in the `App/Views` directory. The second argument is an array of data that should be made available to the view. In this case, we are passing the name variable, which is displayed in the view using [Leaf Blade](2.1/views/blade).

Views may also be nested within subdirectories of the resources/views directory. "Dot" notation may be used to reference nested views. For example, if your view is stored at `App/Views/admin/profile.blade.php`, you may reference it like so:

```php
render('admin.profile', $data);
render('admin/profile', $data);
```

> View directory names should not contain the `.` character.

## Next Steps

- [Leaf Blade](/leaf/v/2.4.3/views/blade)
- [leaf MVC Helpers](/leaf-mvc/v/2.0/utils/functions)

Built with ❤ by [**Mychi Darko**](//mychi.netlify.app)
