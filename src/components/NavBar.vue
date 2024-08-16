<template>
  <nav class="fixed top-0 w-full">
    <div class=" px-10 py-3 bg-brandcolor mb-3 rounded-2xl mx-3 mt-2 space-x-8">
      <a href="/"><span class="text-white font-extrabold">Mount Seir Tech Test</span></a>
      <a href=""><span class="text-white">Sign Up</span></a>
      <button @click="signIn()" class=" text-yellow-500">Movie DB Sign-In</button>
    </div>
  </nav>

</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth"

async function signIn() {
  const auth = useAuthStore()
  await auth.signIn('testuser', 't3stp4ss1')
}

</script>