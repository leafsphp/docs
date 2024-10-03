# Frontend

<!-- markdownlint-disable no-inline-html -->

Both Leaf and Leaf MVC offer first-class support for frontend tooling and libraries. This includes support for different templating engines, CSS preprocessors, and JavaScript libraries.

## Templating Engines

Leaf is modular and allows you to use any templating engine you want, however, it comes with 2 first-class templating engines:

- Leaf's BareUI engine
- Laravel's Blade engine

While both of these engines are great, they both have their own strengths and weaknesses. Leaf's BareUI engine is a simple, lightweight, and fast engine but it's not as feature-rich as Blade. Blade, on the other hand, is a feature-rich engine with a lot of features but it's not as fast as BareUI since it has to compile and cache views.

BareUI relies on PHP's innate templating capabilities so it's syntax is PHP's syntax. Blade, on the other hand, has its own syntax using `@` directives. They are both great engines and the choice of which to use is up to you.

| Engine                           |  Speed  |  Cool Magic  |  Lightweight  | Editor Support |
| -------------------------------- | :-----: | :----------: | :-----------: | :------------: |
| [bareui](/docs/frontend/bareui) |    ⚡️   |       ❌      |      ⚡️       |       ⚡️       |
| [blade](/docs/frontend/blade)   |    ❌   |       ⚡️      |      ❌       |       ⚡️       |

## Asset Bundling

Leaf provides first-class support for asset bundling using [Vite](https://vite.dev/). Vite is a modern build tool for frontend applications which aims to provide a faster and leaner development experience for modern web projects. Vite and Leaf make the perfect pair for building modern web applications since they are both fast and lightweight.

<img src="https://github.com/user-attachments/assets/43e7b482-8b0f-4c19-9f7f-05cbfa129186" alt="Error Page" width="100%" class="border border-gray-500 rounded-lg">

Bundling assets allows you to write your frontend code in a modular way and then bundle it into a single file for production. This makes your frontend code more maintainable and easier to work with. Vite also allows you to use modern JavaScript features like ES6 modules, JSX, and even TypeScript.

The Vite + Leaf stack unlocks a lot of possibilities for building modern web applications with Leaf and your favorite frontend tooling. You can find the full documentation on the [Vite module page](/docs/frontend/vite)

## Frontend Frameworks

Modern web apps are built on the backs of powerful UI libraries like React, Vue, and Svelte. Leaf provides an easy way to integrate these libraries into your Leaf applications using [Inertia.js](https://inertiajs.com/).

<img src="https://github-production-user-asset-6210df.s3.amazonaws.com/26604242/373087967-31f1973b-6a7b-489a-9c75-b87d9d604c88.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20241003%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241003T021640Z&X-Amz-Expires=300&X-Amz-Signature=53574aff7bbdb518f534d1a3a35b02a9b963d698364f9e64d239bcb7b4a7d630&X-Amz-SignedHeaders=host" alt="" width="100%" class="border border-gray-500 rounded-lg">

Inertia acts as a bridge between your Leaf backend and your frontend UI library that allows them to communicate seamlessly. This allows you to build modern web applications with Leaf and your favorite frontend library without much of the complexity that comes with modern SPAs.

You can find the full documentation on the [Inertia module page](/docs/frontend/inertia)
