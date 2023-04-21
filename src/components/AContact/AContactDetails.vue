<template>
 <div class="flex flex-col select-none items-start gap-4" p="3">
  <div class="flex items-center gap-3">
   <div class="i-mdi-account-circle text-5xl" />
   <h5 font="medium" text="3xl">{{ contact.first_name }} {{ contact.last_name }}</h5>
  </div>
  <div class="flex flex-col items-start gap-2">
   <span font="light" text="md" class="flex items-center gap-2 opacity-70">
    <div class="i-mdi-phone" />
    {{ contact.phone }}
   </span>
   <ABadge v-if="!contact.status" :status="contact.status" custom> This phone number is not active. </ABadge>
  </div>
  <div w="full" class="flex gap-3">
   <AButton w="24"> Edit</AButton>
   <AButton w="24"> Delete</AButton>
  </div>
 </div>
</template>

<script setup lang="ts">
import type { Contact as ContactType } from '~/types/structures';

defineProps<{
 contact: ContactType;
}>();
</script>
