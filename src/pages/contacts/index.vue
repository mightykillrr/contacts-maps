<template>
  <TransitionGroup
    name="list"
    tag="div"
    class="flex flex-col items-center justify-center gap-4 md:flex-row"
    w="full"
    p="y-4 2xl:y-6"
  >
    <!--  Render all Added Contacts  -->
    <AContact
      v-for="contact in contacts"
      :key="contact.id"
      :contact="contact"
    />

    <!--  Add New Contact Card  -->
    <RouterLink
      key="weee"
      :to="{ name: 'contacts-create' }"
    >
      <ACard
        w="56 2xl:64"
        class="aspect-square justify-center"
      >
        <div class="i-mdi-plus text-4xl" />
        Add
      </ACard>
    </RouterLink>
  </TransitionGroup>
</template>

<script
  setup
  lang="ts"
>
import { useContactsStore } from "~/stores/contacts";

const contactsStore = useContactsStore();
const contacts = computed(() => contactsStore.getContacts);
</script>
