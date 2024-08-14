import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import {useAuthStore} from "./auth"


export const useMovieStore = defineStore('movies', () => {
  const movies = ref([])
  const count = ref(0)

  const auth = useAuthStore()
  const baseUrl = "http://127.0.0.1:8000/api/v1/movies/"

 
  async function init() {
    const headers: any = { 
        headers: {
          Authorization: `Bearer ${auth.accessToken}`
      }
    }
    console.log(headers)
    const url = 'http://127.0.0.1:8000/api/v1/movies/'
    try {
        const response = await axios.get(url, headers)
        movies.value = response.data.results
        count.value = response.data.count
    }catch(error){
        console.error('Error initializeing movies: ', error)
    }
  }

  async function addMovie( movie:any ){
    const headers: any = { 
      headers: {
        Authorization: `Bearer ${auth.accessToken}`
      }
    }
    console.log(headers)
    try {
      await axios.post(baseUrl, movie, headers)
    }catch(error){
      console.error("Error adding movie: ", error)
    }
    console.log(movie)
  }

  return { movies, init, count, addMovie }
})