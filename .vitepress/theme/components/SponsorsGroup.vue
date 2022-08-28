<script lang="ts">
interface Sponsor {
  url: string
  img: string
  name: string
}

interface SponsorData {
  special: Sponsor[]
  platinum: Sponsor[]
  platinum_china: Sponsor[]
  gold: Sponsor[]
  silver: Sponsor[]
  bronze: Sponsor[]
}

// shared data across instances so we load only once
let data = $ref<any>()
let pending = false

const base = `https://sponsors.leafphp.dev`
</script>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

const { tier, placement = 'aside', showLabel = false } = defineProps<{
  tier: keyof SponsorData
  placement?: 'aside' | 'page' | 'landing',
  showLabel?: boolean,
}>()

let container = $ref<HTMLElement>()
let visible = $ref(false)

onMounted(async () => {
  // only render when entering view
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        visible = true
        observer.disconnect()
      }
    },
    { rootMargin: '0px 0px 300px 0px' }
  )
  observer.observe(container)
  onUnmounted(() => observer.disconnect())

  // load data
  if (!pending) {
    pending = true

    setTimeout(() => {
      data = {
        special: [],
        sponsor: [
          {
            name: "Netlify",
            url: "https://netlify.com",
            img: "https://user-images.githubusercontent.com/26604242/186772985-b21c2850-3cc3-41c6-9299-fe9cc5bac46a.png",
          },
          {
            name: "Casprine Asempah",
            url: "https://github.com/casprine",
            img: "https://images.opencollective.com/guest-c72a498e/avatar.png",
          },
          {
            name: "Farhan Yahaya",
            url: "https://github.com/doc-han",
            img: "https://avatars.githubusercontent.com/u/35382021?v=4",
          },
          {
            name: "Lucas Chaplain",
            url: "https://www.lucaschaplain.design/",
            img: "https://images.opencollective.com/sptaule/aa5f956/avatar/256.png",
          },
          {
            name: "Dawuda Iddris",
            url: "https://github.com/dawoodiddris",
            img: "https://avatars.githubusercontent.com/u/31323758?v=4",
          },
          {
            name: "King David Gyimah",
            url: "https://github.com/kdgyimah",
            img: "https://avatars.githubusercontent.com/u/29569594?v=4",
          },
          {
            name: "Vano",
            url: "#",
            img: "https://images.opencollective.com/guest-32634fda/avatar.png",
          },
          {
            name: "Aaron Smith",
            url: "https://opencollective.com/aaron-smith3",
            img: "https://images.opencollective.com/aaron-smith3/08ee620/avatar/256.png",
          },
          {
            name: "Peter Bogner",
            url: "https://opencollective.com/peter-bogner",
            img: "https://images.opencollective.com/peter-bogner/avatar/256.png",
          },
        ],
        code: [
          {
            name: "Michael Darko",
            url: "https://github.com/mychidarko",
            img: "https://avatars.githubusercontent.com/u/26604242?v=4",
          },
          {
            name: "Matthew Reichardt",
            url: "https://github.com/matthewjamesr",
            img: "https://avatars.githubusercontent.com/u/303321?v=4",
          },
          {
            name: "Daniel Lemes",
            url: "https://github.com/lemesdaniel",
            img: "https://avatars.githubusercontent.com/u/587064?v=4",
          },
          {
            name: "Ademílson F. Tonato",
            url: "https://github.com/ftonato",
            img: "https://avatars.githubusercontent.com/u/5417662?v=4",
          },
          {
            name: "Ivan Voitovych",
            url: "https://github.com/ivanvoitovych/",
            img: "https://avatars.githubusercontent.com/u/9718423?v=4",
          },
          {
            name: "Tobias Herber",
            url: "https://github.com/herber",
            img: "https://avatars.githubusercontent.com/u/22559657?&v=4",
          },
          {
            name: "Pjotr Savitski",
            url: "https://github.com/pjotrsavitski",
            img: "https://avatars.githubusercontent.com/u/518331?&v=4",
          },
          {
            name: "Pablo Ferreiro",
            url: "https://github.com/pablouser1",
            img: "https://avatars.githubusercontent.com/u/17802865?&v=4",
          },
          {
            name: "jess",
            url: "https://github.com/monkeywithacupcake",
            img: "https://avatars.githubusercontent.com/u/7316730?v=4",
          },
          {
            name: "Sergey Romanenko",
            url: "https://github.com/Awilum",
            img: "https://avatars.githubusercontent.com/u/477114?v=4",
          },
          {
            name: "Ashley",
            url: "https://github.com/AshleySymbolic",
            img: "https://avatars.githubusercontent.com/u/93997546?v=4",
          },
          {
            name: "Ivan Brykov",
            url: "https://github.com/brykov",
            img: "https://avatars.githubusercontent.com/u/476516?v=4",
          },
          {
            name: "Nur Muhammad",
            url: "https://github.com/ngekoding",
            img: "https://avatars.githubusercontent.com/u/11625690?v=4",
          },
          {
            name: "Mauro Callegari",
            url: "https://github.com/MauMaxxa",
            img: "https://avatars.githubusercontent.com/u/10811652?v=4",
          },
          {
            name: "Aminur Rahaman",
            url: "https://github.com/Aminur670",
            img: "https://avatars.githubusercontent.com/u/32174602?v=4",
          },
          {
            name: "Divine Niiquaye Ibok",
            url: "https://github.com/divineniiquaye",
            img: "https://avatars.githubusercontent.com/u/53147395?v=4",
          },
          {
            name: "Rai-Rai",
            url: "https://github.com/Rai-Rai",
            img: "https://avatars.githubusercontent.com/u/2023869?v=4",
          },
          {
            name: "Wahyu Kristianto",
            url: "https://github.com/Kristories",
            img: "https://avatars.githubusercontent.com/u/774338?v=4",
          },
          {
            name: "Muhammad Ezha Syafaat",
            url: "https://github.com/ezhasyafaat",
            img: "https://avatars.githubusercontent.com/u/49098343?v=4",
          },
          {
            name: "Rafael M.",
            url: "https://github.com/iamrameffort",
            img: "https://avatars.githubusercontent.com/u/52138516?v=4",
          },
          {
            name: "Pisyek K.",
            url: "https://github.com/pisyek",
            img: "https://avatars.githubusercontent.com/u/10695986?v=4",
          },
          {
            name: "Rafael Morais",
            url: "https://github.com/rafaelcanical",
            img: "https://avatars.githubusercontent.com/u/924985?v=4",
          },
          {
            name: "wfsdaj",
            url: "https://github.com/wfsdaj",
            img: "https://avatars.githubusercontent.com/u/36911167?v=4",
          },
          {
            name: "tedtop",
            url: "https://github.com/tedtop",
            img: "https://avatars.githubusercontent.com/u/5151307?v=4",
          },
          {
            name: "Dreamer0x01",
            url: "https://github.com/Dreamer0x01",
            img: "https://avatars.githubusercontent.com/u/12978365?v=4",
          },
          {
            name: "N'Bayramberdiyev",
            url: "https://github.com/nbayramberdiyev",
            img: "https://avatars.githubusercontent.com/u/23094428?v=4",
          },
          {
            name: "Robin",
            url: "https://github.com/MrAnyx",
            img: "https://avatars.githubusercontent.com/u/44176707?v=4",
          },
          {
            name: "Doeke Norg",
            url: "https://github.com/doekenorg",
            img: "https://avatars.githubusercontent.com/u/529515?v=4",
          },
          {
            name: "Francisco Ernesto Teixeira",
            url: "https://github.com/netinhoteixeira",
            img: "https://avatars.githubusercontent.com/u/1563399?v=4",
          },
          {
            name: "Ryan Gunn",
            url: "https://github.com/bluesn4rfer",
            img: "https://avatars.githubusercontent.com/u/86926422?v=4",
          },
          {
            name: "Shahlin Ibrahim",
            url: "https://github.com/shahlin",
            img: "https://avatars.githubusercontent.com/u/32275018?v=4",
          },
        ],
      };
    }, 30);

    // data = await (await fetch(`${base}/data.json`)).json()
  }
})
</script>

