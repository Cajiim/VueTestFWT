<script setup lang="ts">
import {
  ref, watchEffect, computed, defineProps, toRefs, 
} from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import useState from '../../../hooks/useState';
import ArrowLeft from '../../../data/ArrowLeft.vue';
import ArrowRight from '../../../data/ArrowRight.vue';
import DoubleArrowRight from '../../../data/DoubleArrowRight.vue';
import DoubleArrowLeft from '../../../data/DoubleArrowLeft.vue';
import PaginationPage from './PaginationPage.vue';
import ActivePagination from './ActivePagination.vue';

const props = defineProps({ isDarkTheme: Boolean });
const { isDarkTheme } = toRefs(props);
const store = useStore();
const isLoading = ref(false);
const limit = ref(12);
const totalCount = computed((): number => store.state.paintings.totalCount);
const amount = ref(1);
const [currentPage, setCurrentPage] = useState(1);
const route = useRoute();
const onChange = (number: number) => {
  setCurrentPage(number);
};

watchEffect(() => {
  amount.value = Math.ceil(totalCount.value / limit.value);
});

watchEffect(() => {
  store.dispatch('paintings/fetchPaintings', {
    query: route.query,
    page: currentPage.value,
    limit: limit.value,
  });
});
</script>

<template>
  <div class="pagination">
    <PaginationPage
      :child="DoubleArrowLeft"
      :disabled="currentPage < 2"
      @click="onChange(1)"
      :isDarkTheme="isDarkTheme"
    />
    <PaginationPage
      :child="ArrowLeft"
      :disabled="currentPage === 1"
      @click="onChange(currentPage - 1)"
      :isDarkTheme="isDarkTheme"
    />
    <ActivePagination
      :onChange="onChange"
      :currentPage="currentPage"
      :amount="amount"
      :isLoading="isLoading"
      :isDarkTheme="isDarkTheme"
    />
    <PaginationPage
      :child="ArrowRight"
      :disabled="currentPage >= amount"
      @click="onChange(currentPage + 1)"
      :isDarkTheme="isDarkTheme"
    />
    <PaginationPage
      :child="DoubleArrowRight"
      :disabled="currentPage >= amount"
      @click="onChange(amount)"
      :isDarkTheme="isDarkTheme"
    />
  </div>
</template>

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
