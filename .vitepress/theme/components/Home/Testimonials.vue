<template>
  <div
    class="hidden sm:flex justify-center item-center md:pt-36 md:pb-48 bg-[var(--vp-c-bg-secondary)] !px-2 sm:!px-10">
    <section class="flex flex-col justify-center items-center">
      <div class="text-center mb-16">
        <h1 class="text-3xl md:!text-5xl px-[20%]">Powering thousands of makers, just like you.</h1>
      </div>

      <div class="mx-auto mt-4 grid grid-cols-1 gap-4 text-sm sm:grid-cols-2 xl:grid-cols-4">
        <div v-for="(columnGroup, columnGroupIdx) in testimonials" :key="columnGroupIdx" class="grid gap-4"
          :class="columnGroupIdx === 1 ? 'hidden xl:grid xl:col-span-2' : ''">
          <div :class="columnGroupIdx === 1 ? 'xl:grid xl:grid-cols-2 gap-4' : ''">
            <Card v-for="testimonial in columnGroup" :key="testimonial.tagline"
              class="rounded-2xl p-6 shadow-lg ring-1 ring-gray-900/5 h-auto">
              <p class="!mt-0">{{ testimonial.body }}</p>

              <div class="mt-6 flex items-center gap-x-4">
                <img class="h-10 w-10 rounded-full" :src="testimonial.imageUrl" alt="" />
                <div>
                  <div class="font-semibold">{{ testimonial.name }}</div>
                  <div class="text-[var(--vp-c-card-text-2)]">{{ testimonial.tagline }}</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <div class="relative z-10 text-center max-w-screen-lg xl:max-w-screen-xl mx-auto pt-20">
        <div class="px-4 sm:px-6 md:px-8">
          <figure class="max-w-3xl">
            <blockquote class="!border-none !my-7 !text-[var(--vp-c-text-1)]">
              <p class="text-center !text-3xl !font-semibold sm:!text-4xl leading-relaxed">
                <span class="text-gray-400">“</span>I don’t have time for complexity. Leaf gives me the tools I need,
                nothing more.<span class="text-gray-400">”</span>
              </p>
            </blockquote>
            <figcaption class="sm:text-xl font-medium flex flex-col items-center">
              <div class="p-1 border-2 border-[var(--vp-c-brand)] rounded-full mb-3"><img
                  src="https://avatars.githubusercontent.com/u/26604242?v=4" alt=""
                  class="w-14 h-14 rounded-full bg-[var(--vp-c-brand)]" loading="lazy"></div>
              <div>Michael Darko</div>
              <small class="text-[var(--vp-c-brand)]">Creator of Leaf PHP</small>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import Card from '../shared/Card.vue';

const testimonials = [
  [
    {
      body: `Today’s web development landscape demands tools that are fast, lightweight, and capable of growing with your projects. Many PHP frameworks try to do it all, making it challenging to find one that truly checks all these boxes—often adding unnecessary complexity to projects that need to stay nimble. That’s where Leaf shines. It gives the essentials to start building right away, with the flexibility to add exactly the features you need, precisely when you need them.`,
      name: 'Andrew MacLean',
      tagline: '@andrewdmaclean',
      imageUrl:
        'https://avatars.githubusercontent.com/u/26526271?v=4',
      url: 'https://github.com/andrewdmaclean',
    },
  ],
  [
    {
      body: 'Thanks for making this! I have been looking for an alternative to Silex for a few years now. I have tried other frameworks like Lumen, Laravel & Slim, but they were always a pain to setup with my VMs, and usually forced you to adhere to a console generated bundle.',
      name: 'propeller-aaron',
      tagline: '@propeller-aaron',
      imageUrl:
        'https://avatars.githubusercontent.com/u/52088295?v=4',
      url: 'https://github.com/propeller-aaron',
    },
    {
      body: 'As a design/frontend-heavy agency, we needed a lightweight, but powerful framework that would just work on our servers without any hassle. Leaf has been a great choice for us as it allows us to build our APIs really fast, giving us time to focus on what we want: the design and experience of our projects.',
      name: 'Rare Goods Only',
      tagline: '@raregoodsonly',
      url: 'https://raregoodsonly.webflow.io/',
      imageUrl:
        'https://pbs.twimg.com/profile_images/1671450894448177160/4R8HRGR8_400x400.jpg',
    },
    {
      body: 'Awesome, I just found about it and already using it for a client\'s site.Clean, well organized and the MVC versión is just great!!!',
      name: 'Carlos Cárdenas',
      tagline: '@carlos_cardenas1',
      url: 'https://www.producthunt.com/@carlos_cardenas1',
      imageUrl:
        'https://ph-avatars.imgix.net/2028422/original?auto=format&auto=compress&codec=mozjpeg&cs=strip&w=120&h=120&fit=crop&dpr=2',
    },
    {
      body: 'Building with Leaf has been the most simple and straightforward approach to getting an app production ready',
      name: 'Desmond Sofua',
      tagline: '@cr34t1ve',
      url: 'https://github.com/cr34t1ve',
      imageUrl:
        'https://avatars.githubusercontent.com/u/37486330?v=4',
    },
  ],
  [
    {
      body: `I'm currently looking for a framework to replace our in-house built MVC framework which we have spent quite some time building over the years.

  I just don't "get" the major frameworks and to me I want something simple which I can add to if needed and now I come across Leaf. Wow. I think you've done a great job! ...

  Thanks!`,
      name: 'jamie-syon',
      tagline: '@jamie-syon',
      url: 'https://github.com/jamie-syon',
      imageUrl:
        'https://avatars.githubusercontent.com/u/86834565?v=4',
    },
  ]
];
</script>
