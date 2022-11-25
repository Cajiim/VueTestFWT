<template>
  <button
    v-for="page in pageNumbers()"
    :key="page"
    type="button"
    class="button"
    :class="{
      button_active: page === currentPage,
      button_dark: isDarkTheme,
      button_activeDark: isDarkTheme && page === currentPage,
    }"
    @click="onChange(page)"
  >
    {{ page }}
  </button>
</template>

<script setup lang="ts">
import { defineProps, toRefs, ref } from 'vue';

const props = defineProps({
  onChange: {
    type: Function,
    default: () => ({ page: 1 }),
  },
  currentPage: {
    Number,
    default: 1,
  },
  amount: {
    Number,
    default: 1,
  },
  isLoading: {
    Boolean,
    default: false,
  },
  isDarkTheme: {
    Boolean,
    default: false,
  },
});

const {
  onChange, currentPage, amount, isDarkTheme, 
} = toRefs(props);

const start = ref(1);
const end = ref(1);
const amountPage = () => Array.from({ length: amount.value }, (_, i) => i + 1);
const pageNumbers = () => {
  if (currentPage.value <= 1) return amountPage().slice(0, 3);
  if (currentPage.value >= amountPage.length) return amountPage().slice(-3);
  start.value = currentPage.value <= 2 ? 0 : currentPage.value - 2;
  end.value = currentPage.value >= amountPage.length - 1 
    ? amountPage.length : currentPage.value + 1;
  return amountPage().slice(start.value, end.value);
};
</script>

<style lang="scss">
.button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 41px;
  background: inherit;
  border: 1px solid #000000;
  box-sizing: border-box;
  border-right: none;
  cursor: pointer;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 20px;

  &:hover {
    background: #ededed;
  }
  &_active {
    background: black;
    color: white;
    border-color: black;
    &:hover {
      cursor: pointer;
      background: black;
      color: white;
      border-color: black;
    }
  }
  &_dark {
    border: 1px solid #ffffff;
    color: white;
    border-right: none;
    &:hover {
      background: #464646;
    }
  }
  &_activeDark {
    background: white;
    color: black;
    border-color: white;
    &:hover {
      cursor: pointer;
      background: white;
      color: black;
      border-color: white;
    }
  }
}
</style>
