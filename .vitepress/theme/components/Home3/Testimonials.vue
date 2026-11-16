<script setup lang="ts">
const featured = {
  quote:
    'This is my first experience with PHP, I tried Leaf 5 out in the alpha with Claude code, and was genuinely impressed. I got my entire school project complete in a matter of minutes, especially the billing part.',
  name: 'Selasi Bansa',
  handle: '@sdotb',
  url: 'https://linktr.ee/iiTzDot',
  img: 'https://ugc.production.linktr.ee/ac5c6b9d-c474-46c4-9e3f-c0a2dcb91bdd_IMG-1186.jpeg?io=true&size=avatar-v3_0',
};

const quotes = [
  {
    quote: 'Building with Leaf has been the most simple and straightforward approach to getting an app production ready',
    name: 'Desmond Sofua',
    handle: '@cr34t1ve',
    url: 'https://github.com/cr34t1ve',
    img: 'https://avatars.githubusercontent.com/u/37486330?v=4',
  },
  {
    quote:
      'Leaf has been a great choice for us as it allows us to build our APIs really fast, giving us time to focus on what we want: the design and experience of our projects.',
    name: 'Rare Goods Only',
    handle: '@raregoodsonly',
    url: 'https://raregoodsonly.webflow.io/',
    img: 'https://pbs.twimg.com/profile_images/1671450894448177160/4R8HRGR8_400x400.jpg',
  },
  {
    quote:
      'It gives the essentials to start building right away, with the flexibility to add exactly the features you need, precisely when you need them.',
    name: 'Andrew MacLean',
    handle: '@andrewdmaclean',
    url: 'https://github.com/andrewdmaclean',
    img: 'https://avatars.githubusercontent.com/u/26526271?v=4',
  },
  {
    quote:
      'I just don\'t "get" the major frameworks and to me I want something simple which I can add to if needed and now I come across Leaf. Wow.',
    name: 'jamie-syon',
    handle: '@jamie-syon',
    url: 'https://github.com/jamie-syon',
    img: 'https://avatars.githubusercontent.com/u/86834565?v=4',
  },
  {
    quote: 'Clean, well organized and the MVC versión is just great!!!',
    name: 'Carlos Cárdenas',
    handle: '@carlos_cardenas1',
    url: 'https://www.producthunt.com/@carlos_cardenas1',
    img: 'https://ph-avatars.imgix.net/2028422/original?auto=format&auto=compress&codec=mozjpeg&cs=strip&w=120&h=120&fit=crop&dpr=2',
  },
];
</script>

<template>
  <section>
    <div class="lf-pad" style="padding-top: 88px; padding-bottom: 48px">
      <h2 class="lf-h2" style="max-width: 820px">People are shipping real things with it</h2>
    </div>
    <div class="lf-grid lf-tq">
      <figure class="lf-tq-featured">
        <blockquote>“{{ featured.quote }}”</blockquote>
        <figcaption class="lf-who">
          <img :src="featured.img" alt="" width="48" height="48" loading="lazy" style="width: 48px; height: 48px" />
          <span>
            <a :href="featured.url" target="_blank" rel="noopener" style="display: block; font-weight: 600">{{ featured.name }}</a>
            <span style="font-size: 14px; color: #6b6158">{{ featured.handle }} · Leaf 5 alpha</span>
          </span>
        </figcaption>
      </figure>
      <figure v-for="q in quotes" :key="q.name" class="lf-tq-card">
        <blockquote>“{{ q.quote }}”</blockquote>
        <figcaption class="lf-who">
          <img :src="q.img" alt="" width="32" height="32" loading="lazy" />
          <span style="font-size: 14px; line-height: 1.4">
            <a :href="q.url" target="_blank" rel="noopener" style="display: block; font-weight: 600">{{ q.name }}</a>
            <span style="color: var(--lf-muted)">{{ q.handle }}</span>
          </span>
        </figcaption>
      </figure>
      <a href="https://discord.gg/Pkrm9NJPE3" target="_blank" rel="noopener" class="lf-tq-card lf-tq-cta">
        <span style="font-weight: 600; font-size: 17px">Join the Discord →</span>
        <span style="font-size: 14px; color: var(--lf-muted)">Releases drop there first. Come show what you're shipping.</span>
      </a>
    </div>
  </section>
</template>

<style scoped>
.lf-tq {
  grid-template-columns: repeat(auto-fit, minmax(min(380px, 100%), 1fr));
  border-top: 1px solid var(--lf-line);
}
.lf-tq-featured {
  grid-column: 1 / -1;
  background: linear-gradient(135deg, #fde9d9, #fbf1dc) !important;
  color: #120e0b;
  padding: 48px 32px !important;
  display: flex;
  flex-wrap: wrap;
  gap: 28px;
  align-items: center;
}
.lf-tq-featured blockquote {
  flex: 1 1 520px;
  font-family: 'Bricolage Grotesque', system-ui, sans-serif;
  font-size: clamp(22px, 2.4vw, 32px) !important;
  line-height: 1.25;
  letter-spacing: -0.02em;
  font-weight: 500;
}
.lf-tq-card {
  padding: 30px 32px !important;
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: space-between;
}
.lf-tq-card blockquote {
  font-size: 16px !important;
  line-height: 1.6;
}
.lf-tq-cta {
  justify-content: center;
  gap: 6px;
}
.lf-who {
  display: flex;
  gap: 12px;
  align-items: center;
}
.lf-who img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  flex: 0 0 auto;
}
</style>
