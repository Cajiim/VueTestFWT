<template>
  <div
    ref="rangeRef"
    class="range"
    :class="{
      range_open: isOpen,
      range_dark: isDarkTheme,
      range_activeDark: isOpen && isDarkTheme,
    }"
    aria-hidden
    @click="isOpen = !isOpen"
  >
    <span class="range__title" :class="{range__title_dark : isDarkTheme}" >Created</span>
    <ArrowItemVue class="range__arrow" :isDarkTheme="isDarkTheme" :isOpen="isOpen" />
    <div
      class="range__сontainer"
      :class="{range__сontainer_dark : isDarkTheme}"
      aria-hidden="true"
      @click.stop="(e) => e.preventDefault()"
      v-if="isOpen"
    >
      <RangeChildrenItemVue
        valueFilterFrom="valueFilterFrom"
        valueFilterBefore="valueFilterBefore"
        :isDarkTheme="isDarkTheme"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, toRefs } from 'vue';
import { onClickOutside } from '@vueuse/core';
import ArrowItemVue from '../../data/ArrowItem.vue';
import RangeChildrenItemVue from './RangeChildrenItem.vue';

const props = defineProps({
  isDarkTheme: Boolean,
});
const { isDarkTheme } = toRefs(props);
const rangeRef = ref<HTMLDivElement | null>(null);
const isOpen = ref(false);
const open = () => {
  isOpen.value = false;
};

onClickOutside(rangeRef, open);
</script>

<style lang="scss">
.range {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: calc((100% - 60px) / 4);
  line-height: 15px;
  min-height: 45px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  background: white;
  color: black;
  border-radius: 8px;
  box-sizing: border-box;
  cursor: pointer;

  &_open {
    border: 1px solid #000000;
    border-bottom: 1px solid transparent;
    border-radius: 8px 8px 0 0;
  }
  &_dark {
    background: #0c0c0c;
    border-color: #ffffff;
  }

  @media screen and (max-width: 1365px) {
    min-width: calc((100% - 60px) / 4);
  }
  @media screen and (max-width: 767px) {
    min-width: 100%;
  }
  &_activeDark {
    border-bottom: 1px solid transparent;
  }

  &__title {
    margin: 0 0 0 15px !important;
    font-style: normal;
    font-size: 13px;
    line-height: 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    &_dark {
      color: #ffffff;
    }
  }
  &__arrow {
    position: absolute;
    display: flex;
    right: 18px;
    float: right;
    width: 10px;
    height: 6px;
    fill: rgba(0, 0, 0, 0.3);
    fill-opacity: 1;

    &_dark {
      fill: rgba(255, 255, 255, 0.3);
    }
  }
  &__сontainer {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: center;
    background: white;
    width: calc(100% + 2px);
    min-height: 85px;
    border: 1px solid black;
    border-style: none solid solid;
    border-radius: 0px 0px 8px 8px;
    top: 43px;
    left: -1px;
    box-sizing: border-box;
    z-index: 1;

    &_active {
      border-top: none;
      display: flex;

      @media screen and (min-width: 2000px) {
        width: 265px;
      }
      @media screen and (min-width: 3000px) {
        left: -3px;
        top: 41px;
      }
      @media screen and (max-width: 1365px) {
        flex-direction: column;
        height: 160px;
      }
      @media screen and (max-width: 767px) {
        height: 85px;
      }
    }

    &_dark {
      background: #0c0c0c;
      border-color: #ffffff;
    }
  }
}
</style>
