<!-- markdownlint-disable no-inline-html -->
<!-- # Filesystem / Cloud Storage -->

# File Storage System

A file storage system is a system used to store and manage files. It's a crucial part of most applications, as it helps you create, read, update, store and delete files effectively. Leaf provides a simple and easy-to-use file storage system that allows you to work with files on your server or in the cloud.

::: warning Docs version
This documentation covers FS v2 and above. If you're using an older version, you can check the documentation [hosted here](https://v3.leafphp.dev/modules/fs/).
:::

## Installation

You can quickly install Leaf's file storage system through composer or the leaf cli.

::: code-group

```bash:no-line-numbers [Leaf CLI]
leaf install fs
```

```bash:no-line-numbers [Composer]
composer require leafs/fs
```

:::

That's it! You can now use the `storage()`/`path()` functions from anywhere in your app to interact with your files.

## Working with file paths

File paths are the locations of files on your server. They help you locate and interact with files effectively. While they are essential for working with files, they can be a bit tricky to work with. Leaf provides a simple way to work with file paths using the `path()` function.

### Getting information out of a path

Given a path, you can extract information out of it using those methods:

- `dirname()`: gets the parent folder of a file
- `basename()`: gets the filename part
- `extname()`: gets the file extension

```php
$path = path('path/to/file.txt');

$path->dirname(); // path/to
$path->basename(); // file.txt
$path->extname(); // txt
```

### Joining paths

You can join paths together using the `join()` method.

```php
$path = path('path')->join('to', 'file.txt');

echo $path; // path/to/file.txt
```

### Normalizing paths

When working with paths, we usually tend to do things like `path/to/parent/..//file.txt` or `path\to\file.txt`. Leaf provides a way to "fix" these paths using the `normalize()` method.

```php
$path = path('path/to/parent/..//file.txt')->normalize();

echo $path; // path/to/file.txt
```

## Working with Files

Working with files is a crucial part of most applications. Leaf provides a simple and easy-to-use file system that allows you to create, read, update, and delete files effectively using the `storage()` function.

### Creating Files

You can create files using the `createFile()` method. It takes in 3 arguments:

- the file path
- the content to set or a function that returns the file content (optional)
- an array of configuration options (optional)
  - `overwrite`: whether to overwrite the file if it already exists
  - `rename`: whether to rename the file if it already exists

If you don't provide the file content, Leaf will create an empty file for you.

```php
storage()->createFile('path/to/file.txt');

storage()->createFile('path/to/file.txt', function () {
  return 'Hello, world!';
});

storage()->createFile('path/to/file.txt', 'Hello, world!', [
  'overwrite' => true
]);
```

The `createFile()` method returns a boolean indicating whether the file was created successfully. If the file was not created successfully, you can get the errors using the `errors()` method.

```php
$created = storage()->createFile('path/to/file.txt');

if ($created) {
  echo 'File created successfully';
} else {
  $errors = storage()->errors();
}
```

### Reading Files

Reading files means getting the content of a file. You can read files using the `readFile()` method. It takes in the file path and returns the file content.

```php
$content = storage()->readFile('path/to/file.txt');

echo $content;
```

### Updating Files

You can update files using the `writeFile()` method. It takes in the file path and the content to set or a function that returns the file content.

```php
storage()->writeFile('path/to/file.txt', 'Hello, world!');

storage()->writeFile('path/to/file.txt', function () {
  return 'Hello, world!';
});
```

If the file is a readable file, the `writeFile()` method will provide the current content of the file to the function.

```php
storage()->writeFile('path/to/file.txt', function ($content) {
  return $content . ' Hello, world!';
});
```

### Getting File Information

You can get information like the file size, file type, and last modified time of a file using the `fileInfo()` method.

```php
$info = storage()->fileInfo('path/to/file.txt');
```

Or by using more specific methods:

```php
$size = storage()->fileSize('path/to/file.txt'); // in bytes
$type = storage()->fileType('path/to/file.txt'); // file type
$lastModified = storage()->fileLastModified('path/to/file.txt'); // last modified time
$extension = storage()->extname('path/to/file.txt'); // txt
$basename = storage()->basename('path/to/file.txt'); // file.txt
$dirname = storage()->dirname('path/to/file.txt'); // path/to
```

## File Uploads

File uploads are a common feature in most applications. Users can upload files like images, videos, and documents to your server. Leaf provides a simple way to handle file uploads using the `upload()` method.

```php
$uploaded = storage()->upload('fileToUpload', 'path/to/uploads');

if ($uploaded) {
  echo 'File uploaded successfully';
} else {
  $errors = storage()->errors();
}
```

The `upload()` method automatically grabs the file from the request, so you don't have to worry about all of that.

One amazing thing about the `upload()` method is that it can detect the file type and automatically handle any associated configuration. If you need to customize the upload configuration, you can pass an array of configuration options as the third parameter.

```php
$uploaded = storage()->upload('fileToUpload', 'path/to/uploads', [
  'maxSize' => 1024 * 1024, // 1MB
  'allowedTypes' => ['image'],
  'allowedExtensions' => ['jpg', 'png', 'gif'],
  'validate' => true,
  'mode' => 0777,
  'rename' => false,
  'recursive' => false,
  'overwrite' => false,
]);
```

This is a list of config options for the `upload()` method:

