<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import InputItem from './UI/InputItem.vue';
import SelectItem from './UI/SelectItem.vue';
import RangeItem from './UI/RangeItem.vue';

const store = useStore();
const route = useRoute();
const valueInput = ref((String(route.query.q) !== 'undefined' ? String(route.query.q) : ''));
const Author = ref('Author');
const Location = ref('Location');
const data = computed(() => store.state.selects);
const fetchAuthors = () => store.dispatch('selects/fetchAuthors');
const fetchLocations = () => store.dispatch('selects/fetchLocations');

onMounted(() => {
  fetchAuthors();
  fetchLocations();
});

</script>

<template>
  <nav class="navigation">
    <InputItem class="inputName" v-model="valueInput" />
    <SelectItem :value="Author" :data="data.authors" />
    <SelectItem :value="Location" :data="data.locations" />
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
