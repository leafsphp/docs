<template>
  <div class="theme-container">
    <div class="theme-default-content">
      <h1>4😵‍💫4</h1>

      <blockquote>
        <p>We couldn't find this page.</p>
      </blockquote>

      <p>
        If you think this is a big, please submit a pull request. Thanks🙏🏽
      </p>

      <RouterLink to="/">
        Take me home.
      </RouterLink>
    </div>
  </div>
</template>

<script>
import { repos } from '../../components/guide/contributing/translations-data.js'

export default {
  data () {
    return {
      isTranslation: false
    }
  },

  mounted () {
    const toOrigin = url => (String(url).match(/https?:\/\/[^/]+/) || [])[0]
    const referrer = toOrigin(document.referrer)

    // Did we get here from a translation?
    if (referrer && referrer !== location.origin && repos.some(({ url }) => toOrigin(url) === referrer)) {
      this.isTranslation = true
    }
  }
}
</script>

<style lang="stylus" scoped>
.theme-container
  height 100vh
</style>
