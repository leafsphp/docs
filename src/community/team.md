---
sidebar: false
layout: page
title: Meet the Team
---

<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers,
  VPTeamPageSection
} from 'vitepress/theme';

const coreMembers = [
  {
    avatar: 'https://www.github.com/yyx990803.png',
    name: 'Evan You',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/yyx990803' },
      { icon: 'twitter', link: 'https://twitter.com/youyuxi' }
    ]
  },{
    avatar: 'https://www.github.com/yyx990803.png',
    name: 'Evan You',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/yyx990803' },
      { icon: 'twitter', link: 'https://twitter.com/youyuxi' }
    ]
  },{
    avatar: 'https://www.github.com/yyx990803.png',
    name: 'Evan You',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/yyx990803' },
      { icon: 'twitter', link: 'https://twitter.com/youyuxi' }
    ]
  },{
    avatar: 'https://www.github.com/yyx990803.png',
    name: 'Evan You',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/yyx990803' },
      { icon: 'twitter', link: 'https://twitter.com/youyuxi' }
    ]
  },
];

const moderators = [
  {
    avatar: 'https://www.github.com/yyx990803.png',
    name: 'Evan You',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/yyx990803' },
      { icon: 'twitter', link: 'https://twitter.com/youyuxi' }
    ]
  },
];
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>Our Team</template>
    <template #lead>Core team members are those who are actively involved in the maintenance of one or more core projects. They have made significant contributions to the Leaf ecosystem, with a long term commitment to the success of the project and its users.</template>
  </VPTeamPageTitle>
  <VPTeamMembers size="medium" :members="coreMembers" />

  <VPTeamPageSection>
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
      <VPTeamMembers size="small" :members="moderators" />
    </template>
  </VPTeamPageSection>
</VPTeamPage>