<template>
  <div ref="container" class="sponsor-container" :class="
    // [tier.startsWith('plat') ? 'platinum' : tier, placement]
    ['platinum', placement]
  ">
    <template v-if="data && visible">
      <a v-for="{ url, img, name } of data[tier]" class="sponsor-item" :href="url" target="_blank"
        rel="sponsored noopener">
        <img v-if="img.startsWith('http')" :src="img" :class="showLabel ? '-with-label' : ''" :alt="name" />
        <picture v-else-if="img.endsWith('png')">
          <source type="image/avif" :srcset="`${base}/images/${img.replace(/\.png$/, '.avif')}`" />
          <img :src="`${base}/images/${img}`" :class="showLabel ? '-with-label' : ''" :alt="name" />
        </picture>
        <img v-else :src="`${base}/images/${img}`" :class="showLabel ? '-with-label' : ''" :alt="name" />

        <p class="sponsor-label" v-if="showLabel">{{ name }}</p>
      </a>
    </template>
    <a v-if="placement !== 'page' && tier !== 'special' && tier !== 'code'" href="/support/"
      class="sponsor-item action">Your image</a>
  </div>
</template>

<style scoped>
.sponsor-container {
  --max-width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(var(--max-width), 1fr));
  column-gap: 4px;
}

.sponsor-container.platinum {
  --max-width: 240px;
}

