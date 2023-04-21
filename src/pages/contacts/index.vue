<template>
 <div class="flex flex-col items-center justify-center" h="full" w="full">
  <div v-if="!hasContacts" class="flex flex-col items-center justify-center">
   <span> No Contacts Found </span>
   <span>
    <RouterLink :to="{ name: 'contacts-create' }">
     <button class="inline" bg="white opacity-10">Add</button>
    </RouterLink>
    a contact to get started!
   </span>
  </div>
  <div v-else class="grid grid-cols-2" w="full" h="full">
   <HTabGroup vertical :selected-index="selectedContact" @change="changeTab">
    <HTabList as="div" class="flex items-center gap-2" border="r-1">
     <HTab v-for="contact in contacts" :key="contact.id" as="template">
      <Contact :contact="contact" />
     </HTab>
    </HTabList>
    <HTabPanels>
     <span v-if="!selectedContactDetails">Click on a Contact to see more</span>
     <template v-else>
      <HTabPanel v-for="contact in contacts" :key="contact.id">
       <Contact :contact="contact" />
      </HTabPanel>
     </template>
    </HTabPanels>
   </HTabGroup>
  </div>
 </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useContactsStore } from '~/stores/contacts';

const contactsStore = useContactsStore();

const contacts = computed(() => contactsStore.getContacts);
const hasContacts = computed(() => contactsStore.getContacts.length > 0);

const selectedContact = ref<number>(-1);

function changeTab(index: number) {
 selectedContact.value = index;
 return selectedContact.value;
}

const selectedContactDetails = computed(() => {
 if (selectedContact.value === -1) return null;
 return contactsStore.getContacts[selectedContact.value];
});

onMounted(() => {
 contactsStore.addFakeContacts();
});
</script>
