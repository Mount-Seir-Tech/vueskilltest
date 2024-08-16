<script setup lang="ts">
import { onMounted } from "vue";
import PageComponent from "@/components/PageComponent.vue";
import { useMovieStore } from "@/stores/movies";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

const moviesStore = useMovieStore();
const auth = useAuthStore();
const router = useRouter();

onMounted(async () => {
  console.log("on mount");
  await auth.signIn('testuser', 't3stp4ss1')
  await moviesStore.init();
  console.log(moviesStore.movies);
});

function DeleteMovies(id: any) {
  moviesStore.deleteMovie(id);
  router.push({ name: "home" });
}
function editMovies(id: any) {
  router.push({ name: "Edit", params: { id: id } });
}
</script>

<template>
  <PageComponent>
    <div v-if="auth.accessToken">
      <div
        class="py-5 px-10 border bg-gray-300 border-solid border-gray-400 rounded-xl"
      >
        <p class="text-center text-4xl">Movies Detail</p>
        <div class="py-5">
          <template v-for="(movie, index) in moviesStore.movies" :key="index">
            <template v-if="movie.id == $route.params.id">
              <h1>Tittle : {{ movie.title }}</h1>
              <br />
              <h1>Year : {{ movie.year }}</h1>
              <br />
              <h1>Genre :{{ movie.genre }}</h1>
              <br />
              <h1>Creator : {{ movie.creator }}</h1>
              <br />
              <h1>ID : {{ movie.id }}</h1>
              <br />
              <button
                @click="DeleteMovies(movie.id)"
                class="border-red-500 border rounded-lg bg-white p-3 m-2"
              >
                Delete Movie
              </button>
              <button
                @click="editMovies(movie.id)"
                class="border-green-500 border rounded-lg bg-white p-3 m-2"
              >
                Edit movie
              </button>
            </template>
          </template>
        </div>
      </div>
    </div>
    <div v-else>
      <div
        class="py-5 px-10 border bg-gray-300 border-solid border-gray-400 rounded-xl"
      >
        <p>Please Sign In</p>
      </div>
    </div>
  </PageComponent>
</template>