.sponsor-container.gold {
  --max-width: 180px;
}

.sponsor-container.silver {
  --max-width: 140px;
}

.sponsor-item {
  margin: 2px 0;
  background-color: var(--vt-c-white-soft);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border-radius: 2px;
  transition: background-color 0.2s ease;
  height: calc(var(--max-width) / 2 - 6px);
}

.sponsor-item.action {
  font-size: 11px;
  color: var(--vt-c-text-3);
}

.sponsor-item img:not(.-with-label) {
  max-width: calc(var(--max-width) - 30px);
  max-height: calc(var(--max-width) / 2 - 20px);
}

.sponsor-item img.-with-label {
  max-width: calc(var(--max-width) - 55px);
  max-height: calc(var(--max-width) / 2 - 45px);
}

.special .sponsor-item {
  height: 160px;
}

.special .sponsor-item img {
  max-width: 300px;
  max-height: 150px;
}

/* dark mode */
.dark .aside .sponsor-item,
.dark .landing .sponsor-item {
  background-color: var(--vt-c-bg-soft);
}

.aside .sponsor-item img,
.landing .sponsor-item img {
  transition: filter 0.2s ease;
}

.aside .sponsor-item img,
.landing .sponsor-item img {
  filter: grayscale(1);
}

.aside .sponsor-item:hover img,
.landing .sponsor-item:hover img {
  filter: grayscale(0);
}

.dark .aside .sponsor-item:hover,
.dark .landing .sponsor-item:hover {
  color: var(--vt-c-indigo);
  background-color: var(--vt-c-white-mute);
}

.dark .sponsor-item:hover img {
  filter: none;
}

/* aside mode (on content pages) */
.sponsor-container.platinum.aside {
  --max-width: 110px;
  column-gap: 1px;
}

.aside .sponsor-item {
  margin: 1px 0;
}

.aside .special .sponsor-item {
  width: 100%;
  height: 60px;
}

.aside .special .sponsor-item img {
  width: 120px;
}

.aside .platinum .sponsor-item {
  width: 111px;
  height: 50px;
}

.aside .platinum .sponsor-item img {
  max-width: 88px;
}

/* narrow, aside will be hidden under this state so it's mutually exclusive */
@media (max-width: 720px) {
  .sponsor-container.platinum {
    --max-width: 180px;
  }

  .sponsor-container.gold {
    --max-width: 140px;
  }

  .sponsor-container.silver {
    --max-width: 120px;
  }
}

@media (max-width: 480px) {
  .sponsor-container.platinum {
    --max-width: 150px;
  }

  .sponsor-container.gold {
    --max-width: 120px;
  }

  .sponsor-container.silver {
    --max-width: 100px;
  }
}
</style>
