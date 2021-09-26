<template>
  <SponsorsLayout extra-classes="sponsors__open-collective">
    <template #content>
      <h4>Backer</h4>
      <a
        :href="`https://opencollective.com/leaf/tiers/backer/${index}/website`"
        rel="sponsored noopener"
        target="_blank"
        v-for="(_, index) in new Array(featuredCount.platinum)"
        :key="`opencollective-backers-${index}`"
      >
        <img
          :src="`https://opencollective.com/leaf/tiers/backer/${index}/avatar.svg`"
          alt="Leaf PHP backer"
        >
      </a>

      <h4>Supporter</h4>
      <a
        :href="`https://opencollective.com/leaf/tiers/supporter/${index}/website`"
        rel="sponsored noopener"
        target="_blank"
        v-for="(_, index) in new Array(featuredCount.platinum)"
        :key="`opencollective-supporters-${index}`"
      >
        <img
          :src="`https://opencollective.com/leaf/tiers/supporter/${index}/avatar.svg`"
          alt="Leaf PHP supporter"
        >
      </a>
    </template>
  </SponsorsLayout>
</template>

<script>
import SponsorsLayout from '@theme/components/sponsors/SponsorsLayout.vue'

export default {
  components: {
    SponsorsLayout
  },

  data: () => ({
    featuredCount: {
      platium: 3,
      gold: 10
    }
  })
}
</script>

<style lang="scss" scoped>
.sponsors__open-collective {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

img {
  width: auto;
  max-width: 100px !important;
  max-height: 60px !important;
}
</style>
