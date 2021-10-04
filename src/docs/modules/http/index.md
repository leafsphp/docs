---
title: "Http Module"
---

# Http Module

::: warning
There is no need to manually add the Http module if you're using Leaf 3 since this is done for you automatically.
:::

The Leaf Http module contains a bunch of handlers for managing the kinds and methods through which data flows in and out of your application.

The available classes in the Http module are:

- [`Leaf\Http\Request`](/docs/modules/http/request)
- [`Leaf\Http\Response`](/docs/modules/http/response)
- [`Leaf\Http\Headers`](/docs/modules/http/headers)

## Installation

You can install the http module with composer:

```sh
composer require leafs/http
```

From there you can use any of the classes above in your project.

::: info
Cookies and session are independent modules which are not added to the Http module. This is because, the use of session and cookies is relatively low in APIs. If you however want to use sessions and cookies, you can read their guides for information on them.
:::

## Request

This is a developer friendly interface which allows you to interact with data coming into your application. [Read the docs](/docs/modules/http/request)

## Response

This interface allows you to output data from your application in different forms. [Read the docs](/docs/modules/http/response)

## Headers

This interface allows you to manage headers in your application. [Read the docs](/docs/modules/http/headers)

## Session (module)

This module allows you to manage session in your application. [Read the docs](/docs/modules/session/)

## Cookies (module)

This module allows you to manage cookies in your application. [Read the docs](/docs/modules/cookies)
