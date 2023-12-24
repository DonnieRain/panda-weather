<script setup>
import { RouterView } from 'vue-router'
import BaseSnackbar from './components/BaseSnackbar.vue';
</script>

<template>
    <router-view />
    <BaseSnackbar />
</template>
