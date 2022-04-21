<template>
  <div class="sponsor-group open-collective-sponsors sponsor-section">
    <script src="https://opencollective.com/leaf/banner.js"></script>
  </div>
</template>

<script>
export default {
  props: { group: { type: String, requird: true } },
  computed: {
    url () {
      return `https://opencollective.com/vuejs/tiers/${this.group}-sponsors`
    }
  }
}
</script>
