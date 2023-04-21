<template>
 <div class="flex flex-col items-center">
  <span>{{ name }}</span>
  <span>{{ value }}</span>
 </div>
</template>

<script setup lang="ts">
defineProps<{
 name: string;
 value: string | number;
}>();
</script>
