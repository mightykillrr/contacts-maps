<template>
  <ACard
    w="56"
    class="aspect-square justify-around"
  >
    <div class="flex flex-col items-center">
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
    </div>
    <ABadge :status="contact.status" />
    <div
      class="flex items-center justify-center gap-3"
      w="full"
    >
      <RouterLink
        w="full"
        :to="{ name: 'contacts-edit-id', params: { id: contact.id } }"
      >
        <AButton w="full">
          Edit
        </AButton>
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
