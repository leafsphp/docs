# Hello there 👋

Leaf is a slim and lightweight PHP framework focused on developer experience, usability, and high-performance code. It is a modern PHP framework built to be simple and elegant, yet extremely powerful.

```php
<?php

require __DIR__ . '/vendor/autoload.php';

app()->get('/', function () {
  response()->json(['message' => 'Hello World!']);
});

app()->run();
```

Writing code should be simple and fun, and that's what Leaf is all about.

Leaf is built to be modular, so you can use only what you need. There's no need to learn a whole new framework to use Leaf, just familiarize yourself with the core concepts and you're good to go. This makes Leaf a great choice for both beginners and experienced developers.

Ready to get started? Check out the [installation guide](/docs/installation) to get Leaf up and running in no time. You can also check out the [interactive tutorial](/tutorial) to learn more about Leaf's core concepts and features.

## Getting Started

- Why Leaf
- Installation
- Using Docker
- Leaf CLI
- Migrating from other frameworks
- Build your first app

## The Basics

- Routing
- Middleware
- Request
- Response
- CORS
- Headers

## Config & Deployment

- Configuring Leaf
- Environment Variables
- Dependency Injection
- Error Handling
- Debugging
- Url rewriting
- Deployment
- Logging

## Data Handling

- Authentication
- Sessions
- Cookies
- Database
- Validation
- Encryption

## Digging Deeper

- Frontend
- Http Cache
- Testing
- Vulnerability Protection (Leaf Anchor)
- Queues
- File System operations
- Swoole
- Redis
- Mailing
- Dates & Times
- Data fetching

## MVC

- Leaf MVC
- Controllers
- Models
- Views
- Leaf MVC config
- Routing in MVC
- Migrations
- Schema
- Seeders
- Factories
- Writing Commands
- Mailing
- MVC Helpers
- Custom Libraries
- MVC Console Tool

<!-- - Rate Limiting -->
<!-- - Websockets -->
<!-- - Events -->
<!-- - Caching -->
<!-- - Testing -->
<!-- - Localization -->
<!-- - File Storage -->
<!-- - Cron Jobs -->
<!-- - Webhooks -->
<!-- - API Versioning -->
<!-- - Pagination -->
<!-- - Search -->
