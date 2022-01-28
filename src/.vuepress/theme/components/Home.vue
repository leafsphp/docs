<template>
  <main class="home" aria-labelledby="main-title">
    <div class="main-content">
      <header class="hero">
        <div class="inner">
          <div class="left">
            <img
              v-if="data.heroImage"
              :src="$withBase(data.heroImage)"
              :alt="data.heroAlt || 'hero'"
            />
          </div>

          <div class="right">
            <h1 id="main-title">{{ data.heroText || 'Leaf PHP' }}</h1>

            <h2 class="tagline" v-if="tagline" v-html="tagline"></h2>

            <div v-if="data.actionButtons.length" class="actions">
              <HomeActionLink
                v-for="item in data.actionButtons"
                :item="item"
                :extra-class="item.extraClass"
                :key="item.link"
              />
            </div>
          </div>
        </div>
      </header>

      <section id="special-sponsor" v-if="data.sponsor">
        <span>Special Sponsor</span>
        <a href="#">
          <picture>
            <source type="image/png" srcset="/logo-circle.png" />
            <img alt="logo" width="97" height="36" src="/logo-circle.png" />
          </picture>
        </a>
        <span>Something</span>
      </section>

      <section
        v-if="data.features && data.features.length"
        class="section-features"
      >
        <div class="inner">
          <div
            v-for="(feature, index) in data.features"
            :key="index"
            class="feature"
          >
            <h2>{{ feature.title }}</h2>
            <p v-html="feature.details"></p>
          </div>
        </div>
      </section>


    </div>

    <section class="section-new section-features px-md-up:20">
      <Content class="theme-default-content custom" />
    </section>

    <section
      class="section-sponsors"
      :class="{ active: sponsorsActive }"
      ref="sponsors"
    >
      <div class="inner">
        <OpenCollectiveSponsors />
      </div>
    </section>

    <footer class="main-footer">
      <p v-if="data.socialIcons">
        <SocialIcon
          v-for="icon in data.socialIcons"
          :type="icon.type"
          :link="icon.link"
          :key="icon.link"
          extra-class="inverted"
        />
      </p>
      <p class="copyright" v-html="data.footer"></p>
    </footer>
  </main>
</template>

<script>
import HomeActionLink from '@theme/components/ui/HomeActionLink.vue'
import SocialIcon from '@theme/components/ui/SocialIcon.vue'
import OpenCollectiveSponsors from '@theme/components/sponsors/OpenCollectiveSponsors.vue'

export default {
  components: {
    HomeActionLink,
    SocialIcon,
    OpenCollectiveSponsors,
  },

  data: () => ({
    sponsorsActive: false,
  }),

  computed: {
    data() {
      return this.$page.frontmatter
    },

    tagline() {
      return (
        this.data.tagline ||
        this.$description ||
        'The Progressive JavaScript Framework'
      )
    },
  },

  mounted() {
    window.addEventListener('scroll', this.onPageScroll)
  },

  beforeDestroy() {
    window.removeEventListener('scroll', this.onPageScroll)
  },

  methods: {
    onPageScroll() {
      const sponsorTop = this.$refs.sponsors.offsetTop

      this.sponsorsActive = window.pageYOffset > sponsorTop - 100
    },
  },
}
</script>

<style lang="scss">
@import '@theme/styles/_settings.scss';
@import '~449.css/scss/';

h2 {
  margin-bottom: 10px !important;
}

.badge {
  padding: 0 6px !important;
  border-left-width: 0 !important;
  margin-left: 0.5rem !important;
}

@include sm-down {
  .vt-box-container {
    margin-top: 10px;
    flex-direction: column;

    > * {
      display: block;
      margin-top: 10px !important;
    }

    .vt-box:not(:first-child):not(:last-child) {
      margin: 0px;
    }
  }
}

.home {
  font-family: $fontHome;

  .section-new {
    padding-top: 200px;
    padding-bottom: 200px;

    h1 {
      margin-bottom: 20px;
    }

    p {
      @extend .my\:_2;
    }
  }
}

