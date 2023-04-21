<template>
  <div
    p="y-2"
    bg="hover:theme hover:opacity-30"
    class="rounded-md"
    transition="colors"
    :class="{ 'border-1 border-theme bg-theme bg-opacity-20': active }"
  >
    <span v-if="text">{{ text }}</span>
    <slot v-else />
  </div>
</template>

<script
  setup
  lang="ts"
>
defineProps<{
  text?: string;
  active?: boolean;
}>();
</script>
