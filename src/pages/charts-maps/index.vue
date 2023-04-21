<template>
 <div class="flex flex-col" h="full" w="full" p="4">
  <div class="flex flex-col items-center" h="full">
   <span>Case Fluctuation</span>
   <div class="flex" w="full" h="full">
    <CaseFluctuation />
   </div>
  </div>
 </div>
</template>

<script setup lang="ts">
import CaseFluctuation from './components/CaseFluctuation.vue';
</script>
