import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'


export const useAuthStore = defineStore('auth', () => {
  const accessToken = ref(null)
  const refreshToken = ref(null)
  
  async function signIn(username:string, password:string) {
    if(accessToken.value){
      return
    } 
    const url = 'http://127.0.0.1:8000/api/v1/auth/token/'
    try {
        const response = await axios.post(url, {
            username: username,
            password: password
        })
        accessToken.value = response.data.access
        refreshToken.value = response.data.refresh

        saveTokensToLocalStorage()

    }catch(error) {
        console.error("Error Signing In: ", error)
    }
  }
  function saveTokensToLocalStorage() {
    if (!accessToken.value || !refreshToken.value){
      throw new Error("Tokens are null")
    }
    localStorage.setItem('accessToken', accessToken.value);
    localStorage.setItem('refreshToken', refreshToken.value);
  }

  async function refresh() {
    const refreshToken = localStorage.getItem('refreshToken');
    const url = "http://127.0.0.1:8000/api/v1/auth/token/refresh/"

    try {
      await axios.post(url, {
        refresh: refreshToken
      })
      saveTokensToLocalStorage();
    }catch(error){
      console.error("error refreshing token: ", error)
    }
  }
  return { signIn, refresh, accessToken, refreshToken }
})