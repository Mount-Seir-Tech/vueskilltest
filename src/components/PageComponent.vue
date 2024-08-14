<script setup lang="ts">
    import NavBar from "@/components/NavBar.vue"
</script>

<template>
    <div>
        <NavBar/>
        <div class=" my-20 mx-8">
            <slot></slot>
        </div>
    </div>
</template>