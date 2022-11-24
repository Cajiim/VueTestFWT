<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import PaintingCard from './PaintingCard.vue';

export type TCard = {
  data?: {
  value?: {
    author?: {
      name?: string;
    };
    created?: string;
    id?: number;
    imageUrl?: string;
    location?: {
      location?: string;
    };
    name?: string;
  };
}
};

const store = useStore();
const isLoading = computed(() => store.state.paintings.isLoading);
const data = computed(() => store.state.paintings);

</script>

<template>
  <ul class="content" v-if="!isLoading">
    <li class="painting" v-for="painting in data?.paintings" :key="painting?.id">
    <PaintingCard :card='painting'/>
    </li>
  </ul>
</template>

<style lang="scss">
.content {
  margin: 45px 0 40px 0 !important;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;

  @media screen and (max-width: 1023px) {
    margin: 45px 0 35px 0 !important;
  }
  @media screen and (max-width: 767px) {
    margin: 45px 0 30px 0 !important;
  }

  &__error {
    margin-bottom: 50px !important;

    &_dark {
      color: white;
    }
  }
}

.painting{
  width: 360px;
  height: 275px;
  border-radius: 20px;
  position: relative;
  overflow: hidden;

  @media screen and (max-width: 1365px) {
    height: auto;
    width: calc((100% - 40px) / 3);
    aspect-ratio: 300 / 230;
  }
  @media screen and (max-width: 1023px) {
    width: calc((100% - 20px) / 2);
    aspect-ratio: 340 / 249;
  }
  @media screen and (max-width: 767px) {
    width: 100%;
    aspect-ratio: 280 / 205;
  }
}
</style>
