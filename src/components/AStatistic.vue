<template>
 <div
  class="flex flex-col cursor-pointer select-none items-center transition-transform hover:scale-103 hover:drop-shadow-sm"
  border="1 rounded"
  text="inactive"
  w="4/6"
  p="2"
  :style="{
   borderColor: color,
   backgroundColor: hexToRGB(color, '0.1'),
   color,
  }"
 >
  <span>{{ name }}</span>

  <SkeletonTheme v-if="loading" color="rgba(0,0,0,0)" highlight="#3d4043" w="full" :loading="loading">
   <Skeleton w="full" />
  </SkeletonTheme>
  <span v-else>{{ value }}</span>
 </div>
</template>

<script setup lang="ts">
import { Skeleton, SkeletonTheme } from 'vue-loading-skeleton';

defineProps<{
 name: string;
 value: string | number;
 color: string;
 loading?: boolean;
}>();

function hexToRGB(hex: string, alpha: string) {
 const r = parseInt(hex.slice(1, 3), 16);
 const g = parseInt(hex.slice(3, 5), 16);
 const b = parseInt(hex.slice(5, 7), 16);

 if (alpha) {
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
 }

 return `rgb(${r}, ${g}, ${b})`;
}
</script>
