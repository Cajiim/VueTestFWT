<!-- eslint-disable max-len -->
<template>
  <div class="arrow" :class="{ arrow_opened: isOpen, arrow_dark: isDarkTheme }">
    <svg viewBox="0 0 10 6" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9.67861 1.8337L5.77064 5.68539C5.34503 6.10487 4.65497 6.10487 4.22936 5.68539L0.321394 1.8337C-0.365172 1.15702 0.121082 -8.3659e-08 1.09203 0L8.90797 6.73452e-07C9.87892 7.57113e-07 10.3652 1.15702 9.67861 1.8337Z"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { defineProps, toRefs } from 'vue';

const props = defineProps({
  isOpen: Boolean,
  isDarkTheme: Boolean,
});
const { isOpen, isDarkTheme } = toRefs(props);
</script>

<style lang="scss" scoped>
.arrow {
  width: 10px;
  height: 6px;
  display: flex;
  fill: rgba(0, 0, 0, 0.3);

  &_opened {
    transform: rotate(180deg);
  }

  &_dark {
    fill: #555555;
  }
}
</style>
