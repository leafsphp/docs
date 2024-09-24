<template>
  <div class="flex justify-center item-center md:py-48 bg-[var(--vp-c-bg-secondary)]">
    <section class="flex flex-col justify-center items-center">
      <div class="text-center mb-16">
        <h1 class="text-3xl md:!text-5xl px-[20%]">Loved by thousands of product people like you.</h1>
      </div>

      <div class="mx-auto mt-4 grid grid-cols-1 gap-4 text-sm sm:grid-cols-2 xl:grid-cols-4">
        <div v-for="(columnGroup, columnGroupIdx) in testimonials" :key="columnGroupIdx" class="grid gap-4"
          :class="columnGroupIdx === 1 ? 'xl:col-span-2' : ''">
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
    </section>
  </div>
</template>

<script setup>
import Card from '../shared/Card.vue';

const testimonials = [
  [
    {
      body: 'Thanks for making this! I have been looking for an alternative to Silex for a few years now. I have tried other frameworks like Lumen, Laravel & Slim, but they were always a pain to setup with my VMs, and usually forced you to adhere to a console generated bundle.',
      name: 'propeller-aaron',
      tagline: '@propeller-aaron',
      imageUrl:
        'https://avatars.githubusercontent.com/u/52088295?v=4',
      url: 'https://github.com/propeller-aaron',
    },
  ],
  [
    {
      body: 'Awesome, I just found about it and already using it for a client\'s site.Clean, well organized and the MVC versión is just great!!!',
      name: 'Carlos Cárdenas',
      tagline: '@carlos_cardenas1',
      url: 'https://www.producthunt.com/@carlos_cardenas1',
      imageUrl:
        'https://ph-avatars.imgix.net/2028422/original?auto=format&auto=compress&codec=mozjpeg&cs=strip&w=120&h=120&fit=crop&dpr=2',
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
      body: 'Awesome, I just found about it and already using it for a client\'s site.Clean, well organized and the MVC versión is just great!!!',
      name: 'Carlos Cárdenas',
      tagline: '@carlos_cardenas1',
      url: 'https://www.producthunt.com/@carlos_cardenas1',
      imageUrl:
        'https://ph-avatars.imgix.net/2028422/original?auto=format&auto=compress&codec=mozjpeg&cs=strip&w=120&h=120&fit=crop&dpr=2',
    },
    {
      body: 'Awesome, I just found about it and already using it for a client\'s site.Clean, well organized and the MVC versión is just great!!!',
      name: 'Carlos Cárdenas',
      tagline: '@carlos_cardenas1',
      url: 'https://www.producthunt.com/@carlos_cardenas1',
      imageUrl:
        'https://ph-avatars.imgix.net/2028422/original?auto=format&auto=compress&codec=mozjpeg&cs=strip&w=120&h=120&fit=crop&dpr=2',
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
