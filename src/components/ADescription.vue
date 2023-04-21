<template>
 <div class="flex justify-between">
  <span text="[12px] ">{{ label }}:</span>
  <div text="[12px]" font="semibold">
   <slot />
  </div>
 </div>
</template>

<script setup lang="ts">
defineProps<{
 label: string;
}>();
</script>
