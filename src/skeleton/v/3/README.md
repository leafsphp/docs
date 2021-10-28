# Skeleton v2.0

Skeleton v2.0 packs a bunch of more functionality and customizations into the already existing structure. Skeleton's default structure has also been updated for easier location and use for newer users. Of course, you can always customize this yourself.

## Getting Started

### Things to note

Skeleton v2.0 runs on [Leaf v2.5.0](leaf/v/2.5.0/) which was released on 27th April, 2021. v2.5.0 comes with a lot of changes and customizable features. Being able to customize Leaf's base behaviour adds a whole lot more customizations to the skeleton you're already used to. Also, **since skeleton runs on Leaf, you'll have to get familiar with Leaf first**.

### Directory Structure

```sh
.
├── Config
│   ├── aloe.php
│   ├── app.php
│   ├── auth.php
│   ├── bootstrap.php
│   ├── functions.php
│   ├── paths.php
│   └── view.php
├── Controllers
│   ├── Controller.php
│   └── TestsController.php
├── Models
│   ├── Model.php
│   └── Test.php
├── pages
│   ├── body.view.php
│   ├── index.html
│   ├── styles.css
│   └── test.view.php
├── routes
│   ├── _app.php
│   └── index.php
├── storage
│   ├── app
│   │   └── public
│   ├── framework
│   │   └── views
│   └── logs
└── vendor
├── composer.json
├── composer.lock
├── index.php
├── README2.MD
├── README.MD
```

As opposed to the earlier builds, skeleton v2 has a straightforward directory structure which can also be customized anytime you feel the need to.

### Installation

You can get skeleton up and running simply with composer.

```sh
composer create-project leafs/skeleton
```

This will create the directory structure above with the needed files.

## Next Steps

- [Read Leaf's Docs](leaf/v/2.5.0/)
- [Config](skeleton/v/2.0/config/)
