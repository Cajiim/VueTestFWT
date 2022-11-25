<template>
  <header class="header">
    <LogoIcon />
    <ThemeIcon @click='toggleTheme' :isDarkTheme="isDarkTheme"/>
  </header>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { defineProps, toRefs } from 'vue';
import LogoIcon from '../data/FwtLogo.vue';
import ThemeIcon from '../data/ThemeIcon.vue';
import { setCookie } from '../helpers/coockie';

const props = defineProps({
  isDarkTheme: Boolean,
});
const { isDarkTheme } = toRefs(props);
const store = useStore();
const cookieChecker = () => (isDarkTheme.value ? setCookie('theme', 'false', 1) : setCookie('theme', 'true', 1));
const toggleTheme = () => { store.dispatch('theme/changeTheme'); cookieChecker(); };

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
