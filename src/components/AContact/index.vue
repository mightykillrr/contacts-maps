<template>
  <ACard
    class="aspect-square justify-around"
    w="56 2xl:64"
    p="3 2xl:6"
  >
    <div class="flex flex-col items-center gap-1.5">
      <div class="i-mdi-account-circle text-3xl" />
      <h5
        font="medium"
        text="xl"
      >
        {{ contact.first_name }} {{ contact.last_name }}
      </h5>
      <span
        font="light"
        text="sm"
        class="opacity-70"
      >
    {{ contact.phone }}
   </span>
      <ABadge :status="contact.status" />
    </div>
    <div
      class="flex items-center justify-center gap-2"
      w="full"
    >
      <RouterLink
        w="full"
        :to="{ name: 'contacts-edit-id', params: { id: contact.id } }"
      >
        <AButton w="full"> Edit</AButton>
      </RouterLink>
      <AButton
        w="full"
        @click.prevent="() => contactsStore.deleteContact(contact.id)"
      >
        Delete
      </AButton>
    </div>
  </ACard>
</template>

<script
  setup
  lang="ts"
>
import { useContactsStore } from "~/stores/contacts";
import type { Contact as ContactType } from "~/types/structures";

defineProps<{
  contact: ContactType;
}>();

const contactsStore = useContactsStore();
</script>
