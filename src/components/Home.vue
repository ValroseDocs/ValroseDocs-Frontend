<script setup>
  import { ref } from "vue";
  import CalendarIcon from 'vue-material-design-icons/Calendar.vue';
  import FolderIcon from 'vue-material-design-icons/Folder.vue';
  import FileCheckIcon from 'vue-material-design-icons/FileCheck.vue';
  import InformationIcon from 'vue-material-design-icons/Information.vue';
  import SkeletonCard from './SkeletonCard.vue';

  const data = ref(null);
  const currentData = ref(null);
  const loading = ref(true);
  const error = ref(null);
  const step1 = ref(null);
  const step2 = ref(null);

  async function fetchData() {
    loading.value = true;
    return fetch('https://valrose.hevel.tech/api/get_data', {
      method: 'get',
      headers: {
        'content-type': 'application/json',
      }
    })
      .then(res => {
        if (!res.ok) {
          const error = new Error(res.statusText);
          error.json = res.json();
          throw error;
        }
        return res.json();
      })
      .then(json => {
        data.value = json;
        currentData.value = json;
      })
      .catch(err => {
        error.value = err;
        if (err.json) {
          return err.json.then(json => {
            error.value.message = json.message;
          });
        }
      })
      .then(() => {
        loading.value = false;
      });
  }

  function changeStep(id, url) {
    console.log(step1.value);
    console.log(step2.value);
    console.log(id);
    console.log(url);
    if (step1.value == null) {
      step1.value = id;
      currentData.value = data.value.filter(item => item.id == id)[0]["children"];
    } else if (step2.value == null) {
      step2.value = id;
      currentData.value = currentData.value.filter(item => item.id == id)[0]["children"];
    } else {
      // we open the url in a new tab
      window.open(url, '_blank');
    }
  }

  function getBackStep(step) {
    if (step == 1) {
      step1.value = null;
      step2.value = null;
      currentData.value = data.value;
    } else if (step == 2) {
      step2.value = null;
      currentData.value = data.value.filter(item => item.id == step1.value)[0]["children"];
    }
  }

  fetchData();
</script>


<template>
  <section class="text-gray-600 body-font h-full">
    <div class="container px-5 mx-auto flex flex-wrap h-full">
      <div class="flex flex-wrap w-full h-full">
        <div class="lg:w-2/5 md:w-1/2 max-h-screen flex">
          <div class="md:pr-10 md:py-6 my-auto">
            <div :class="'flex relative pb-12 ' + (step1 != null ? 'cursor-pointer' : 'cursor-default')" v-on:click="getBackStep(1)">
              <div class="h-full w-10 absolute inset-0 flex items-center justify-center">
                <div class="h-full w-1 bg-gray-200 pointer-events-none" />
              </div>
              <div class="flex-shrink-0 w-10 h-10 rounded-full bg-green-500 inline-flex items-center justify-center text-white relative z-10">
                <CalendarIcon />
              </div>
              <div class="flex-grow pl-4">
                <h2 class="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">PREMIÈRE ÉTAPE</h2>
                <p class="leading-relaxed">Choisis ton semestre</p>
              </div>
            </div>
            <div :class="'flex relative pb-12 ' + (step2 != null ? 'cursor-pointer' : 'cursor-default')" v-on:click="getBackStep(2)">
              <div class="h-full w-10 absolute inset-0 flex items-center justify-center">
                <div class="h-full w-1 bg-gray-200 pointer-events-none" />
              </div>
              <div :class="'flex-shrink-0 w-10 h-10 rounded-full inline-flex items-center justify-center text-white relative z-10 ' + (step1 == null ? 'bg-green-100' : 'bg-green-500')">
                <FolderIcon />
              </div>
              <div class="flex-grow pl-4">
                <h2 :class="'font-medium title-font text-sm text-gray-900 mb-1 tracking-wider ' + (step1 == null ? 'opacity-20' : '')">DEUXIÈME ÉTAPE</h2>
                <p :class="'leading-relaxed ' + (step1 == null ? 'opacity-20' : '')">Choisis ton unité d'enseignement</p>
              </div>
            </div>
            <div class="flex relative cursor-default">
              <div :class="'flex-shrink-0 w-10 h-10 rounded-full inline-flex items-center justify-center text-white relative z-10 ' + (step2 == null ? 'bg-green-100' : 'bg-green-500')">
                <FileCheckIcon />
              </div>
              <div class="flex-grow pl-4">
                <h2 :class="'font-medium title-font text-sm text-gray-900 mb-1 tracking-wider ' + (step2 == null ? 'opacity-20' : '')">DERNIÈRE ÉTAPE</h2>
                <p :class="'leading-relaxed ' + (step2 == null ? 'opacity-20' : '')">Choisis le document que tu veux</p>
              </div>
            </div>
          </div>
        </div>
        <div class="lg:w-3/5 md:w-1/2 object-cover object-center rounded-lg my-auto" alt="step">
          <div class="flex p-4 md:mb-4 mb-8 mx-8 lg:mx-16 text-sm text-orange-700 bg-orange-100 rounded-lg" role="alert">
            <InformationIcon class="mr-6 my-auto w-5 h-5" />
            <span class="sr-only">Info</span>
            <div>
              <span class="font-medium text-[16px]">Attention</span> Ces documents sont mes notes personnelles et en aucun cas les corrections officielles. Elles peuvent contenir des erreurs ou être incomplètes.
            </div>
          </div>
          <section class="text-gray-600 body-font">
            <div class="flex flex-wrap -m-4" v-if="loading">
              <SkeletonCard />
              <SkeletonCard />
            </div>
            <p v-if="error">
              An error occurred.
            </p>
            <div class="flex flex-wrap -m-4" v-if="!loading && !error">
              <div v-for="f in currentData" class="p-4 md:w-1/2 cursor-pointer"
              v-on:click="changeStep(f['id'], f['url'])">
                <div class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden shadow-lg">
                  <img class="aspect-video w-full object-cover object-center" :src="'/' + f['image']">
                  <div class="p-6">
                    <h2 v-if="f.hasOwnProperty('tag')" class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">{{f["tag"]}}</h2>
                    <h1 class="title-font text-lg font-medium text-gray-900 mb-3">{{f["name"]}}</h1>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </section>
</template>
