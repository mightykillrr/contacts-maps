<template>
 <div class="flex flex-col cursor-pointer select-none gap-2">
  <span>{{ contact.first_name }} {{ contact.last_name }}</span>
  <span>{{ contact.phone }}</span>
  <span>{{ isActive ? 'Active' : 'Inactive' }}</span>
 </div>
</template>

<script setup lang="ts">
import type { Contact as ContactType } from '~/types/structures';
import { Status } from '~/types/structures';

const props = defineProps<{
 contact: ContactType;
}>();

const isActive = computed(() => props.contact.status === Status.Active);
</script>
