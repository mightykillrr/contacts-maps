import { nanoid } from 'nanoid';
import { defineStore } from 'pinia';
import { computed } from 'vue';
import { Status } from '~/types/structures';
import type { Contact, InitialContact } from '~/types/structures';

export const useContactsStore = defineStore('contacts', () => {
 const contacts = ref<Map<string, Contact>>(new Map());

 const getContacts = computed(() => [...contacts.value.values()]);
 const getContact = (id: string) => contacts.value.get(id);

 const addContact = (contact: InitialContact) => {
  const id = nanoid();
  contacts.value.set(id, { id, ...contact });
  return contacts.value;
 };

 const updateContact = (contact: Contact) => {
  contacts.value.set(contact.id, contact);
  return contacts.value;
 };

 const deleteContact = (id: string) => {
  contacts.value.delete(id);
  return contacts.value;
 };

 const addFakeContacts = () => {
  const fakeContacts = [
   {
    first_name: 'John',
    last_name: 'Doe',
    status: Status.Active,
    phone: '123-456-7890',
    email: 'abc@xyz.com',
   },
   {
    first_name: 'Jane',
    last_name: 'Doe',
    status: Status.Inactive,
    phone: '123-456-7890',
    email: 'abc@xyz.com',
   },
  ];

  fakeContacts.forEach(contact => addContact(contact));
 };

 return {
  getContacts,
  getContact,

  addContact,
  addFakeContacts,
  updateContact,
  deleteContact,
 };
});
