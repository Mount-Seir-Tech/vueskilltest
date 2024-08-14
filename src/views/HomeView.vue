<script setup lang="ts">
  import { onMounted } from "vue";
  import PageComponent from "@/components/PageComponent.vue"
  import {useMovieStore} from "@/stores/movies"
  import {useAuthStore} from "@/stores/auth"
  import { useRouter } from "vue-router";

  const moviesStore = useMovieStore()
  const auth = useAuthStore()
  const router = useRouter()

  onMounted(async () => {
    console.log("on mount")
    await auth.signIn('testuser', 't3stp4ss1')
    await moviesStore.init()
    console.log(moviesStore.movies)
  })


  function addMovies() {
    console.log("click")
    router.push("/add")
  }

</script>

<template>
  <PageComponent>
    <div v-if="auth.accessToken">
      <div class="py-5 px-10 border bg-gray-300 border-solid border-gray-400 rounded-xl">
        <p class ="text-center text-4xl">Movies Database - <span>{{moviesStore.count}}</span></p>
        <ul class="py-5">
          <li v-for="(movie, index) in moviesStore.movies" :key="index">
            - <strong>{{movie.title}}</strong> <em>{{ movie.year }}</em> <span class=" text-red-500">{{ movie.genre }}</span>
          </li>
        </ul>
        <button @click="addMovies" class="border-black border rounded-lg bg-white p-3">Add movie</button>
      </div>
    </div>
    <div v-else>
      <div class="py-5 px-10 border bg-gray-300 border-solid border-gray-400 rounded-xl">
        <p>Please Sign In</p>
      </div>
    </div>
  </PageComponent>
</template>
