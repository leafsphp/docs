<template>
  <div id="vs">
    <p>You’re browsing the documentation for v3.x.</p>
    &nbsp;
    <a href="https://archive.leafphp.dev" target="_blank" rel="noreferrer">Click here</a>
    &nbsp;for earlier leaf/mvc versions.
  </div>
</template>

<style lang="stylus">
@require '../styles/config'
$topBannerHeight ?= 5rem
$topBannerHeightMobile ?= 3.125rem

// Banner
#vs
  align-items: center
  background-color: darken($accentColor, 20%)
  box-sizing: border-box
  color: lighten($accentColor, 80%)
  display: none
  font-family "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
  justify-content: center
  font-size: 16px !important
  position: fixed
  padding: 0 10px
  left: 0
  right: 0
  top: 0
  z-index: 100
  height: $topBannerHeightMobile

  a
    color: #fff
    font-weight bold

  p
    display none

  @media (min-width: 680px)
    height: $topBannerHeightMobile

    p
      display block

  &:hover
    .vs-core
      .vs-button
        background: #f22606

// Show banner only if the container has class "has-top-banner"
.theme-container.has-top-banner
  #vs
    display: flex

// Add margin top to body, navbar and sidebar
.theme-container.has-top-banner
  margin-top: $topBannerHeightMobile
  .navbar
    margin-top: $topBannerHeightMobile
  .sidebar
    margin-top: $topBannerHeightMobile
@media (min-width: 680px)
  .theme-container.has-top-banner
    margin-top: $topBannerHeightMobile
    .navbar
      margin-top: $topBannerHeightMobile
    .sidebar
      margin-top: $topBannerHeightMobile

// Adjust titles margin and padding for anchor links
.theme-container.has-top-banner
  {$contentClass}:not(.custom) > h1,
  {$contentClass}:not(.custom) > h2,
  {$contentClass}:not(.custom) > h3
    margin-top (0.5rem - $navbarHeight - $topBannerHeightMobile)
    padding-top ($navbarHeight + 1rem + $topBannerHeightMobile)
    @media (min-width: 680px)
      margin-top (0.5rem - $navbarHeight - $topBannerHeight)
      padding-top ($navbarHeight + 1rem + $topBannerHeight)
</style>
