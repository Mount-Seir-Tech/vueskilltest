<script setup lang="ts">
import PageComponent from "@/components/PageComponent.vue";
import { useAuthStore } from "@/stores/auth";
import { useMovieStore } from "@/stores/movies";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const auth = useAuthStore();
const movieStore = useMovieStore();

const MovieID = ref(route.params.id);
console.log(MovieID.value);
const title = defineModel("title");
const year = defineModel("year");
const genre = defineModel("genre");
const creator = defineModel("creator");
const id = defineModel("id");

let movie = {
  id: id,
  title: title,
  year: year,
  genre: genre,
  creator: creator,
};

onMounted(async () => {
  console.log("on mount");
  await auth.signIn("assaad2", "Pass_Word");
  await movieStore.init();
  await movieStore.getMovieByID(MovieID.value);

  title.value = movieStore.singlemovie.title;
  year.value = movieStore.singlemovie.year;
  genre.value = movieStore.singlemovie.genre;
  creator.value = movieStore.singlemovie.creator;
});

function EditMovie(event: any) {
  event.preventDefault();
  const formData = new FormData(event.target);

  const movie = {
    title: formData.get("title"),
    year: formData.get("year"),
    genre: formData.get("genre"),
    creator: formData.get("creator"),
  };

  movieStore.editMovie(movie, MovieID.value);
  router.push({ name: "home" });
}
</script>

<template>
  <PageComponent>
    <div v-if="!auth.accessToken">You need to sign in</div>
    <div v-else>
      <form @submit="EditMovie">
        <div class="flex flex-col mb-5">
          <div class="p-3">
            <label for="title">Title: </label>
            <input
              name="title"
              class="border border-gray-700 bg-gray-300 rounded-lg p-1 ml-5"
              type="text"
              v-model="title"
            />
          </div>
          <div class="p-3">
            <label for="year">Year: </label>
            <input
              name="year"
              class="border border-gray-700 bg-gray-300 rounded-lg p-1 ml-5"
              type="text"
              v-model="year"
            />
          </div>
          <div class="p-3">
            <label for="genre">Genre: </label>
            <input
              name="genre"
              class="border border-gray-700 bg-gray-300 rounded-lg p-1 ml-1"
              type="text"
              v-model="genre"
            />
          </div>
          <div class="p-3">
            <label for="creator">Creator: </label>
            <input
              name="creator"
              class="border border-gray-700 bg-gray-300 rounded-lg p-1 ml-1"
              type="text"
              v-model="creator"
            />
          </div>
        </div>
        <button
          type="submit"
          class="border-green-500 border rounded-lg bg-white p-3"
        >
          Save Edits
        </button>
      </form>
    </div>
  </PageComponent>
</template>
