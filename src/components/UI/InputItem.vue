<!-- eslint-disable vuejs-accessibility/form-control-has-label -->
<template>
  <input :value="modelValue" type="text" @input="updateInput" class="inputName" />
</template>

<script lang="ts">
import { LooseRequired } from '@vue/shared';
import { ExtractPropTypes, SetupContext } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
  emits: ['update:modelValue'],
  setup(
    _props: Readonly<
      LooseRequired<
        Readonly<
          ExtractPropTypes<{
            modelValue: StringConstructor[];
          }>
        > & { 'onUpdate:modelValue'?: ((...args: (string | number)[]) => void) | undefined }
      >
    >,
    context: SetupContext<'update:modelValue'[]>,
  ) {
    const route = useRoute();
    const router = useRouter();
    const updateInput = (e: Event) => {
      const query = { ...route.query };
      context.emit('update:modelValue', (e.target as HTMLInputElement).value);
      router.replace({ query: { ...route.query, q: (e.target as HTMLInputElement).value.trim() } });
      if (!(e.target as HTMLInputElement).value.trim()) {
        delete query.q;
        router.replace({ query });
      }
    };
    return { updateInput };
  },
  props: {
    modelValue: String,
  },
};
</script>

<style lang="scss" scoped>
.inputName {
  outline: none;
  padding: 0 15px !important;
  min-width: 265px;
  min-height: 45px;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 15px;
  box-sizing: border-box;
  text-overflow: ellipsis;

  &:focus {
    border: 1px solid #000000;
  }

  &::placeholder {
    color: rgba(0, 0, 0, 0.3);
  }

  &_dark {
    background: #0c0c0c;
    border: 1px solid #ffffff;
    color: #ffffff;

    &:focus {
      border: 1px solid #ffffff;
    }

    &::placeholder {
      color: rgba(255, 255, 255, 0.3);
    }
  }

  @media screen and (max-width: 1365px) {
    min-width: calc((100% - 60px) / 4);
  }
}
</style>
