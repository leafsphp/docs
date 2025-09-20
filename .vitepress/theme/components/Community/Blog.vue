<script setup lang="ts">
import { ExternalLink, Calendar, User, Clock } from 'lucide-vue-next';
import Button from '../shared/Button.vue';

// Dummy blog posts data
const blogPosts = [
  {
    id: 2,
    title: 'September Recap: New in Leaf!',
    excerpt: 'It\'s been 6 months since we released Leaf 4 and Leaf MVC 4, and what a journey it\'s been! From new features to community growth, we\'ve been busy making Leaf the best framework for Makers. In this recap, we\'ll highlight some of the exciting developments and what\'s coming next. Let\'s dive in!',
    image: 'https://github.com/user-attachments/assets/9e97bc87-0cdc-4bc1-95e3-aeba4ab7788e',
    url: 'https://blog.leafphp.dev/posts/sep-2025-recap.html'
  },
  {
    id: 1,
    title: 'Build Your Next SaaS with PHP — In Hours, Not Days',
    excerpt: 'We\'ve been working on Leaf PHP, and building it into the perfect tool for makers and solo builders.If you’re looking to build fast and ship faster, Leaf might be the fastest way to launch your next SaaS — all with plain, elegant PHP that scales with you.',
    image: 'https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fba2wnotxn1952b8am43b.jpg',
    url: 'https://dev.to/mychi_darko/build-your-next-saas-with-php-in-hours-not-days-30if'
  },
];
</script>

<template>
  <div class="flex justify-center items-center my-20">
    <section id="blog" class="blog-section w-full sm:!max-w-3xl lg:!max-w-5xl xl:!max-w-7xl !px-4 sm:!px-10 py-16">
      <div class="section-header flex flex-col justify-center items-center text-center mb-12">
        <h2 class="section-title mb-4 !border-none">Latest from Our Blog</h2>
        <p class="section-description max-w-2xl">
          At Leaf, we're focused on making PHP development as simple and elegant as possible.
          Our team is constantly improving the framework and its ecosystem—tune in as we share what's new and what's
          coming next.
        </p>
      </div>

      <div class="blog-grid">
        <div v-for="post in blogPosts" :key="post.id" class="blog-card">
          <div class="blog-card-image">
            <div class="image-placeholder" :style="{ backgroundImage: `url(${post.image})` }"></div>
          </div>
          <div class="blog-card-content">
            <h3 class="blog-card-title !mt-0">
              <a :href="post.url" target="_blank">{{ post.title }}</a>
            </h3>
            <p class="blog-card-excerpt">{{ post.excerpt }}</p>
            <a :href="post.url" target="_blank" class="blog-card-link">
              Read More
              <ExternalLink :size="14" />
            </a>
          </div>
        </div>
      </div>

      <div class="text-center mt-12">
        <Button as="a" class="!text-white" href="https://blog.leafphp.dev" target="_blank">
          <span>View All Articles</span>
          <ExternalLink height="18px" />
        </Button>
      </div>
    </section>
  </div>
</template>

<style scoped>
.blog-section {
  background: var(--vt-c-bg);
  transition: background-color 0.5s;
  padding: 80px 0;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--vt-c-text-1);
  margin-bottom: 1rem;
  transition: color 0.5s;
}

.section-description {
  font-size: 1.125rem;
  color: var(--vt-c-text-2);
  transition: color 0.5s;
  line-height: 1.6;
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 2rem;
  margin-top: 2rem;
}

@media (min-width: 640px) {
  .blog-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.blog-card {
  background: var(--vt-c-bg-soft);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid var(--vt-c-divider-light);
}

.dark .blog-card {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  border: 1px solid var(--vt-c-divider-dark);
}

.blog-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.dark .blog-card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}

.blog-card-image {
  height: 200px;
  overflow: hidden;
}

.image-placeholder {
  width: 100%;
  height: 100%;
  background-color: var(--vt-c-bg-mute);
  background-size: cover;
  background-position: center;
  transition: transform 0.3s ease;
}

.blog-card:hover .image-placeholder {
  transform: scale(1.05);
}

.blog-card-content {
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.blog-card-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  line-height: 1.4;
  color: var(--vt-c-text-1);
  transition: color 0.3s ease;
}

.blog-card-title a {
  color: inherit;
  text-decoration: none;
}

.blog-card-title a:hover {
  color: var(--vt-c-brand);
}

.blog-card-excerpt {
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--vt-c-text-2);
  margin-bottom: 1.5rem;
  flex-grow: 1;
}

.blog-card-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.25rem;
  font-size: 0.85rem;
  color: var(--vt-c-text-3);
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.blog-card-link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-weight: 500;
  color: var(--vt-c-brand);
  transition: color 0.3s ease;
  margin-top: auto;
  font-size: 0.95rem;
}

.blog-card-link:hover {
  color: var(--vt-c-brand-dark);
}
</style>
