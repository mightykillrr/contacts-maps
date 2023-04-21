<template>
 <div>
  <form>
   <label for="first_name">First name:</label>
   <input id="first_name" v-model="record.first_name" type="text" name="first_name" text="black" />
   <label for="last_name">Last name:</label>
   <input id="last_name" v-model="record.last_name" type="text" name="last_name" text="black" />
   <label for="phone">Phone No.</label>
   <input id="phone" v-model="record.phone" type="text" name="phone" text="black" />
   <label for="email">Email</label>
   <input id="email" v-model="record.email" type="text" name="email" text="black" />

   <p>Status</p>
   <input id="html" v-model="record.status" type="radio" name="status" :value="1" />
   <label for="html">Active</label><br />
   <input id="css" v-model="record.status" type="radio" name="status" :value="0" />
   <label for="css">Inactive</label><br />

   <button type="submit" bg="white opacity-10" @click.prevent="onSubmit">Save</button>
  </form>
 </div>
</template>

<script setup lang="ts">
import { useContactsStore } from '~/stores/contacts';
import type { InitialContact } from '~/types/structures';

const record = reactive<InitialContact>({
 first_name: 'John',
 last_name: 'Doe',
 status: 1,
 phone: '',
 email: '',
});

const contactsStore = useContactsStore();
const router = useRouter();

function onSubmit() {
 if (record.first_name === '' || record.last_name === '') return;
 contactsStore.addContact(record);
 router.push({ name: 'contacts' });
}
</script>
