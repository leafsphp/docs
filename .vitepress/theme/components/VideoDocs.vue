<script setup lang="ts">
const { title, description, subject, link } = defineProps(['title', 'description', 'subject', 'link']);
</script>

<template>
  <div className="custom-block">
    <p className="custom-block-title">{{ title ?? 'Video Docs' }}</p>
    <p>{{ description }}</p>

    <section className="video-lesson">
      <a :href="link" target="_blank" rel="sponsored noopener" :title="subject">
        {{ subject }}
      </a>
    </section>
  </div>
</template>

<style scoped>
.video-lesson:before {
  content: 'play_circle_filled';
  font-family: 'Material Icons';
  font-size: 35px;
  display: inline-block;
  color: #73abfe;
  height: 35px !important;
  width: 35px !important;
  display: flex;
  justify-content: center;
  align-items: center;
  vertical-align: middle;
  margin-right: 10px;
}

.video-lesson,
.video-lesson a {
  color: #486491;
  position: relative;
}

.video-lesson {
  display: flex;
  align-items: center;
  background-color: #e7ecf3;
  padding: 1em 1.25em;
  border-radius: 2px;
  margin: 24px 0;
}

.video-lesson a:hover {
  text-decoration: underline;
}
</style>
