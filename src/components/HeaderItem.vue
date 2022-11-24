<template>
  <header class="header">
    <LogoIcon />
    <ThemeIcon />
  </header>
</template>

<script setup lang="ts">
import LogoIcon from '../data/FwtLogo.vue';
import ThemeIcon from '../data/ThemeIcon.vue';

</script>

<style lang="scss">
.header {
  height: 134px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 767px) {
    height: 118px;
  }
}
</style>
