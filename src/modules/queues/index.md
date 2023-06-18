# Queues

<!-- markdownlint-disable no-inline-html -->

<script setup>
import VideoDocs from '/@theme/components/VideoDocs.vue'
</script>

During the development of your web application, there are tasks that can be time-consuming, such as parsing and storing a CSV file that has been uploaded. However, with Leaf, you have the advantage of easily creating queued jobs that can be processed in the background. By offloading these intensive tasks to a queue, your Leaf application can swiftly respond to web requests, resulting in improved speed and a better user experience for your customers.

<VideoDocs
  title="New to Queues/Jobs/Workers?"
  subject="Understanding queues & background processing"
  description="Watch the this video by Mateus Guimarães"
  link="https://www.youtube.com/embed/GsdfZ5TfGPw"
/>

## Queues in Leaf PHP

Implementing a queuing system from scratch can be a daunting task, and can take a lot of time. For this reason, Leaf provides a unified API for using queues across a variety of different backends, such as Amazon SQS, BeanStalk, Redis, or your database.