| Config Name  | Description                                                  |                                                                       Possible Values |
| :----------- | :----------------------------------------------------------- | ------------------------------------------------------------------------------------: |
| mode        | Permissions to create your destination folder if it doesn't exist   | Any permissions accepted by mkdir() |
| overwrite    | If `true`, Leaf will overwrite the file if it already exists |                                                                       `true`, `false` |
| rename       | If `true`, Leaf will rename the file if it already exists    |                                                                       `true`, `false` |
| validate     | If `true`, Leaf will validate the file before uploading      |                                                                       `true`, `false` |
| maxSize      | The maximum file size allowed in bytes                       |                                                                                 `int` |
| allowedTypes | The allowed file types                                       | `image`, `video`, `audio`, `presentation`, `compressed`, `spreadsheet`, `application`, `custom` |

This is a list of values Leaf uses to check for file types:

| File Type         | Common Extensions                                    |
| :--------------  | :----------------------------------------------  |
|  image            | 'jpg', 'jpeg', 'png', 'gif', 'webp', 'apng', 'tif', 'tiff', 'svg', 'pjpeg', 'pjp', 'jfif', 'cur', 'ico' |
|  video             | 'mp4', 'webm', 'swf', 'flv'                              |
|  audio             |'wav', 'mp3', 'ogg', 'm4a'                              |
|  text                |'txt', 'log', 'xml', 'doc', 'docx', 'odt', 'wpd', 'rtf', 'tex', 'pdf' |
|  presentation |'ppsx', 'pptx', 'ppt', 'pps', 'ppsm', 'key', 'odp' |
|  compressed  |'zip', 'rar', 'bz', 'gz', 'iso', 'tar.gz', 'tgz', 'zipx', '7z', 'dmg'|
|  spreadsheet  |'ods', 'xls', 'xlsx', 'xlsm'                                  |
|  application    |'apk', 'bat', 'cgi', 'pl', 'com', 'exe', 'gadget', 'jar', 'msi', 'py', 'wsf' |

## Working with Folders

Working with folders is an essential part of most applications. Leaf provides a simple and easy-to-use file system that allows you to create, read, update, and delete folders effectively using the `storage()` function.

### Creating Folders

You can create folders using the `createFolder()` method. It takes in 2 parameters:

- the folder path
- an array of configuration options.
  - `recursive`: whether to create the folder recursively
  - `rename`: whether to rename the folder if a folder with the same name already exists

```php
storage()->createFolder('path/to/folder');

storage()->createFolder('path/to/folder', [
  'recursive' => true
]);
```

It returns a boolean indicating whether the folder was created successfully.

```php
$created = storage()->createFolder('path/to/folder', [
  'rename' => true
]);

if ($created) {
  echo 'Folder created successfully';
} else {
  $errors = storage()->errors();
}
```

### Checking Folder Contents

You can check if a folder is empty using the `isEmpty()` method. It takes in the folder path and returns a boolean indicating whether the folder is empty.

```php
$isEmpty = storage()->isEmpty('path/to/folder');
```

You can also get the contents of a folder using the `listDir()` method. It takes in the folder path and a key to sort the contents by. It returns an array of the folder contents.

```php
$contents = storage()->listDir('path/to/folder');
$phpFiles = storage()->listDir('path/to/folder', '*.php');
```

If you need to do more complex filtering, you can pass a function as the second parameter to the `listDir()` method.

```php
$contents = storage()->listDir('path/to/folder', function ($file) {
  // if true, the file will be included in the results
  return $file->isFile() && $file->extname() === 'php';
});
```

<!-- ## Working with Cloud Storage -->

## Renaming Files and Folders

There are instances where you might need to rename files or folders. Leaf provides a simple way to rename files and folders using the `rename()` method. It takes in 2 parameters:

- the current file/folder path
- the new file/folder path

```php
storage()->rename('path/to/file.txt', 'path/to/new-file.txt');

storage()->rename('path/to/folder', 'path/to/new-folder');
```

It returns a boolean indicating whether the file/folder was renamed successfully.

```php
$renamed = storage()->rename('path/to/file.txt', 'path/to/new-file.txt');

if ($renamed) {
  echo 'File renamed successfully';
} else {
  $errors = storage()->errors();
}
```

## Deleting Files and Folders

When you no longer need a file or folder, you can delete it using the `delete()` method. It takes in the file/folder path and returns a boolean indicating whether the file/folder was deleted successfully.

```php
$deleted = storage()->delete('path/to/file.txt');

if ($deleted) {
  echo 'File deleted successfully';
} else {
  $errors = storage()->errors();
}
```

## Copying Files and Folders

When you need to duplicate a file or folder, you can copy it using the `copy()` method. It takes in 2 parameters:

- the current file/folder path
- the new file/folder path

```php
storage()->copy('path/to/file.txt', 'path/to/new-file.txt');

storage()->copy('path/to/folder', 'path/to/new-folder');
```

It returns a boolean indicating whether the file/folder was copied successfully.

```php
$copied = storage()->copy('path/to/file.txt', 'path/to/new-file.txt');

if ($copied) {
  echo 'File copied successfully';
} else {
  $errors = storage()->errors();
}
```

## Moving Files and Folders

This is similar to copying files and folders, but instead of duplicating the file/folder, it moves it to a new location. You can move files and folders using the `move()` method. It takes in 2 parameters:

- the current file/folder path
- the new file/folder path

```php
storage()->move('path/to/file.txt', 'path/to/new-file.txt');

storage()->move('path/to/folder', 'path/to/new-folder');
```

It returns a boolean indicating whether the file/folder was moved successfully.

```php
$moved = storage()->move('path/to/file.txt', 'path/to/new-file.txt');

if ($moved) {
  echo 'File moved successfully';
} else {
  $errors = storage()->errors();
}
```

<!-- ## Working with Streams

Streaming is a way to read and write data from a source or to a destination. Leaf provides a simple way to work with streams using the `stream()` function.

```php
$stream = storage()->stream('path/to/file.txt');

$stream->write('Hello, world!');
$stream->read();
``` -->
