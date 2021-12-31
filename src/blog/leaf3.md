---
sidebar: none
aside: none
blog: 'post'
---

[< Back](https://blog.leafphp.dev)

# Introducing Leaf 3 🎉

<p style="margin-top:0 !important;color:#3eaf7c;">
  We've been planning a new release: version 3 of leaf which has been under development for the past couple of months. This post contains everything you need to know about Leaf 3 ⚡️
</p>

November 21, 2021 | @mychidarko

![leaf rebrand](/images/blog/leaf3-twitter-rebrand.jpg)

It's been a while since the release of Leaf v2 last year. v2 brought in a whole lot of improvement to the Leaf franchise and opened up doors for further development and the reform of Leaf API and Leaf MVC. Leaf 2 has without a doubt been very successful and we'll like to thank everyone who has checked Leaf out or built anything with it 🙏🏽

## Why another major version?

Since Leaf 2 is doing really well, with v2.6 released a few months ago, why would we want to move on to a new major version? There are a bunch of reasons for this which I'll go over below.

### Leaf's vision

![image](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/30ziyic4ih5nbbhn3fo3.png)

This discussion above states some of Leaf 2's features and how easy it is to use them in your app. Leaf 2 provides a ton of features and unparalleled simplicity to match that, however...

![image](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/5gec8169g2w430j75alo.png)

Leaf 2 bloated without even realising it. Although Leaf 2 is still one of the most lightweight frameworks out there, it has a lot going on, and has features people don't use in everyday development so we decided to strip off those features and return Leaf to a clean simple state where other features will be served as installable plugins.

### A fresh start

Considering all the goodies that would come out of this new version with the introduction of modules, source code less than 40kb, blazing speed, component rewrites and so much more, we decided to use this opportunity to refresh Leaf's identity and we did this thoroughly 🚀

Leaf comes in with a new logo which looks simpler (going back to our vision) and a dark theme showing usability. Leaf 3 takes usability and simplicity to a whole new level without sacrificing any of the powerful goodies you need 😇

![Leaf 3](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/7yk5qmih3i1rykrvd5db.jpg)

## What's the fuss about leaf 3?

### ⚡️ Leaf 3: the "progressive" framework

Leaf has always allowed other frameworks/libraries to be integrated with your leaf apps, but leaf 3 now allows the opposite. You can now gradually re-write a full app written in another framework with Leaf, piece by piece, module by module as opposed to leaf 2 which needed full re-writes.

### 🧩 Custom Toolset for your app

Leaf 3 solves the problem of general frameworks vs specialized frameworks. General frameworks including leaf 2 have a ton of features that in most cases are not made full use of. In some cases, these frameworks are modified on a core level which makes it difficult/impossible to receive updates. Leaf 3 solves this problem perfectly by giving you the chance to choose only what you need in your applications, also each piece of functionality is isolated and can be upgraded independently without affecting your app as a whole.

### 🛠 Zero Config

This means that after installing, you can build your app without having to configure anything. All config is specific to your app, eg: linking your database, setting a directory to save logs... This also applies to hosting leaf apps as well. If your leaf app works on localhost, it 100% works in production no matter what framework/libraries you're using: leaf MVC, leaf API, or skeleton.

### 👨‍👩‍👧 Leaf 3: a familiar framework

Leaf 3 is versatile and provides familiar ways of doing things. It takes away the complexity in tasks and learns from the most popular libraries to get things done in the most efficient way possible. For instance, the `cors` module is based on the nodejs cors package which is popular and easy to use. Leaf 3 also packs in a ton of functionality with its wide gallery of modules.

### ✈️ Overpowered Efficiency

We see efficiency as the fastest and most performant way to get things done, and leaf 3 does this beautifully. Leaf 3 focuses on maintaining a smaller bundle with Leaf 3 core being under 40kb and a full API being under 2mb depending on the complexity of course, along with a ton of performance upgrades and finally, speeding up development time by up to 50%. With Leaf 3, how fast you go from development to production will depend on how fast you can type🤭

### 🎢 Shallow Learning Curve

Leaf 3 has a shallow learning curve. Unlike leaf 2 and other frameworks out there, you don't need to keep up the pressure of learning every feature or module. Modules can and are usually learnt on demand according to the requirements of your app. This makes leaf 3 very simple for beginners to grasp and even easier for professionals to work with.

### 🔥 Focus on Development Experience

Leaf 3 helps developers focus on only what matters, their apps. Leaf 3 provides global utility functions which help developers get rid of things like long and ugly namespaces, leaf module initializers and long function calls. Leaf 3 even allows you to skip initializing leaf itself 🤯. We call this functional mode.

## Notable additions

- Modules
- Functional Mode

## Modules?

Modules are pieces of leaf's functionality that can be separately installed, maintained, edited, ...  If you've read this far, you've probably seen the benefits of modules, however, there's more.

- Modules are serve-yourself installable features, which means you can install only the features you need in your app which will help you minimize the unused, but loaded code in your app which generally leads to a performance boost.
- With modules, you can receive updates for only a particular feature in your app without having to update the whole framework. This means that you can easily receive security fixes, new features or even install a particular version of a module you are used to.
- Modules are framework/library agnostic, which means you can incrementally add leaf and its features to your application till you are ready to make a complete switch.

If you have been following leaf since v1, you might have noticed that leaf has always had loosely coupled features which we have been calling modules/plugins since day 1😅
This is a path that we have been building since day one

## Functional mode?

Functional mode is basically a bunch of global functions which allows you to build cleanly and seamlessly without initializing any package or without any namespaces.

Leaf 3 comes with a few functions, however, Leaf 3 modules can extend Functional mode and add additional globals to your leaf app.

A simple Functional mode app will look something like this:

```php
<?php

require __DIR__ . "/vendor/autoload.php";

app()->get("/", function () {
  response()->json(...);
});

app()->run();
```

You can clearly see there are no namespaces or class initializers.

## Using leaf 3

We are glad to announce that the first preview of Leaf 3 has been released for public use. It is stable and you can expect it to work just fine. Note that the latest preview version is a snapshot of the `v3.x` branch. You can install this using composer.

```sh
composer require leafs/leaf v3.0-alpha
```

If you however want to keep up with the development of Leaf 3 and have the latest updates the moment they're pushed, you can install from the `v3.x-dev` branch.

```sh
composer require leafs/leaf dev-v3.x-dev
```

You can read the [setup docs](https://leafphp.dev/docs/introduction/installation.html) for leaf 3 to create your first app with functional mode.

### Migrating

We have a migration guide on our new documentation site. You can checkout [migrating from leaf 2](https://leafphp.dev/docs/migration/introduction.html#migrating-from-leaf-2) or [migrating from another library](https://leafphp.dev/docs/migration/other.html) if you have an app powered by another framework or library.

We will add more information and track progress on Leaf 3 and other stuff below. Your questions and suggestions are all welcome as well.🚀

## What of Leaf 2?

There will be one more minor release (2.7) which:

- Backport compatible 3.x features to 2.x
- Deprecation warnings for 3.x changes

This will be the last minor release for 2.x and will be offered as LTS (long-term support). Even after that, Leaf 2 will still receive security updates and critical fixes. There will be no breaking changes in leaf 2.

Leaf 2 documentation has also been hosted at [https://archive.leafphp.dev](https://archive.leafphp.dev). This means that until you are ready to move to Leaf 3, you can still confidently stick to version 2.

- **As a new user, should you start with Leaf 2 now or wait for 3.0?**

If you are just starting to learn the framework, you should start with Leaf 2 now, since Leaf 3 does not involve dramatic re-designs and the vast majority of your Leaf 2 knowledge will still apply for Leaf 3. There's no point in waiting if you are just learning.

- **Should you use Leaf 3 if you are picking a stack for an upcoming production project?**

If the project needs to start right now: we still recommend starting with Leaf 2 at least until the Leaf 3 RC is ready. However, make sure to keep an eye on upcoming changes in 3.0 and stay away from removed features. You may also want to stay away from heavy 3rd party dependencies that are coupled to Leaf 2.

## What's Left on Leaf 3?

There's actually a whole lot left to work on with Leaf 3. Over the past weeks, we've done a lot of work on leaf core, separating leaf into modules, writing new modules, refactoring code generally, code and performance optimizations, new features.

<input type="checkbox" disabled> Docs & Migration guides <br>
<input type="checkbox" disabled checked> Router performance upgrades <br>
<input type="checkbox" disabled> Module rewrites <br>
<input type="checkbox" disabled> Functional mode in modules <br>
<input type="checkbox" disabled checked> Leaf MVC 3 <br>
<input type="checkbox" disabled checked> Leaf API 3 <br>
<input type="checkbox" disabled checked> Skeleton 3 <br>
<input type="checkbox" disabled checked> Leaf CLI 2 - 13 Oct, 2021 <br>

![image](https://user-images.githubusercontent.com/26604242/139909979-5874ba75-4b81-4902-b79a-ec0be7ed0db3.png)

<input type="checkbox" disabled checked> New welcome page - 2 Nov, 2021

![image](https://user-images.githubusercontent.com/26604242/139909661-ef99b500-9953-4e7f-a5b1-107ab6d547f2.png)

<input type="checkbox" disabled checked> New error pages - 5 Nov, 2021

## Leaf 3 Release plans

The first preview of Leaf 3 has been released. Previews are released when the `v3.x-dev` branch is stable and merged with the `v3.x` branch. As modules are updated, versions of packages and other changes may be needed in the leaf package. That's what previews are for.

Once all modules are deemed safe for use, our official beta will be released and will run for a few weeks.

When leaf 3 beta is stable and suitable for use in production-ready apps, the official v3 release will be published 🚀

### Timelines

<input type="checkbox" disabled checked> **Preview (Alpha.1) - 10 Nov 2021**

The is the first preview of Leaf 3. We believe that most of the features are stable, however we are still finalizing some changes made to Leaf's other packages (Leaf API, Leaf MVC and Skeleton). Although features have been tested over and over again, there is always the chance of undiscovered bugs.

We see this preview as the structure for what leaf 3 will look like. So although things may change between our preview releases, the base structure and main features will not change.

We may or may not have multiple previews. This is simply depends on how well Leaf 3 performs and how many more features we need to test.

<input type="checkbox" disabled checked> **Leaf 3 Beta - 21 Nov 2021**

Once we feel feature complete, we'll release the official Beta version. This will be a build up on the latest preview changes, but will only include features that will make it to the final release. These features may still have uncovered bugs and the beta phase will be to fix all these. We encourage all community members/leaf enthusiasts to help with this🥺

<input type="checkbox" disabled checked> **Leaf 3 RC - 10 Dec 2021 (current)**

Although this wasn't originally part of our release plan, we want to give everybody the chance to try leaf 3 in production. There will be no new features after the beta, meaning the RC will be exactly the same as the stable version.

<input type="checkbox" disabled> **Official Release - ??**

This will be exactly the same as the RC if no bugs are found during the RC period. If any bugs are found which change Leaf's behaviour in any way, another RC will be released instead of the stable version. Once everything is proven to work fine, we can all enjoy Leaf 3 🚀

We plan to finalise the stable Leaf 3 release before the end of 2021, however, depending on how we sail through our beta and RCs, we may have to launch leaf 3 in January 2022. Along with Leaf 3, we will also release Leaf MVC 3, Leaf API 3, Skeleton 3, Leaf CLI 2 and a ton of other modules.

Until then, you can always contribute to Leaf 3, leave a star, an issue if you notice any bug or just a little message in our [forum](https://github.com/leafsphp/leaf/discussions/37) ❤️

[< Back to the blog](https://blog.leafphp.dev/)