.main-content {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .theme-default-content {
    width: 100%;

    div.language-php {
      width: 100%;
      max-width: 500px !important;
      margin: 50px auto 150px auto;
    }
  }
}

.hero {
  padding: 100px 0px;
  width: 100%;

  html.with-beta-banner & {
    padding-top: calc(100px + 3rem);
  }

  a.nav-link:hover {
    &:not(.external) {
      background-color: #42b983 !important;
      color: white;
    }

    &.external {
      border-color: #4f5959 !important;
      background-color: #4f5959 !important;
      color: white !important;
    }
  }

  .inner {
    max-width: 1260px;
    margin: 50px auto;
    display: flex;
    align-items: flex-start;
    justify-content: center;
  }

  .left {
    width: 39%;
    text-align: right;

    img {
      width: 215px;
      height: 215px;
      margin-right: 60px;
    }
  }

  .actions {
    display: flex;
    margin-top: 2.3rem;
  }

  .right {
    width: 61%;

    h1 {
      font-size: 60px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
        Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      background: -webkit-linear-gradient(315deg, #42d392 5%, #647eff);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-weight: 800;
      margin: 0;
    }

    .tagline {
      padding: 0;
      margin: 0;
      border-bottom: 0;
      font-weight: 300;
    }
  }

  @media (max-width: $MQNarrow) {
    .inner {
      flex-direction: column;
      text-align: center;
    }

    .left {
      img {
        margin-right: 0;
      }
    }

    .left,
    .right {
      width: 100%;
      text-align: center;
    }

    .right {
      h1 {
        display: block;
      }

      .tagline {
        font-size: 2rem;
      }
    }

    .actions {
      flex-direction: column;
      place-items: center;

      a {
        height: 28px;
        margin-bottom: 10px;
      }
    }
  }
}

#special-sponsor {
  padding: 12px 24px;
  text-align: center;
  margin-top: -70px !important;
  margin-bottom: 20px !important;
  background: linear-gradient(315deg, darken(#42d392, 20%) 25%, #647eff);
  border-radius: 4px;

  span {
    font-weight: 500;
    font-size: 13px;
    vertical-align: middle;
    margin: 0 10px;
  }

  img {
    display: inline-block;
    vertical-align: middle;
    height: 36px;
    width: 40px;
    // filter: grayscale(1) invert(1);
  }
}

.section-features {
  padding: 25px 40px 45px;

  .inner {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    align-content: stretch;
    justify-content: space-between;
    max-width: 900px;
    margin: 0 auto;
    text-align: center;

    @media (max-width: $MQNarrow) {
      flex-direction: column;
    }
  }

  .feature {
    h2 {
      border-bottom: 0;
      color: $green;
      font-weight: 400;
    }

    flex-grow: 1;
    flex-basis: 30%;
    max-width: 30%;

    @media (max-width: $MQNarrow) {
      max-width: 100%;
      width: 100%;

      &::before {
        content: '—';
        color: $green;
      }
    }
  }
}

.section-sponsors {
  background: #f6f6f6;
  text-align: center;
  padding: 35px 40px 45px;

  &.active {
    img {
      filter: none;
      opacity: 1;
    }
  }

  .inner {
    max-width: 700px;
    margin: 0 auto;
    color: rgb(44, 62, 80) !important;
  }

  .sponsors + .sponsors {
    margin-top: 5rem;
  }

  a {
    display: inline-block;
    vertical-align: middle;
    margin: 20px 15px 0;
    position: relative;
  }

  img {
    transition: all 0.3s ease;
    filter: grayscale(100%);
    opacity: 0.6;

    &:hover {
      filter: none;
      opacity: 1;
    }
  }
}

footer.main-footer {
  background: #475050;
  text-align: center;
  color: #fff;
  padding: 40px 0;
  font-size: 0.9rem;

  a {
    color: #fff;
  }

  .social-icon {
    margin: 0 5px;
    font-size: 1.2rem;

    i {
      color: #fff;
    }
  }
}
</style>
