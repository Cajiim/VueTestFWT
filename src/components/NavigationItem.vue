<script setup lang="ts">
import {
  onMounted,
  ref,
  computed,
  reactive,
  onBeforeMount,
  onUnmounted,
  watchEffect,
  ComputedRef,
} from 'vue';
import { useStore } from 'vuex';
import type { Ref } from 'vue';
import InputItem from './UI/InputItem.vue';
import SelectItem from './UI/SelectItem.vue';
import RangeItem from './UI/RangeItem.vue';

type TAuthor = {
  id: number;
  name: string;
};

type TLocation = {
  id: number;
  location: string;
};

type TData = {
  value?: { authors?: TAuthor[]; locations?: TLocation[] };
};

type TTestData = {
  data?: {
    value?: TData[];
  }
}

const valueInput = ref('');
const loading = ref(true);
const data: Ref<TData> = ref({});
const store = useStore();
const fetchAuthors = () => store.dispatch('selects/fetchAuthors');
const fetchLocations = () => store.dispatch('selects/fetchLocations');
onMounted(async () => {
  loading.value = true;
  await fetchAuthors();
  await fetchLocations();
  data.value = computed<TTestData>(() => store.state.selects);
  loading.value = false;
});
</script>

<template>
  <nav class="navigation">
    <InputItem class="inputName" v-model="valueInput" />
    <SelectItem value="Author" :data="data.value?.authors" :loading="loading" />
    <SelectItem value="Location" :data="data.value?.locations" :loading="loading" />
    <RangeItem />
  </nav>
</template>

<style lang="scss">
.navigation {
  display: flex;
  gap: 20px;

  @media screen and (max-width: 767px) {
    flex-direction: column;
    gap: 15px;
  }
}
</style>
