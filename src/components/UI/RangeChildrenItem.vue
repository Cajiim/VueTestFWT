<template>
  <div class="rangeChild">
    <input
      placeholder="from"
      class="rangeChild__input"
      v-model="valueBefore"
      @input="updateInputBefore"
      type="number"
    />
    <span class="rangeChild__line"></span>
    <input
    placeholder="before"
    class="rangeChild__input"
    v-model="valueAfter"
    type="number"
    @input="updateInputAfter"/>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const valueBefore = ref(route.query.gte || '');
const valueAfter = ref(route.query.lte || '');

const updateInputBefore = (e: Event) => {
  const query = { ...route.query };
  router.replace({
    query: { ...route.query, gte: (e.target as HTMLInputElement).value.trim() },
  });
  if (!(e.target as HTMLInputElement).value.trim()) {
    delete query.gte;
    router.replace({ query });
  }
};

const updateInputAfter = (e: Event) => {
  const query = { ...route.query };
  router.replace({
    query: { ...route.query, lte: (e.target as HTMLInputElement).value.trim() },
  });
  if (!(e.target as HTMLInputElement).value.trim()) {
    delete query.lte;
    router.replace({ query });
  }
};
</script>

<style lang="scss">
.rangeChild {
  display: flex;
  align-items: center;

  @media screen and (max-width: 1365px) {
    flex-direction: column;
    max-width: 110px;
    margin-bottom: 20px !important;
  }
  @media screen and (max-width: 767px) {
    max-width: 100%;
    flex-direction: row;
  }

  &__input {
    width: 95px;
    height: 45px;
    background: #efefef;
    border-radius: 8px;
    border: 0;
    font-family: "Roboto";
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 15px;
    display: flex;
    box-sizing: border-box;
    align-items: center;
    padding-left: 15px !important;
    outline: none;

    &_dark {
      background: #ffffff;
    }
    &::placeholder {
      color: rgba(0, 0, 0, 0.3);
    }

    @media screen and (max-width: 1365px) {
      width: 110px;
    }
  }
  &__line {
    width: 12px;
    border: 1px solid #000000;
    box-sizing: border-box;
    background: #000000;
    margin: 0 10px 0 10px !important;

    &_dark {
      border-color: white;
      background: white;
    }

    @media screen and (max-width: 1365px) {
      margin: 15px 0 15px 0 !important;
    }
    @media screen and (max-width: 767px) {
      margin: 0 6px 0 6px !important;
    }
  }
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
input[type="number"],
input[type="number"]:hover,
input[type="number"]:focus {
  appearance: none;
  -moz-appearance: textfield;
}
</style>
