<template>
 <div class="flex flex-col gap-1">
  <span
   :class="{
    'text-red-500': errors?.length,
   }"
   class="text-label text-sm font-semibold uppercase"
  >
   {{ label }}
  </span>
  <input
   :class="{
    'border-red-500': errors?.length,
   }"
   :name="name"
   :type="htmlType"
   :value="modelValue"
   class="border-card bg-input w-full border-[1px] rounded-md p-2 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none"
   v-bind="$attrs"
   @input="$emit('update:modelValue', $event.target.value)"
  />
  <div class="flex justify-between">
   <div>
    <span v-if="errors?.[0]" class="text-sm text-red-500">{{ errors[0].$message }}</span>
   </div>
   <slot name="additional" />
  </div>
 </div>
</template>

<script lang="ts" setup>
import type { ErrorObject } from '@vuelidate/core';

defineProps<{
 label: string;
 modelValue: string | number | null;
 errors?: ErrorObject[];
 htmlType?: string;
 name?: string;
}>();
</script>
