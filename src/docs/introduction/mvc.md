<!-- markdownlint-disable no-inline-html -->

# Leaf + MVC

<script setup>
import VideoDocs from '/@theme/components/VideoDocs.vue'
</script>

Leaf is a simple PHP framework/set of libraries that can be used to build any kind of application. By default, Leaf doesn't give you a lot of structure, but it fully supports the MVC pattern without any extra configuration.

## What is MVC?

MVC stands for Model-View-Controller. It's a pattern that separates your application into three distinct parts:

- Models: These are the classes that represent your data. They are responsible for interacting with your database, and for validating your data.
- Views: These are the files that are responsible for displaying your data to the user. They are usually written in HTML, but can also be written in other templating languages like [BareUI](https://leafphp.dev/modules/views/bareui/) or [Blade](https://leafphp.dev/modules/views/blade/).
- Controllers: These are the classes that are responsible for handling the user's request, and for returning the appropriate response.

<VideoDocs
  title="New to MVC?"
  subject="What is MVC? Simple Explanation"
  description="If you're new to the MVC pattern, you can take a look at this video by Traversy Media that explains the MVC pattern, how it works and how it works in real-world applications."
  link="https://www.youtube.com/embed/pCvZtjoRq1I"
/>

## MVC in Leaf

Leaf out of the box doesn't provide any structure, however, the Leaf team also provides a few setups that you can use to get started with Leaf and MVC. These setups are designed to give you a good starting point for your application, and come with additional tooling that make building with Leaf even faster.

We provide three setups for you to choose from:

- [Leaf MVC](https://mvc.leafphp.dev/)
- [Leaf API](https://api.leafphp.dev/)
- [Skeleton](https://skeleton.leafphp.dev/)

### Leaf MVC vs Leaf API vs Skeleton

| Engine                              |  Type       |  In-app console   |  Main use       | Extra Notes                    |
| ----------------------------------- | :---------: | :---------------: | :-------------: | :----------------------------: |
| [Leaf MVC](/modules/views/bareui/)  | Framework   |         ✅        | General purpose |                -               |
| [Leaf API](/modules/views/veins/)   | Framework   |         ✅        | Building APIs   | View layer disabled by default |
| [Skeleton](/modules/views/blade/)   | Boilerplate |         ❌        | General purpose |                -               |

## MVC Tools

Besides to the MVC setups, Leaf also provides a few tools that can help you build your own MVC setup if you want to. You can check the "MVC Tools" section in the sidebar to learn more about these tools.
