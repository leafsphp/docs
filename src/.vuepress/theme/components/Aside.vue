<template>
  <aside :class="`sidebar -${type || 'left'}`">
    <h4>Table of contents</h4>
    <SidebarLinks :depth="1" type="right" :items="items" />
    <slot name="bottom" />

    <h4 style="margin-top: 50px;">Leaf Social</h4>
    <div class="leaf-links">
      <!-- repo link -->
      <iframe
        id="twitter-widget-0"
        scrolling="no"
        frameborder="0"
        allowtransparency="true"
        class="twitter-follow-button twitter-follow-button-rendered repo-link github"
        style="position: static; visibility: visible; width: 190px; height: 20px;"
        title="Twitter Follow Button"
        src="https://platform.twitter.com/widgets/follow_button.2d991e3dfc9abb2549972ce8b64c5d85.en.html#dnt=false&amp;id=twitter-widget-0&amp;lang=en&amp;screen_name=leafphp&amp;show_count=true&amp;show_screen_name=true&amp;size=m&amp;time=1573826693283"
        data-screen-name="leafphp"
      ></iframe>

      <iframe
        class="github repo-link github-leaf"
        src="https://ghbtns.com/github-btn.html?user=leafsphp&amp;repo=leaf&amp;type=star&amp;count=true&amp;"
        allowtransparency="true"
        frameborder="0"
        scrolling="0"
        width="100"
        height="20"
      ></iframe>
    </div>
  </aside>
</template>

<script>
import SidebarLinks from '@theme/components/SidebarLinks.vue'
import NavLinks from '@theme/components/NavLinks.vue'

export default {
  name: 'Aside',

  components: { SidebarLinks, NavLinks },

  props: ['items', 'type']
}
</script>

<style lang="stylus">
.sidebar
  background rgb(0, 30, 38) !important
  color #fff
  ul
    padding 0
    margin 0
    list-style-type none
  a
    display inline-block
  .nav-links
    display none
    border-bottom 1px solid $borderColor
    padding 0.5rem 0 0.75rem 0
    a
      font-weight 600
    .nav-item, .repo-link
      display block
      line-height 1.25rem
      font-size 1.1em
      padding 0.5rem 0 0.5rem 1.5rem
  & > .sidebar-links
    padding 1.5rem 0
    & > li > a.sidebar-link
      font-size 1.1em
      line-height 1.7
      font-weight bold
    & > li:not(:first-child)
      margin-top .75rem

  .leaf-links
    display: flex
    flex-direction column

    *
      margin-left 40px

    *:not(:first-child)
      margin-top: 20px

.sidebar.-right
  padding-bottom: 50px

@media (max-width: $MQMobile)
  .sidebar
    .nav-links
      display block
      .dropdown-wrapper .nav-dropdown .dropdown-item a.router-link-active::after
        top calc(1rem - 2px)
    & > .sidebar-links
      padding 1rem 0
</style>
