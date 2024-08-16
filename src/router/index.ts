import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AddMovies from "../views/AddMovies.vue";
import EditMovies from "../views/EditMovie.vue";
import MovieDetails from "../views/MovieDetails.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/add",
      name: "AddMovie",
      component: AddMovies,
    },
    {
      path: "/details/:id",
      name: "Details",
      component: MovieDetails,
    },
    {
      path: "/delete/:id",
      name: "Delete",
      component: HomeView,
    },
    {
      path: "/edit/:id",
      name: "Edit",
      component: EditMovies,
    },
  ],
});

export default router;
