<script setup lang="ts">
import Button from '../shared/Button.vue';
</script>

<template>
  <section id="newsletter" class="speak flex flex-col justify-center items-center !bg-[var(--vp-c-bg-alt)] !max-w-none">
    <div class="container">
      <div class="flex justify-center items-center">
        <div class="flex justify-center items-center rounded-full w-12 h-12 mb-2 bg-[var(--vp-c-bg)]">
          <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 352 512" height="20px"
            width="20px" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M176 352c53.02 0 96-42.98 96-96V96c0-53.02-42.98-96-96-96S80 42.98 80 96v160c0 53.02 42.98 96 96 96zm160-160h-16c-8.84 0-16 7.16-16 16v48c0 74.8-64.49 134.82-140.79 127.38C96.71 376.89 48 317.11 48 250.3V208c0-8.84-7.16-16-16-16H16c-8.84 0-16 7.16-16 16v40.16c0 89.64 63.97 169.55 152 181.69V464H96c-8.84 0-16 7.16-16 16v16c0 8.84 7.16 16 16 16h160c8.84 0 16-7.16 16-16v-16c0-8.84-7.16-16-16-16h-56v-33.77C285.71 418.47 352 344.9 352 256v-48c0-8.84-7.16-16-16-16z">
            </path>
          </svg>
        </div>
      </div>
      <h1 class="title">Invite us to speak at your next event</h1>
      <p class="help">
        Want a Leaf core team member to speak at your next event? Invite us to create a memorable and engaging
        experience for your attendees.
      </p>

      <div class="mt-5 text-center">
        <Button as="a" href="mailto:mychi.darko@gmail.com?subject=Invitation to speak at our next event" rel="noopener"
          target="_blank" class="!text-white m-auto">
          Reach out to us
        </Button>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* // old component. will refactor later */
.speak {
  padding: 32px 24px;
  transition: border-color 0.5s, background-color 0.5s;
  height: 70vh;
}

.dark .NewsLetter {
  background: var(--vt-c-bg);
}

@media (min-width: 768px) {
  .NewsLetter {
    padding: 48px 32px;
  }
}

.container {
  margin: 0 auto;
  max-width: 512px;
}

.title {
  text-align: center;
  font-size: 40px !important;
  line-height: 45px;
  font-weight: 700;
  transition: color 0.5s;
}

@media (min-width: 375px) {
  .title {
    font-size: 16px;
  }
}

.form {
  padding-top: 8px;
}

@media (min-width: 375px) {
  .form {
    padding-top: 16px;
  }
}

.box {
  position: relative;
  width: 100%;
}

.input {
  border: 1px solid var(--vt-c-divider);
  border-radius: 8px;
  padding: 11px 128px 11px 16px;
  font-size: 16px;
  width: 100%;
  color: var(--vt-c-text-1);
  transition: border-color 0.25s, background-color 0.25s;
}

.input:hover,
.input:focus {
  border-color: var(--vt-c-brand);
}

.input:focus {
  background-color: var(--vt-c-white);
}

.dark .input {
  background-color: var(--vt-c-bg);
}

.dark .input:focus {
  background-color: var(--vt-c-black-pure);
}

.input::placeholder {
  font-weight: 500;
  color: var(--vt-c-text-3);
  transition: color 0.25s;
}

.action {
  position: absolute;
  top: 6px;
  right: 6px;
}

.button {
  border-radius: 4px;
  padding: 0 12px;
  letter-spacing: 0.8px;
  line-height: 36px;
  font-size: 13px;
  font-weight: 500;
  color: var(--vt-c-text-dark-1);
  background-color: var(--vt-c-brand);
  transition: background-color 0.25s;
  cursor: pointer;
}

.button:hover {
  background-color: var(--vt-c-brand-dark);
}

.help {
  margin: 0 auto;
  padding: 8px;
  max-width: 480px;
  text-align: center;
  line-height: 20px;
  font-size: 12px;
  font-weight: 500;
  color: var(--vt-c-text-2);
  transition: color 0.5s;
}

@media (min-width: 375px) {
  .help {
    padding-top: 16px;
  }
}

.link {
  color: var(--vt-c-brand);
  transition: color 0.25s;
}

.link:hover {
  color: var(--vt-c-brand-dark);
}
</style>
