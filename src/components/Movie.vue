<template>
  <router-link
    :to="{ name: 'Details', params: { id: props?.Movie?.id } }"
    class="m-2 p-1 sm:w-1/2 md:w-1/6 movie-container"
  >
    <div class="grid content-between">
      <div>
        <h2 class="text-center">{{ props?.Movie?.title }}</h2>
        <h4 class="text-center content-end h-fit">
          ({{ props?.Movie?.year }})
        </h4>
      </div>

      <h4 class="text-center content-end h-fit">{{ props?.Movie?.creator }}</h4>
    </div>
  </router-link>
</template>
<script setup lang="ts">
const props = defineProps({
  Movie: Object,
});
</script>

<style>
.movie-container {
  height: 200px;
  border: 1px solid black;
  min-width: 120px;
  max-width: 200px;
}
</style>
