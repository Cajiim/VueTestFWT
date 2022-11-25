<script setup lang="ts">
import { useStore } from 'vuex';
import {
  ref, toRefs, defineProps, PropType, computed, watchEffect,
} from 'vue';
import { onClickOutside } from '@vueuse/core';
import { useRoute, useRouter } from 'vue-router';
import ArrowItem from '../../data/ArrowItem.vue';
import ClearSelect from '../../data/ClearSelect.vue';

type TItem = { id: number; name: string; location: string };

type TData = {
  [x: string]: TItem;
  item: {
    id: number;
    name: string;
    location: string;
  };
};

const isOpen = ref(false);
const isVisible = ref(false);
const selectRef = ref<HTMLDivElement | null>(null);
const props = defineProps({
  data: {
    type: Object as PropType<TData>,
    default: () => ({}),
  },
  loading: {
    String,
    default: true,
  },
  value: {
    String,
    default: '',
  },
});
const { data, value } = toRefs(props);
const open = () => {
  isOpen.value = false;
};

onClickOutside(selectRef, open);

const store = useStore();
const route = useRoute();
const router = useRouter();
const fetchAuthors = computed(() => store.state.selects.authors);
const fetchLocations = computed(() => store.state.selects.locations);
const correctValue = ref('');

watchEffect(() => {
  const getItems = () => {
    const author = ref('Author');
    const location = ref('Location');
    fetchAuthors.value.find((el: { id: number; name: string }) => 
      (el.id === Number(route.query.author) ? (author.value = el.name) : ''));
    fetchLocations.value.find((el: { id: number; location: string }) => 
      (el.id === Number(route.query.location) ? (location.value = el.location) : ''));
    return { author, location };
  };
  correctValue.value = value.value === 'Author' ? getItems().author.value : getItems().location.value;
  isVisible.value = correctValue.value !== 'Author' && correctValue.value !== 'Location';
});

const handlClickItem = (item: { name: string; location: string; id: number }) => {
  if (item.name) {
    router.replace({ query: { ...route.query, author: item.id } });
  }
  if (item.location) {
    router.replace({ query: { ...route.query, location: item.id } });
  }
};

const handlClickClear = (e: { stopPropagation: () => void }) => {
  const query = { ...route.query };
  e.stopPropagation();
  if (value.value === 'Author') {
    delete query.author;
    router.replace({ query });
  } else {
    delete query.location;
    router.replace({ query });
  }
};
</script>

<template>
  <div
    ref="selectRef"
    class="select"
    @click="isOpen = !isOpen"
    aria-hidden
    :class="{ select_open: isOpen }"
  >
    <span class="select__name">{{ correctValue }}</span>
    <ClearSelect :isVisible="isVisible" @click="handlClickClear" />
    <ArrowItem class="select__dropDown" :isOpen="isOpen" />
    <ul class="select__list" :class="{ select__list_open: isOpen }" v-if="isOpen">
      <li
        class="select__items"
        v-for="item in data"
        :key="item.id"
        aria-hidden
        @click="() => handlClickItem(item)"
      >
        <p class="select__itemsName">{{ item.name || item.location }}</p>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.select {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 265px;
  min-height: 45px;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 0px 1px;
  color: black;
  box-sizing: border-box;
  background: white;
  cursor: pointer;
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 15px;

  &_open {
    border-radius: 8px 8px 0 0;
    box-shadow: 0px 0px 0px 1px black;

    &_dark {
      box-shadow: 0px 0px 0px 1px #ffffff;
    }
  }

  @media screen and (max-width: 1365px) {
    min-width: calc((100% - 60px) / 4);
  }

  &_dark {
    background: #0c0c0c;
    box-shadow: #ffffff 0px 0px 0px 1px;
    color: #ffffff;
  }

  &__name {
    margin: 0 0 0 15px !important;
    width: 75%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    @media screen and (max-width: 1050px) {
      width: 70%;
    }

    @media screen and (max-width: 920px) {
      width: 65%;
    }

    @media screen and (max-width: 850px) {
      width: 60%;
    }

    @media screen and (max-width: 767px) {
      width: 75%;
    }
  }

  &__list {
    display: block;
    position: absolute;
    width: 100%;
    box-shadow: 0px 0px 0px 1px black;
    border-radius: 8px;
    top: 46px;
    z-index: 3;
    background: white;
    font-family: "Roboto";
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    overflow: overlay;
    max-height: 300px;

    &_open {
      border-radius: 0 0 8px 8px;
      max-height: 300px;

      @media screen and (max-width: 1365px) {
        max-height: 355px;
      }

      @media screen and (max-width: 767px) {
        max-height: 433px;
      }
    }

    &_dark {
      background: #0c0c0c;
      box-shadow: 0px 0px 0px 1px #ffffff;
    }
  }

  &__dropDown {
    position: absolute;
    display: flex;
    right: 18px;
    float: right;
    fill: rgba(0, 0, 0, 0.3);
    width: 10px;
    height: 6px;

    &_dark {
      fill: rgba(255, 255, 255, 0.3);
    }
  }

  &__items {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
    padding: 10px 10px 10px 22px !important;

    &:hover {
      background: black;
      color: white;
    }

    &:first-of-type {
      margin-top: 10px !important;
    }

    &:last-of-type {
      margin-bottom: 10px !important;

      @media screen and (max-width: 1365px) {
        margin-bottom: 25px !important;
      }

      @media screen and (max-width: 767px) {
        margin-bottom: 22px !important;
      }
    }

    &_dark {
      &:hover {
        background: #ffffff;
        color: #000000;
      }
    }

    @media screen and (max-width: 1023px) {
      padding: 10px 10px 10px 15px !important;
    }

    @media screen and (max-width: 767px) {
      padding: 10px 10px 10px 30px !important;
    }

    &Name {
      overflow: hidden;
      text-overflow: ellipsis;
      width: 95%;
      white-space: nowrap;
    }
  }
}
</style>
