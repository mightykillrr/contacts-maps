<template>
  <div
    class="flex flex-col items-center justify-center"
    h="full"
    w="full"
  >
    <TransitionGroup
      name="list"
      tag="div"
      class="flex flex-wrap justify-center gap-2 overflow-y-auto"
      p="8"
    >
      <AContact
        v-for="contact in contacts"
        :key="contact.id"
        :contact="contact"
      />
      <RouterLink
        key="weee"
        :to="{ name: 'contacts-create' }"
      >
        <ACard
          w="56"
          class="aspect-square justify-center"
        >
          <div class="i-mdi-plus text-4xl" />
          Add
        </ACard>
      </RouterLink>
    </TransitionGroup>
  </div>
</template>

<script
  setup
  lang="ts"
>
import { useContactsStore } from "~/stores/contacts";

const contactsStore = useContactsStore();

const contacts = computed(() => contactsStore.getContacts);
</script>
