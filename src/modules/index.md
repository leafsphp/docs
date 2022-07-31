# Introduction
<!-- <Badge text="New" /> -->

Modules are a new feature added in Leaf 3 which basically takes parts of Leaf and separates them into installable chunks which can be used both inside and outside of Leaf.

Modules are framework/library agnostic, which means that they'll work just about everywhere with zero config just as with Leaf itself.

Modules can be quickly installed through composer or the leaf CLI with a single command.

## Why modules?

The biggest question people ask with Leaf 3 is why we decided to switch to modules, stripping leaf of almost all it's code.

[@mychidarko](https://github.com/mychidarko) put an article together on why we decided to switch to modules instead of maintaining the whole code together. We also have a [GitHub discussion](https://github.com/leafsphp/leaf/discussions/70) introducing leaf 3 and everything you need to know about it, we explain modules further here.

## Installing modules

<!-- ::: tip Video Docs
You can take a look at our leaf cli video on youtube.

<VideoLesson href="https://www.youtube.com/watch?v=K9jSl_xpr48" title="Working with packages on the Leaf CLI">Working with modules and the leaf cli</VideoLesson>
::: -->

Modules are always published on composer and can be installed through composer CLI or the leaf CLI.

**Composer:**

```sh
composer require leafs/<module-name>
```

**Leaf CLI:**

```sh
leaf install <module-name>
```

## List of available modules

*This list is still being updated, you can keep checking for updates.*

| Project                | Status                                                                                                                                                                                                                                                         | Description                                                       |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| [router](/docs/routing/) | [![Latest Stable Version](https://poser.pugx.org/leafs/router/v/stable)](https://packagist.org/packages/leafs/router) [![Total Downloads](https://poser.pugx.org/leafs/router/downloads)](https://packagist.org/packages/leafs/router) | Router module for leaf PHP                                |
| [anchor](/modules/anchor/)               | [![Latest Stable Version](https://poser.pugx.org/leafs/anchor/v/stable)](https://packagist.org/packages/leafs/anchor) [![Total Downloads](https://poser.pugx.org/leafs/anchor/downloads)](https://packagist.org/packages/leafs/anchor)                         | Basic security tools                                              |
| [csrf](/modules/anchor/csrf/) | [![Latest Stable Version](https://poser.pugx.org/leafs/csrf/v/stable)](https://packagist.org/packages/leafs/csrf) [![Total Downloads](https://poser.pugx.org/leafs/csrf/downloads)](https://packagist.org/packages/leafs/csrf) | CSRF plugin for leaf anchor                                |
| [experiments](/modules/experiments/) | [![Latest Stable Version](https://poser.pugx.org/leafs/experimental/v/stable)](https://packagist.org/packages/leafs/experimental) [![Total Downloads](https://poser.pugx.org/leafs/experimental/downloads)](https://packagist.org/packages/leafs/experimental) | collection of experimental modules                                |
| [mail](/modules/mail/)                 | [![Latest Stable Version](https://poser.pugx.org/leafs/mail/v/stable)](https://packagist.org/packages/leafs/mail) [![Total Downloads](https://poser.pugx.org/leafs/mail/downloads)](https://packagist.org/packages/leafs/mail)                                 | Mailing made easy with leaf                                       |
| [auth](/modules/auth/)                 | [![Latest Stable Version](https://poser.pugx.org/leafs/auth/v/stable)](https://packagist.org/packages/leafs/auth) [![Total Downloads](https://poser.pugx.org/leafs/auth/downloads)](https://packagist.org/packages/leafs/auth)                                 | Simple but powerful authentication system for your apps           |
| [form](/modules/forms/)                 | [![Latest Stable Version](https://poser.pugx.org/leafs/form/v/stable)](https://packagist.org/packages/leafs/form) [![Total Downloads](https://poser.pugx.org/leafs/form/downloads)](https://packagist.org/packages/leafs/form)                                 | Form processes and validation                                     |
| [password](/modules/password/)             | [![Latest Stable Version](https://poser.pugx.org/leafs/password/v/stable)](https://packagist.org/packages/leafs/password) [![Total Downloads](https://poser.pugx.org/leafs/password/downloads)](https://packagist.org/packages/leafs/password)                 | Password encryption/validation/hashing in one box                 |
| [db-old](/modules/db-old/)               | [![Latest Stable Version](https://poser.pugx.org/leafs/db-old/v/stable)](https://packagist.org/packages/leafs/db-old) [![Total Downloads](https://poser.pugx.org/leafs/db-old/downloads)](https://packagist.org/packages/leafs/db-old)                         | Leaf Db from v1 (still maintained)                                |
| [db](/modules/db/)                   | [![Latest Stable Version](https://poser.pugx.org/leafs/db/v/stable)](https://packagist.org/packages/leafs/db) [![Total Downloads](https://poser.pugx.org/leafs/db/downloads)](https://packagist.org/packages/leafs/db)                                         | Leaf Db from v2 (actively maintained)                             |
| [session](/modules/session/)              | [![Latest Stable Version](https://poser.pugx.org/leafs/session/v/stable)](https://packagist.org/packages/leafs/session) [![Total Downloads](https://poser.pugx.org/leafs/session/downloads)](https://packagist.org/packages/leafs/session)                     | PHP sessions made simple                                          |
| [cookie](/modules/cookies/)               | [![Latest Stable Version](https://poser.pugx.org/leafs/cookie/v/stable)](https://packagist.org/packages/leafs/cookie) [![Total Downloads](https://poser.pugx.org/leafs/cookie/downloads)](https://packagist.org/packages/leafs/cookie)                         | Cookie management without the tears                               |
| [fs](/modules/fs/)                   | [![Latest Stable Version](https://poser.pugx.org/leafs/fs/v/stable)](https://packagist.org/packages/leafs/fs) [![Total Downloads](https://poser.pugx.org/leafs/fs/downloads)](https://packagist.org/packages/leafs/fs)                                         | Awesome filesystem operations + file uploads                      |
| [date](/modules/date/)                 | [![Latest Stable Version](https://poser.pugx.org/leafs/date/v/stable)](https://packagist.org/packages/leafs/date) [![Total Downloads](https://poser.pugx.org/leafs/date/downloads)](https://packagist.org/packages/leafs/date)                                 | PHP dates for humans                                              |
| [bareui](/modules/views/bareui/)               | [![Latest Stable Version](https://poser.pugx.org/leafs/bareui/v/stable)](https://packagist.org/packages/leafs/bareui) [![Total Downloads](https://poser.pugx.org/leafs/bareui/downloads)](https://packagist.org/packages/leafs/bareui)                         | Dead simple templating engine with no compilation (blazing speed) |
| [blade](/modules/views/blade/)                | [![Latest Stable Version](https://poser.pugx.org/leafs/blade/v/stable)](https://packagist.org/packages/leafs/blade) [![Total Downloads](https://poser.pugx.org/leafs/blade/downloads)](https://packagist.org/packages/leafs/blade)                             | Laravel blade templating port for leaf                            |
| [veins](/modules/views/veins/)                | [![Latest Stable Version](https://poser.pugx.org/leafs/veins/v/stable)](https://packagist.org/packages/leafs/veins) [![Total Downloads](https://poser.pugx.org/leafs/veins/downloads)](https://packagist.org/packages/leafs/veins)                             | Leaf veins templating engine                                      |
| [http](/modules/http/)                 | [![Latest Stable Version](https://poser.pugx.org/leafs/http/v/stable)](https://packagist.org/packages/leafs/http) [![Total Downloads](https://poser.pugx.org/leafs/http/downloads)](https://packagist.org/packages/leafs/http)                                 | Http operations made simple (request, response, ...)              |
| [mvc-core](/modules/mvc-core/)             | [![Latest Stable Version](https://poser.pugx.org/leafs/mvc-core/v/stable)](https://packagist.org/packages/leafs/mvc-core) [![Total Downloads](https://poser.pugx.org/leafs/mvc-core/downloads)](https://packagist.org/packages/leafs/mvc-core)                 | Core MVC tools powering our MVC wrappers                          |
| [aloe](https://leafphp.dev)                 | [![Latest Stable Version](https://poser.pugx.org/leafs/aloe/v/stable)](https://packagist.org/packages/leafs/aloe) [![Total Downloads](https://poser.pugx.org/leafs/aloe/downloads)](https://packagist.org/packages/leafs/aloe)                                 | Overpowered cli for our MVC wrappers                              |
| [fetch](/modules/fetch/)                | [![Latest Stable Version](https://poser.pugx.org/leafs/fetch/v/stable)](https://packagist.org/packages/leafs/fetch) [![Total Downloads](https://poser.pugx.org/leafs/fetch/downloads)](https://packagist.org/packages/leafs/fetch)                             | HTTP requests made simple                                         |
| [logger](/modules/logger/)                | [![Latest Stable Version](https://poser.pugx.org/leafs/logger/v/stable)](https://packagist.org/packages/leafs/logger) [![Total Downloads](https://poser.pugx.org/leafs/logger/downloads)](https://packagist.org/packages/leafs/logger)                             | HTTP requests made simple                                         |
| [redis](/modules/redis/)                | [![Latest Stable Version](https://poser.pugx.org/leafs/redis/v/stable)](https://packagist.org/packages/leafs/redis) [![Total Downloads](https://poser.pugx.org/leafs/redis/downloads)](https://packagist.org/packages/leafs/redis)                             | Redis module                                                      |
