<template>
  <button class="paginationPage" :class="{paginationPage_dark : isDarkTheme}" disabled>
    <component :is="child" />
  </button>
</template>

<script setup lang="ts">
import { defineProps, toRefs } from 'vue';
import type { Component } from 'vue';

type TChild = {
  child: Component;
  isDarkTheme: boolean;
};

const props = defineProps<TChild>();
const { child, isDarkTheme } = toRefs(props);
</script>

<style lang="scss">
.paginationPage {
  width: 40px;
  height: 41px;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  cursor: pointer;
  border: 1px solid black;
  border-right: none;
  background: inherit;

  &:hover {
    background: #ededed;
    border-color: black;
  }
  &:disabled {
    border-color: #b3b3b3;
    fill: rgba(0, 0, 0, 0.3);
    &:hover {
      cursor: auto;
      background: inherit;
    }
  }
  &:first-of-type {
    border-radius: 8px 0 0 8px;
  }
  &:last-child {
    border-radius: 0 8px 8px 0;
    border-right: 1px solid;
  }
  &_dark {
    border: 1px solid white;
    border-right: none;
    fill: #ffffff;
    &:last-child {
      border-right: 1px solid white;
    }
    &:hover {
      background: #464646;
      border-color: white;
    }
    &:disabled {
      border-color: rgba(255, 255, 255, 0.3);
      fill: rgba(255, 255, 255, 0.3);
      &:hover {
        cursor: auto;
        background: inherit;
      }
    }
  }
}
</style>
