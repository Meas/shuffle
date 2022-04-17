<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <div class="container mt-5">
    <RouterView />
  </div>
</template>

<style>
/* TODO: should be loaded in a more optimal way, using PurgeCss or alternatively using Tailwind CSS */
@import "bootstrap/dist/css/bootstrap.min.css";
</style>
