<template>
 <span v-if="text">{{ text }}</span>
 <div v-else>
  <slot />
 </div>
</template>

<script setup lang="ts">
defineProps<{
 text?: string;
}>();
</script>
