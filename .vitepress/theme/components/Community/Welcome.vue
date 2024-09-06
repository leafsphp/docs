<script setup>
import Card from '../shared/Card.vue';

// import VueWriter from "vue-writer";
</script>

<template>
  <section class="flex flex-col justify-center items-center container py-40">
    <div class="text-center mb-12">
      <h1 class="flex justify-center text-center text-4xl font-bold mb-4">
        <vue-writer :array="['Hello, ', 'Hola, ', 'Bonjour, ', 'こんにちは, ', '你好, ', 'Olá, ']" /><span>welcome 👋</span>
      </h1>
      <p class="max-w-[700px] mb-4">
        The community is the heart of Leaf. Unlike other frameworks, we let the community drive the development of Leaf.
        This includes RFCs, feature requests, bug reports, and code contributions. We welcome all contributions, no
        matter how
        small. We believe that the community is the backbone of any successful project. We are grateful for your support
        and contributions. Together, we can build a better framework for everyone. 🌱
      </p>
      <p>Join us on GitHub, Discord, Twitter or YouTube</p>
    </div>

    <div class="grid grid-cols-4 gap-2 max-w-[850px]">
      <Card class="p-4 row-span-2 relative">
        <img src="/images/community/discord.png" class="rounded" alt="">
        <svg width="16" height="16" class="h-6 w-6 absolute right-6 top-6" viewBox="0 0 40 40" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <rect width="40" height="40" rx="10" fill="#5865F2"></rect>
          <mask id="mask0_4221_8593" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="8" y="8" width="24"
            height="24">
            <path d="M32 8H8V32H32V8Z" fill="white"></path>
          </mask>
          <g mask="url(#mask0_4221_8593)">
            <path
              d="M28.3303 12.2278C26.7768 11.5009 25.1155 10.9727 23.3789 10.6719C23.1656 11.0575 22.9164 11.5761 22.7446 11.9887C20.8985 11.7111 19.0693 11.7111 17.2572 11.9887C17.0854 11.5761 16.8306 11.0575 16.6154 10.6719C14.8768 10.9727 13.2138 11.5029 11.6602 12.2316C8.52664 16.9669 7.67719 21.5844 8.10192 26.1365C10.1803 27.6885 12.1944 28.6314 14.1746 29.2483C14.6635 28.5755 15.0995 27.8601 15.4752 27.1063C14.7598 26.8345 14.0745 26.4989 13.4271 26.1095C13.5988 25.9822 13.7669 25.8492 13.9292 25.7123C17.8782 27.5593 22.1689 27.5593 26.0707 25.7123C26.2349 25.8492 26.4029 25.9822 26.5729 26.1095C25.9235 26.5009 25.2364 26.8363 24.5209 27.1082C24.8966 27.8601 25.3308 28.5773 25.8216 29.2502C27.8037 28.6332 29.8197 27.6904 31.8979 26.1365C32.3963 20.8595 31.0466 16.2843 28.3303 12.2278ZM16.0132 23.337C14.8277 23.337 13.8555 22.2303 13.8555 20.8826C13.8555 19.535 14.807 18.4264 16.0132 18.4264C17.2194 18.4264 18.1916 19.533 18.1708 20.8826C18.1727 22.2303 17.2194 23.337 16.0132 23.337ZM23.9867 23.337C22.8012 23.337 21.8291 22.2303 21.8291 20.8826C21.8291 19.535 22.7805 18.4264 23.9867 18.4264C25.1929 18.4264 26.1652 19.533 26.1444 20.8826C26.1444 22.2303 25.1929 23.337 23.9867 23.337Z"
              fill="white"></path>
          </g>
        </svg>

        <h3 class="font-bold mt-4">Leaf World 🍁 on Discord</h3>
        <p class="text-sm">Join our Discord server to connect with the team and other users.</p>
      </Card>
      <Card class="p-4">
        <svg width="16" height="16" class="h-6 w-6" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="40" height="40" rx="10" fill="#55ACEE"></rect>
          <mask id="mask0_920_2751" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="8" y="10" width="24"
            height="20">
            <path d="M31.9309 10.2326H8V29.6807H31.9309V10.2326Z" fill="white"></path>
          </mask>
          <g mask="url(#mask0_920_2751)">
            <path
              d="M31.9309 12.5347C31.0506 12.9253 30.1043 13.1891 29.1112 13.3078C30.1248 12.7002 30.9034 11.7381 31.27 10.5915C30.3211 11.1543 29.2704 11.5628 28.152 11.7829C27.2565 10.8287 25.9806 10.2326 24.5684 10.2326C21.857 10.2326 19.6586 12.4307 19.6586 15.1421C19.6586 15.5269 19.702 15.9017 19.7858 16.261C15.7053 16.0563 12.0876 14.1016 9.66603 11.1312C9.24342 11.8563 9.00123 12.6996 9.00123 13.5994C9.00123 15.3028 9.86801 16.8056 11.1854 17.686C10.3806 17.6605 9.62356 17.4396 8.96163 17.0719C8.96107 17.0924 8.96107 17.113 8.96107 17.1337C8.96107 19.5124 10.6535 21.4967 12.8995 21.948C12.4876 22.0602 12.0538 22.1202 11.606 22.1202C11.2897 22.1202 10.9822 22.0893 10.6823 22.032C11.3071 23.9826 13.1203 25.4021 15.2688 25.4416C13.5885 26.7585 11.4716 27.5434 9.17118 27.5434C8.77489 27.5434 8.38409 27.5201 8 27.4747C10.1728 28.8679 12.7535 29.6807 15.5262 29.6807C24.5569 29.6807 29.4955 22.1995 29.4955 15.7113C29.4955 15.4985 29.4906 15.2868 29.4813 15.0761C30.4404 14.384 31.2727 13.5194 31.9309 12.5347Z"
              fill="white"></path>
          </g>
        </svg>

        <h3 class="font-bold mt-2">@leafphp on X</h3>
        <p class="text-sm">Follow us on X to keep up with all the latest news and updates.</p>
      </Card>
      <Card class="p-4">
        <svg width="16" height="16" class="h-6 w-6" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="40" height="40" rx="10" fill="black"></rect>
          <g clip-path="url(#clip0_920_2749)">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M20 8C13.37 8 8 13.37 8 20C8 25.31 11.435 29.795 16.205 31.385C16.805 31.49 17.03 31.13 17.03 30.815C17.03 30.53 17.015 29.585 17.015 28.58C14 29.135 13.22 27.845 12.98 27.17C12.845 26.825 12.26 25.76 11.75 25.475C11.33 25.25 10.73 24.695 11.735 24.68C12.68 24.665 13.355 25.55 13.58 25.91C14.66 27.725 16.385 27.215 17.075 26.9C17.18 26.12 17.495 25.595 17.84 25.295C15.17 24.995 12.38 23.96 12.38 19.37C12.38 18.065 12.845 16.985 13.61 16.145C13.49 15.845 13.07 14.615 13.73 12.965C13.73 12.965 14.735 12.65 17.03 14.195C17.99 13.925 19.01 13.79 20.03 13.79C21.05 13.79 22.07 13.925 23.03 14.195C25.325 12.635 26.33 12.965 26.33 12.965C26.99 14.615 26.57 15.845 26.45 16.145C27.215 16.985 27.68 18.05 27.68 19.37C27.68 23.975 24.875 24.995 22.205 25.295C22.64 25.67 23.015 26.39 23.015 27.515C23.015 29.12 23 30.41 23 30.815C23 31.13 23.225 31.505 23.825 31.385C28.565 29.795 32 25.295 32 20C32 13.37 26.63 8 20 8Z"
              fill="white"></path>
          </g>
          <defs>
            <clipPath id="clip0_920_2749">
              <rect width="24" height="24" fill="white" transform="translate(8 8)"></rect>
            </clipPath>
          </defs>
        </svg>

        <h3 class="font-bold mt-2">Leaf PHP on GitHub</h3>
        <p class="text-sm">Star our GitHub repo, start a discussion, send in a PR, ...</p>
      </Card>
      <Card class="p-4">
        <img src="/logo-circle.png" alt="LeafPHP Logo" class="w-6 h-6 rounded-full">

        <h3 class="font-bold mt-2">Leaf PHP Blog</h3>
        <p class="text-sm">Read our blog to keep up with updates from the Leaf team.</p>
      </Card>
      <!-- <Card class="p-4">
        Hello something
      </Card>
      <Card class="p-4">
        Hello something
      </Card> -->
      <Card class="p-4">
        <svg width="16" height="16" class="h-6 w-6" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="40" height="40" rx="10" fill="#FF0000"></rect>
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M29.3766 12.5016C30.4093 12.7775 31.2225 13.5907 31.4986 14.6233L31.4985 14.6234C32 16.495 32 20.4001 32 20.4001C32 20.4001 32 24.305 31.4985 26.1768C31.2224 27.2094 30.4092 28.0225 29.3765 28.2986C27.505 28.8 19.9999 28.8 19.9999 28.8C19.9999 28.8 12.4949 28.8 10.6233 28.2986C9.59065 28.0224 8.77727 27.2094 8.50144 26.1767C8 24.3049 8 20.4 8 20.4C8 20.4 8 16.4949 8.50144 14.6233C8.77727 13.5907 9.59065 12.7775 10.6234 12.5016C12.495 12 20 12 20 12C20 12 27.5051 12 29.3766 12.5016ZM24.4429 20.6931L17.6001 24.5857V16.8L24.4429 20.6931Z"
            fill="white"></path>
        </svg>

        <h3 class="font-bold mt-2">@leafphp on YouTube</h3>
        <p class="text-sm">Subscribe to our YouTube channel.</p>
      </Card>
      <Card class="p-4 col-span-2">
        <img src="/logo-circle.png" alt="LeafPHP Logo" class="w-6 h-6 rounded-full">

        <p class="text-sm mt-2">
          Contribute to Leaf, Hana or Naytive. We welcome all contributions, no matter how small. Your code can help
          make Leaf better for everyone.
        </p>
      </Card>
    </div>
  </section>
</template>
