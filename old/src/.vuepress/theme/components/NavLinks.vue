<template>
  <nav v-if="userLinks.length || repoLink" class="nav-links">
    <!-- user links -->
    <div v-for="item in userLinks" :key="item.link" class="nav-item">
      <DropdownLink v-if="item.type === 'links'" :item="item" />
      <NavLink v-else :item="item" />
    </div>

    <div style="display:flex;" class="nav-item">
      <a
        target="_blank"
        href="https://github.com/leafsphp/leaf/tree/v3.x-dev"
        class="action-icon github-link nav-item"
      >
        <GitHub class="icon-container" h="23" w="23" />
      </a>
      <a target="_blank" href="https://twitter.com/leafphp" class="action-icon nav-item">
        <Twitter class="icon-container" h="23" w="23" />
      </a>
      <Moon v-if="!isDark" @click.native="toggleMode" class="action-icon icon-container nav-item" h="23" w="23" />
      <Sun v-else @click.native="toggleMode" class="action-icon icon-container nav-item" h="23" w="23" />
    </div>
  </nav>
</template>

<script>
import DropdownLink from '@theme/components/DropdownLink.vue'
import { resolveNavLinkItem } from '../util'
import NavLink from '@theme/components/NavLink.vue'
import GitHub from 'vue-ionicons/dist/js/logo-github'
import Twitter from 'vue-ionicons/dist/js/logo-twitter'
import Moon from 'vue-ionicons/dist/js/ios-moon'
import Sun from 'vue-ionicons/dist/js/ios-sunny'

export default {
  name: 'NavLinks',

  components: {
    NavLink,
    DropdownLink,
    GitHub,
    Twitter,
    Moon,
    Sun
  },

  data() {
    return {
      isDark: false,
    };
  },

  methods: {
    toggleMode() {
      const body = document.body;
      const isLight = Array(...body.classList).includes("-light");
      console.log(window.localStorage["isDark"]);
      window.localStorage["isDark"] = isLight;
      this.isDark = isLight;

      console.log(isLight, window.localStorage["isDark"]);

      if (isLight) {
        body.classList.remove("-light");
      } else {
        body.classList.add("-light");
      }
    },
  },

  computed: {
    userNav() {
      return this.$themeLocaleConfig.nav || this.$site.themeConfig.nav || []
    },

    nav() {
      const { locales } = this.$site
      if (locales && Object.keys(locales).length > 1) {
        const currentLink = this.$page.path
        const routes = this.$router.options.routes
        const themeLocales = this.$site.themeConfig.locales || {}
        const languageDropdown = {
          text: this.$themeLocaleConfig.selectText || 'Languages',
          ariaLabel: this.$themeLocaleConfig.ariaLabel || 'Select language',
          items: Object.keys(locales).map((path) => {
            const locale = locales[path]
            const text =
              (themeLocales[path] && themeLocales[path].label) || locale.lang
            let link
            // Stay on the current page
            if (locale.lang === this.$lang) {
              link = currentLink
            } else {
              // Try to stay on the same page
              link = currentLink.replace(this.$localeConfig.path, path)
              // fallback to homepage
              if (!routes.some((route) => route.path === link)) {
                link = path
              }
            }
            return { text, link }
          }),
        }
        return [...this.userNav, languageDropdown]
      }
      return this.userNav
    },

    userLinks() {
      return (this.nav || []).map((link) => {
        return Object.assign(resolveNavLinkItem(link), {
          items: (link.items || []).map(resolveNavLinkItem),
        })
      })
    },

    repoLink() {
      const { repo } = this.$site.themeConfig
      if (repo) {
        return /^https?:/.test(repo) ? repo : `https://github.com/${repo}`
      }
      return null
    },

    repoLabel() {
      if (!this.repoLink) return
      if (this.$site.themeConfig.repoLabel) {
        return this.$site.themeConfig.repoLabel
      }

      const repoHost = this.repoLink.match(/^https?:\/\/[^/]+/)[0]
      const platforms = ['GitHub', 'GitLab', 'Bitbucket']
      for (let i = 0; i < platforms.length; i++) {
        const platform = platforms[i]
        if (new RegExp(platform, 'i').test(repoHost)) {
          return platform
        }
      }

      return 'Source'
    },
  },
}
</script>

<style lang="stylus">
.nav-links {
  display: flex;
  align-items: center;
  color: $textColorPrimary !important;

  .icon-container {
    display: flex !important;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    svg {
      fill: #e4e4e7;
    }

    svg:hover {
      fill: white;
    }
  }

  .github {
    margin-bottom: -5px;
  }

  a {
    line-height: 1.4rem;
    color: inherit;
    font-weight: 500;

    &:hover, &.router-link-active {
      color: $accentColor;
    }
  }

  .nav-item {
    position: relative;
    display: inline-block;
    margin-left: 1.5rem;
    line-height: 2rem;

    .dropdown-wrapper {
      height: unset !important;
    }

    ul {
      background-color: darken(#082936, 30%) !important;
      border: 1px solid #082936;
    }

    span, li, a {
      color: #fff !important;
    }

    &:first-child {
      margin-left: 0;
    }
  }

  .repo-link {
    margin-left: 1.5rem;
    color: #fff !important;
  }
}

@media (max-width: $MQMobile) {
  .nav-links {
    .nav-item, .repo-link {
      margin-left: 0;
    }
  }
}

@media (min-width: $MQMobile) {
  .nav-links a {
    color: $textColor;

    &:hover, &.router-link-active {
      color: $textColor;
    }
  }

  .nav-item > a:not(.external) {
    &:hover, &.router-link-active {
      margin-bottom: -2px;
      border-bottom: 2px solid lighten($accentColor, 8%);
    }
  }
}
</style>
