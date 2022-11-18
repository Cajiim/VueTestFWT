<!-- eslint-disable vue/valid-v-on -->
<template>
  <div class="pagination">
    <PaginationPage @click="" :child="DoubleArrowLeft" />
    <PaginationPage @click="" :child="ArrowLeft" />
    <ActivePagination :onChange="onChange" :currentPage="currentPage" amount="amount" />
    <PaginationPage @click="" :child="ArrowRight" />
    <PaginationPage @click="" :child="DoubleArrowRight" />
  </div>
</template>

<script setup lang="ts">
import useState from '../../../hooks/useState';
import ArrowLeft from '../../../data/ArrowLeft.vue';
import ArrowRight from '../../../data/ArrowRight.vue';
import DoubleArrowRight from '../../../data/DoubleArrowRight.vue';
import DoubleArrowLeft from '../../../data/DoubleArrowLeft.vue';
import PaginationPage from './PaginationPage.vue';
import ActivePagination from './ActivePagination.vue';

const [currentPage, setCurrentPage] = useState(0);
const onChange = (number: any) => setCurrentPage(number);
</script>

<style lang="scss">
.pagination {
  display: flex;
  width: fit-content;
  margin: 0 0 97px 0 !important;

  @media screen and (max-width: 1365px) {
    margin: 0 0 62px 0 !important;
  }

  @media screen and (max-width: 1023px) {
    margin: 0 0 54px 0 !important;
  }

  @media screen and (max-width: 767px) {
    margin: 0 0 32px 0 !important;
  }

  &__arrow {
    min-width: 8px;
    min-height: 13px;
  }

  &__doubleArrow {
    min-width: 14px;
    min-height: 14px;
  }
}
</style>
