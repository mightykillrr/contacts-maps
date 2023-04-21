<template>
  <span
    border="1 rounded-md"
    text="[12px]"
    p="x-2"
    bg="opacity-20"
    :class="{ 'bg-active border-active text-active': status, 'bg-inactive border-inactive text-inactive': !status }"
  >
    <template v-if="!custom">
    {{ status ? "Active" : "Inactive" }}
      </template>
    <slot v-else />
  </span>
</template>

<script
  setup
  lang="ts"
>
import type { Status } from "~/types/structures";

withDefaults(defineProps<{
  status: Status;
  custom?: boolean;
}>(), {
  custom: false,
});
</script>
