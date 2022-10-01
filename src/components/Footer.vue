<script setup>
import SchoolIcon from 'vue-material-design-icons/School.vue';
import GithubIcon from 'vue-material-design-icons/Github.vue';
import TwitterIcon from 'vue-material-design-icons/Twitter.vue';
import InstagramIcon from 'vue-material-design-icons/Instagram.vue';
import LinkedinIcon from 'vue-material-design-icons/Linkedin.vue';
</script>

<template>
  <footer class="body-font text-gray-500">
    <div class="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
      <a class="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
        <SchoolIcon class="w-10 h-10 p-2 bg-green-500 rounded-full text-white" />
        <span class="ml-3 text-xl">Valrose Docs</span>
      </a>
      <p class="text-sm sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
        © 2022 Axel LOPEZ —
        <a href="https://www.linkedin.com/in/hevel/" class="text-gray-600 ml-1" rel="noopener noreferrer"
          target="_blank">
          Hevel
        </a>
      </p>
      <span class="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
        <a class="ml-3" href="https://github.com/orgs/ValroseDocs/repositories" rel="noopener noreferrer" target="_blank">
          <GithubIcon class="w-5 h-5" />
        </a>
        <a class="ml-3" href="https://twitter.com/RhevelMc" rel="noopener noreferrer" target="_blank">
          <TwitterIcon class="w-5 h-5" />
        </a>
        <a class="ml-3" href="https://www.instagram.com/hevelmc/" rel="noopener noreferrer" target="_blank">
          <InstagramIcon class="w-5 h-5" />
        </a>
        <a class="ml-3" href="https://www.linkedin.com/in/hevel/" rel="noopener noreferrer" target="_blank">
          <LinkedinIcon class="w-5 h-5" />
        </a>
      </span>
    </div>
  </footer>
</template>