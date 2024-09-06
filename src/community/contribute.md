---
sidebar: false
editLink: false
prev: false
next: false
lastUpdated: false
---

# Contribution Guide

Hi there! We're thrilled that you'd like to contribute to the community. Your help is essential, and we're grateful for it. Before you get started, please take a moment to read through the following guidelines:

- [Leaf & Modules](#leaf-and-modules)
- [Code style guide](#code-style-guide)
- [Code of Conduct](#code-of-conduct)
- [Pull Request Guidelines](#pull-request-guidelines)
- [Writing guide for documentation](/community/writing-guide)

## Leaf and Modules

Leaf is built to be modular, so you can use only what you need. This also means that you can contribute to Leaf by creating modules that extend its functionality or simply adding new features to an existing module. Modules can be anything from simple helper functions to a full-blown set of new functionality for Leaf.

The core of Leaf is a simple wrapper around Leaf's router and http modules that adds things like dependency injection, synced configuration, and a few other features. Everything else is built as modules.

Leaf MVC takes this a step further by constructing a simple MVC structure around Leaf. MVC Core is a module that links the said MVC structure to Leaf's core, and the rest of the modules are built around this. We do it this way so that you can use Leaf's core and other modules without having to use the MVC structure. So, if you're contributing to Leaf's core or any of the modules, try not to make it dependent on the MVC structure.

With that said, you're ready to start contributing to Leaf. If you're contributing to Leaf's core, you can find the source code [here](https://github.com/leafsphp/leaf). If you're contributing to a module, you can find the source code somewhere in our [GitHub organization](https://github.com/leafsphp). If you're contributing to the documentation, you can find the source code [here](https://github.com/leafsphp/docs).

## Code style guide

When contributing to Leaf, please make sure to follow the [PSR-12](https://www.php-fig.org/psr/psr-12/) coding standard. This is a set of rules that dictates how PHP code should be written. It's a good idea to familiarize yourself with these rules before contributing to Leaf (They're pretty simple standards, mostly about indentation and naming conventions. Most of us use them without even knowing it).

We have a more compact guide [here](https://rebel-tibia-7d7.notion.site/2-Code-Quality-and-Reviews-183c0344a6cc43e7b3693880b0fb35a6) that you can follow. It's a really short guide, but the most important thing you should take away from it is that the top priority is to make anything you build developer-friendly. This means that your code should be easy to read, easy to understand, and easy to use.

## Code of Conduct

Our [Code of Conduct](/community/code-of-conduct) governs how we behave in public or in private whenever Leaf or its community is involved. We expect it to be honored by everyone who represents the Leaf community officially or informally, claims affiliation with the project, or participates directly. It applies to all of our spaces, including GitHub, Twitter, and other social media platforms.

## Pull Request Guidelines

Before you submit a pull request, check that it meets these guidelines:
