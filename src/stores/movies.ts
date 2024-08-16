import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import { useAuthStore } from "./auth";

export const useMovieStore = defineStore("movies", () => {
  const movies = ref([]);
  const singlemovie = ref({});
  const count = ref(0);

  const auth = useAuthStore();
  const baseUrl = "http://127.0.0.1:8000/api/v1/movies/";

  async function init() {
    const headers: any = {
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    };

    const url = baseUrl;
    try {
      const response = await axios.get(url, headers);
      movies.value = response.data.results;
      // count.value = response.data.count;
    } catch (error) {
      console.error("Error initializeing movies: ", error);
    }
  }

  async function addMovie(movie: any) {
    const headers: any = {
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    };

    try {
      await axios.post(baseUrl, movie, headers);
    } catch (error) {
      console.error("Error adding movie: ", error);
    }
    console.log(movie);
  }

  async function deleteMovie(id: any) {
    const headers: any = {
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    };

    try {
      await axios.delete(baseUrl + id, headers);
    } catch (error) {
      console.error("Error adding movie: ", error);
    }
    console.log("deleted :" + id);
    init();
  }

  async function editMovie(movie: any, id: any) {
    const headers: any = {
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    };
    const url = baseUrl + id;
    try {
      await axios.patch(`${url}/`, movie, headers);
    } catch (error) {
      console.error("Error adding movie: ", error);
    }
    console.log("edited :" + id);
    init();
  }
  async function getMovieByID(id: any) {
    movies.value.forEach((movie: any) => {
      if (movie.id == id) {
        singlemovie.value = movie;
      }
    });
  }
  return {
    movies,
    singlemovie,
    init,
    count,
    addMovie,
    deleteMovie,
    editMovie,
    getMovieByID,
  };
});
