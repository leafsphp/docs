# Welcome to the Leaf tutorial

<!-- markdownlint-disable no-inline-html -->

This interactive tutorial will teach you the basics to start building apps with Leaf.

It assumes basic PHP knowledge, so if you are **totally new** to PHP, it might not be the best idea to jump right into a framework as your first step - [grasp the basics](https://www.w3schools.com/php/default.asp) then come back!

You don't need to understand everything before moving on, but completing this tutorial will give you a solid foundation to build on.

## How to use this tutorial

Each step will introduce a new concept and ask you to complete a task. You will be expected to write code in the editor on this page which you can run by clicking the **RUN** button found on the preview pane.

If you get stuck, you can click the **"Reveal Answer!"** button at the bottom to reveal the working code.

## Options for running your code

Leaf allows you to create multiple routes, so you can test different routes in the editor.

You can change the route to run by updating the **`path`** in the **`request.json`** file.

You can also pass in **`data`** which the editor should run your code with. This can be GET or POST request data.

```json{2}
{
  "method": "GET",
  "path": "/custom",
  "data": {}
}
```

<!-- ::: details Tutorial Setting Details

Leaf offers two API styles: functional mode and class mode. This tutorial is designed to work for both - you can choose your preferred style using the **Style preference** switches at the top. <a target="_blank" href="/docs/introduction/#class-mode-vs-functional-mode">Learn more about API styles

::: -->

Ready to begin your journey? Click **"->"** to get started.
