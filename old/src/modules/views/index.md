# Introduction

Over the years, leaf has had suport for many in-built templating engines. Although none of them are shipped with leaf by default any more, leaf still supports all of them.

::: info Note That
You can use any templating engine you prefer with leaf, however, these templating engines are specifically created for leaf but can be used outside leaf apps as well.
:::

## Engines

Depending on your needs, you may want to go with a particular templating engine.

| Engine                           | Use case                                     |
| -------------------------------- | -------------------------------------------- |
| [bareui](/modules/views/bareui/) | Blazing fast templating with no compile time |
| [veins](/modules/views/veins/)   | Lightweight but powerful templating engine   |
| [blade](/modules/views/blade/)   | Laravel blade templating engine for leaf     |

## BareUI vs Veins vs Blade

| Engine                           |  Speed  |  Cool Magic  |  Lightweight  | Editor Support |
| -------------------------------- | :-----: | :----------: | :-----------: | :------------: |
| [bareui](/modules/views/bareui/) |    ⚡️   |       ❌      |      ⚡️       |       ⚡️       |
| [veins](/modules/views/veins/)   |    🔥   |       🔥      |      🔥       |       🔥       |
| [blade](/modules/views/blade/)   |    ❌   |       ⚡️      |      🔥       |       ⚡️       |
