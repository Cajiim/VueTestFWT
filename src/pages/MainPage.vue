<!-- eslint-disable jsx-a11y/label-has-for -->
<template>
  <div className="home-wrapper">
    <header className="home-wrapper__header">
      <HeaderItem />
    </header>
    <main className="home-wrapper__main">
      <NavigationItem />
      <ContentItem />
      <PaginationItem />
    </main>
  </div>
</template>

<script setup lang="ts">
import HeaderItem from '../components/HeaderItem.vue';
import NavigationItem from '../components/NavigationItem.vue';
import ContentItem from '../components/ContentItem.vue';
import PaginationItem from '../components/UI/PaginationItem/PaginationItem.vue';
</script>

<style lang="scss">
* {
  margin: 0 !important;
  padding: 0 !important;
}

li {
  list-style: none;
}

.home-wrapper {
  width: 100%;
  height: 100%;

  &__header {
    position: relative;
    max-width: 1120px;
    max-height: 138px;
    margin: 0px auto !important;

    @media screen and (max-width: 1200px) {
      margin: 0px 42px 0 42px !important;
    }

    @media screen and (max-width: 1023px) {
      margin: 0px 34px 0 34px !important;
    }

    @media screen and (max-width: 767px) {
      margin: 0px 20px 0 20px !important;
    }
  }

  &__main {
    position: relative;
    max-width: 1120px;
    min-height: calc(100% - 138px);
    margin: 0px auto !important;

    @media screen and (max-width: 1200px) {
      margin: 0px 42px 0 42px !important;
    }

    @media screen and (max-width: 1023px) {
      margin: 0px 34px 0 34px !important;
    }

    @media screen and (max-width: 767px) {
      margin: 0px 20px 0 20px !important;
      min-height: calc(100% - 118px);
    }
  }
}
</style>
