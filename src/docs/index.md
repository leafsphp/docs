---
aside: false
---

# Start building with Leaf

<!-- markdownlint-disable no-inline-html -->

<script setup>
import StartPage from '@theme/components/Docs/StartPage.vue';
</script>

<StartPage />

<h2>Choose your path</h2>


<div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-4">
    <section class="flex">
        <div
            class="w-full relative text-white overflow-hidden rounded-3xl flex shadow-lg"
        >
            <div
                class="w-full flex md:flex-col bg-gradient-to-br from-purple-500 to-indigo-500"
            >
                <div
                    class="sm:max-w-sm sm:flex-none md:w-auto md:flex-auto flex flex-col items-start relative z-10 p-6 xl:p-8"
                >
                    <h3 class="text-xl font-semibold mb-2 text-shadow !mt-0">
                        Micro-tool
                    </h3>
                    <p class="text-sm text-violet-200 text-shadow !my-0 font-medium">
                        Start simple. Ship fast
                    </p>
                    <p class="font-medium text-violet-100 text-shadow !mt-2 mb-4">
                        Perfect for ideas, small tools, experiments
                    </p>
                    <Button
                        as="a"
                        class="mt-auto bg-violet-800 hover:!bg-violet-800 !text-white bg-opacity-50 hover:bg-opacity-75 transition-colors duration-200 rounded-xl font-bold py-2 px-4 inline-flex"
                        href="/learn/basic"
                        >Start simple</Button
                    >
                </div>
                <!-- <div
                    class="relative md:pl-6 xl:pl-8 hidden sm:block"
                >
                    Hello
                </div> -->
            </div>
            <div
                class="absolute bottom-0 left-0 right-0 h-20 hidden sm:block"
                style="
                    background: linear-gradient(
                        to top,
                        rgb(135, 94, 245),
                        rgba(135, 94, 245, 0)
                    );
                "
            ></div>
        </div>
    </section>
    <section class="flex">
        <div
            class="w-full relative text-white overflow-hidden rounded-3xl flex shadow-lg"
        >
            <div
                class="w-full flex md:flex-col bg-gradient-to-br from-pink-500 to-rose-500"
            >
                <div
                    class="sm:max-w-sm sm:flex-none md:w-auto md:flex-auto flex flex-col items-start relative z-10 p-6 xl:p-8"
                >
                    <h3 class="text-xl font-semibold mb-2 text-shadow !mt-0">
                        Web Apps
                    </h3>
                    <p class="text-sm text-rose-200 text-shadow !my-0 font-medium">
                        Build something real
                    </p>
                    <p class="font-medium text-rose-100 text-shadow !mt-2 mb-4">
                        Perfect for startups, internal tools, real user products
                    </p>
                    <Button
                        as="a"
                        href="/learn/mvc"
                        class="mt-auto bg-rose-900 hover:!bg-rose-900 !text-white bg-opacity-50 hover:bg-opacity-75 transition-colors duration-200 rounded-xl font-bold py-2 px-4 inline-flex"
                        >Build your app</Button
                    >
                </div>
                <!-- <div
                    class="relative md:pl-6 xl:pl-8 hidden sm:block"
                >
                    Hello
                </div> -->
            </div>
            <div
                class="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-rose-500 hidden sm:block"
            ></div>
        </div>
    </section>
    <section class="flex">
        <div
            class="w-full relative text-white overflow-hidden rounded-3xl flex shadow-lg"
        >
            <div
                class="w-full flex md:flex-col bg-gradient-to-br from-yellow-400 to-orange-500"
            >
                <div
                    class="sm:max-w-sm sm:flex-none md:w-auto md:flex-auto flex flex-col items-start relative z-10 p-6 xl:p-8"
                >
                    <h3 class="text-xl font-semibold mb-2 text-shadow !mt-0">
                        APIs
                    </h3>
                    <p class="text-sm text-amber-200 text-shadow !my-0 font-medium">
                        Power your frontend
                    </p>
                    <p class="font-medium text-amber-100 text-shadow !mt-2 mb-4">
                      Perfect for backends, integrations, mobile apps
                    </p>
                    <Button
                        as="a"
                        class="mt-auto bg-amber-900 hover:!bg-amber-900 !text-white bg-opacity-50 hover:bg-opacity-75 transition-colors duration-200 rounded-xl font-bold py-2 px-4 inline-flex"
                        href="/learn/api"
                        >Create API</Button
                    >
                </div>
                <!-- <div class="relative hidden sm:block">
                    <div class="absolute left-2 bottom-3 xl:bottom-5">
                        Hello
                    </div>
                </div> -->
            </div>
            <div
                class="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-orange-500 hidden sm:block"
            ></div>
        </div>
    </section>
</div>
