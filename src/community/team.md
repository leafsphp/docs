---
sidebar: false
layout: page
title: Meet the Team
---

<!-- markdownlint-disable no-inline-html -->

<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers,
  VPTeamPageSection
} from 'vitepress/theme';

const coreMembers = [
  {
    name: 'Michael Darko',
    title: 'Creator/Maintainer',
    avatar: 'https://www.github.com/mychidarko.png',
    projects: [
      {
        'label': 'leafsphp/*',
        'url': 'https://www.github.com/leafsphp'
      }
    ],
    location: 'Ghana',
    languages: ['English'],
    links: [
      { icon: 'github', link: 'https://github.com/mychidarko' },
      { icon: 'twitter', link: 'https://twitter.com/mychidarko' }
    ],
    sponsor: false
  },
  {
    name: 'Abdulbasit Rubeya',
    title: 'Developer/Maintainer',
    avatar: 'https://avatars.githubusercontent.com/u/28471267?v=4',
    projects: [
      {
        'label': 'leafsphp',
        'url': 'https://www.github.com/leafsphp'
      }
    ],
    location: 'Tanzania',
    languages: ['English', 'Swahili', 'Arabic'],
    links: [
      { icon: 'github', link: 'https://github.com/ibnsultan' },
      { icon: 'linkedin', link: 'https://linkedin.com/in/abdulbasit-rubeiyya' }
    ],
    sponsor: false
  },
];

const moderators = [];

const former = [
  {
    name: "André Rosa",
    title: "Developer",
    avatar: "https://github.com/crosa7.png",
    projects: [
      {
        label: "leafsphp/*",
        url: "https://www.github.com/leafsphp"
      }
    ],
    location: "Portugal",
    languages: ["Portuguese", "English"],
    links: [
      { icon: 'github', link: 'https://github.com/crosa7' },
      { icon: 'twitter', link: 'https://twitter/andre_crosa' }
    ],
    sponsor: false
  },
  {
    name: "Ashley Nyanteh",
    title: "Community Manager",
    avatar: "https://user-images.githubusercontent.com/26604242/221550910-1a711f42-9589-4981-96e0-d0de19778e7a.png",
    projects: [
      {
        label: "Leaf PHP Community",
        url: "https://bento.me/leafphp"
      }
    ],
    location: "Ghana",
    languages: ["English"],
    links: [
      { icon: 'linkedin', link: 'https://linkedin.com/in/ashley-bruwah-nyanteh-1811691b4' },
      { icon: 'twitter', link: 'https://twitter.com/ashleybruwaa' }
    ],
    sponsor: false
  }
];
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>Our Team</template>
    <template #lead>Core team members are those who are actively involved in the maintenance of one or more core projects. They have made significant contributions to the Leaf ecosystem, with a long term commitment to the success of the project and its users.</template>
  </VPTeamPageTitle>
  <VPTeamMembers size="medium" :members="coreMembers" />

  <VPTeamPageSection v-if="!!moderators.length">
    <template #title>Community Moderators</template>
    <template #lead>
      Community moderators are volunteers who help maintain the community and keep it a friendly and welcoming place for everyone.
    </template>
    <template #members>
      <VPTeamMembers size="small" :members="moderators" />
    </template>
  </VPTeamPageSection>

  <VPTeamPageSection>
    <template #title>Former core team members</template>
    <template #lead>
      Here we honor some no-longer-active core team members who have made valuable contributions in the past.
    </template>
    <template #members>
      <VPTeamMembers size="small" :members="former" />
    </template>
  </VPTeamPageSection>
</VPTeamPage>
