<template>
  <div
    class="theme-container"
    :class="pageClasses"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
  >
    <BannerTop v-if="shouldShowBanner" />

    <Navbar v-if="shouldShowNavbar" @toggle-sidebar="toggleSidebar" />

    <div class="sidebar-mask" @click="toggleSidebar(false)" />

    <Sidebar :items="sidebarItems" @toggle-sidebar="toggleSidebar">
      <template #top>
        <slot name="sidebar-top" />
      </template>
      <template #bottom>
        <slot name="sidebar-bottom" />
      </template>
    </Sidebar>

    <Home v-if="$page.frontmatter.home" />

    <Page v-else :sidebar-items="sidebarItems" :config="shouldShowAside === false ? '-noAside' : '-aside'">
      <template #top>
        <slot name="page-top" />
      </template>
      <template #bottom>
        <slot name="page-bottom" />
      </template>
    </Page>

    <Aside
      v-if="!$page.frontmatter.home && shouldShowAside"
      :items="asideItems"
      @toggle-sidebar="toggleSidebar"
      type="right"
    >
      <template #top>
        <slot name="sidebar-top" />
      </template>
      <template #bottom>
        <slot name="sidebar-bottom" />
      </template>
    </Aside>
  </div>
</template>

<script>
import Home from '@theme/components/Home.vue'
import Navbar from '@theme/components/Navbar.vue'
import Page from '@theme/components/Page.vue'
import Sidebar from '@theme/components/Sidebar.vue'
import Aside from '@theme/components/Aside.vue'
import BannerTop from '@theme/components/BannerTop.vue'
import { resolveSidebarItems, resolveAsideItems } from '../util'

export default {
  name: 'Layout',

  components: {
    Home,
    Page,
    Sidebar,
    Aside,
    Navbar,
    BannerTop,
  },

  data() {
    return {
      showTopBanner: false,
      isSidebarOpen: false,
    }
  },

  beforeMount() {
    const darkMode = window.localStorage["isDark"];
    const body = document.body;

    console.log((!this.$page.frontmatter.aside || (this.$page.frontmatter.aside && this.$page.frontmatter.aside !== 'none')));

    if (darkMode === "true") {
      body.classList.remove("-light");
    } else {
      body.classList.add("-light");
    }
  },

  computed: {
    shouldShowNavbar() {
      const { themeConfig } = this.$site
      const { frontmatter } = this.$page
      if (frontmatter.navbar === false || themeConfig.navbar === false) {
        return false
      }
      return (
        this.$title ||
        themeConfig.logo ||
        themeConfig.repo ||
        themeConfig.nav ||
        this.$themeLocaleConfig.nav
      )
    },

    shouldShowSidebar() {
      const { frontmatter } = this.$page
      return (
        !frontmatter.home &&
        frontmatter.sidebar !== false &&
        this.sidebarItems.length
      )
    },

    shouldShowAside() {
      return (!this.$page.frontmatter.aside || (this.$page.frontmatter.aside && this.$page.frontmatter.aside !== 'none'));
    },

    sidebarItems() {
      return resolveSidebarItems(
        this.$page,
        this.$page.regularPath,
        this.$site,
        this.$localePath
      )
    },

    asideItems() {
      return resolveAsideItems(
        this.$page,
        this.$page.regularPath,
        this.$site,
        this.$localePath
      )
    },

    shouldShowBanner() {
      return (
        this.$page.frontmatter.home &&
        (this.$page.frontmatter.topBanner || false)
      )
    },

    pageClasses() {
      const userPageClass = this.$page.frontmatter.pageClass
      return [
        {
          'no-navbar': !this.shouldShowNavbar,
          'sidebar-open': this.isSidebarOpen,
          'no-sidebar': !this.shouldShowSidebar,
          'has-top-banner': this.shouldShowBanner,
        },
        userPageClass,
      ]
    },
  },

  mounted() {
    this.$router.afterEach(() => {
      this.isSidebarOpen = false
    })

    this.showTopBanner = this.shouldShowBanner
  },

  methods: {
    toggleSidebar(to) {
      this.isSidebarOpen = typeof to === 'boolean' ? to : !this.isSidebarOpen
      this.$emit('toggle-sidebar', this.isSidebarOpen)
    },

    // side swipe
    onTouchStart(e) {
      this.touchStart = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY,
      }
    },

    onTouchEnd(e) {
      const dx = e.changedTouches[0].clientX - this.touchStart.x
      const dy = e.changedTouches[0].clientY - this.touchStart.y
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        if (dx > 0 && this.touchStart.x <= 80) {
          this.toggleSidebar(true)
        } else {
          this.toggleSidebar(false)
        }
      }
    },
  },
}
</script>

<style lang="scss">
* {
  transition: ease background .4s;
}

body.-light {
  background-color: white !important;
  color: rgb(12, 12, 12);

  h1, h2, h3, h4, h5, h6 {
    color: #003543 !important;
  }

  .section-features .feature h2 {
    border-bottom: none !important;
  }

  h2:not(.tagline) {
    border-bottom: 1px solid #cececf !important;
  }

  .search-box {
    background-color: transparent !important;

    input {
      background-color: transparent !important;
      color: #003543 !important;
      background: url('/icons/search.svg') 0.3rem 0.7rem no-repeat !important;
      background-size: 22px !important;
      background-position-y: 5px !important;
    }
  }

  .navbar {
    background: rgba($color: white, $alpha: 0.8) !important;

    .sidebar-button {
      .icon * {
        fill: black !important;
      }
    }

    a {
      span {
        color: #003543 !important;
      }
    }

    .nav-item {
      span, a {
        color: #003543 !important;
      }
    }

    .nav-dropdown {
      background-color: white !important;
      border-color: rgb(89, 89, 97) !important;
    }

    .dropdown-subitem-wrapper {
      background-color: white !important;
      border: none !important;
    }

    svg.ion__svg {
      fill: #003543 !important;
    }
  }

  .sidebar {
    background: white !important;
    color: #003543 !important;

    > .nav-links {
      * {
        color: #003543 !important;
        fill: #003543 !important;
      }
    }

    a {
      span {
        color: rgb(89, 89, 97) !important;

        &:hover {
          color: #42b983 !important;
        }
      }
    }

    &.-left {
      a {
        &.active {
          span {
            color: #42b983 !important;
            background: rgba($color: #42b983, $alpha: .2);
          }
        }
      }
    }

    &.-right {
      a.active {
        span {
          color: #42b983 !important;
        }
      }
    }
  }

  code {
    background: rgba($color: #42b983, $alpha: .1);
    font-weight: bold;
  }

  pre {
    code {
      font-weight: normal;
    }
  }

  a {
    font-weight: bold;
  }

  .custom-block {
    background-color: lighten(#012a35, 5%) !important;

    a {
      font-weight: normal;
    }
  }

  footer {
    &:not(.main-footer) {
      color: rgb(89, 89, 97) !important;
    }

    color: #fff !important;
  }
}
</style>
