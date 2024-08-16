<script setup lang="ts">
import PageComponent from "@/components/PageComponent.vue";
import { useAuthStore } from "@/stores/auth";
import { useMovieStore } from "@/stores/movies";
import { onMounted } from "vue";

const auth = useAuthStore();
const movieStore = useMovieStore();

onMounted(async () => {
  console.log("on mount");
  await auth.signIn('testuser', 't3stp4ss1')
});

function addMovie(event: any) {
  event.preventDefault();
  const formData = new FormData(event.target);

  const movie = {
    title: formData.get("title"),
    year: formData.get("year"),
    genre: formData.get("genre"),
    creator: formData.get("creator"),
  };

  movieStore.addMovie(movie);
}
</script>

<template>
  <PageComponent>
    <div v-if="!auth.accessToken">You need to sign in</div>
    <div v-else>
      <form @submit="addMovie">
        <div class="flex flex-col mb-5">
          <div class="p-3">
            <label for="title">Title: </label>
            <input
              name="title"
              class="border border-gray-700 bg-gray-300 rounded-lg p-1 ml-5"
              type="text"
            />
          </div>
          <div class="p-3">
            <label for="year">Year: </label>
            <input
              name="year"
              class="border border-gray-700 bg-gray-300 rounded-lg p-1 ml-5"
              type="text"
            />
          </div>
          <div class="p-3">
            <label for="genre">Genre: </label>
            <input
              name="genre"
              class="border border-gray-700 bg-gray-300 rounded-lg p-1 ml-1"
              type="text"
            />
          </div>
          <div class="p-3">
            <label for="creator">Creator: </label>
            <input
              name="creator"
              class="border border-gray-700 bg-gray-300 rounded-lg p-1 ml-1"
              type="text"
            />
          </div>
        </div>
        <button
          type="submit"
          class="border-black border rounded-lg bg-white p-3"
        >
          Add movie
        </button>
      </form>
    </div>
  </PageComponent>
</template>
