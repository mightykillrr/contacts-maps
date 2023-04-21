<template>
  <form p="6">
    <div class="grid grid-cols-2 gap-3">
      <AFormItem
        v-model="record.first_name"
        :errors="v$.first_name.$errors"
        label="First Name"
      />
      <AFormItem
        v-model="record.last_name"
        :errors="v$.last_name.$errors"
        label="Last Name"
      />
      <AFormItem
        v-model="record.phone"
        :errors="v$.phone.$errors"
        label="Phone No."
        type="number"
      />
      <AFormItem
        v-model="record.email"
        :errors="v$.email.$errors"
        label="Email"
        type="email"
      />

      <div>
        <p>Status</p>
        <div class="flex gap-3">
          <input
            id="html"
            v-model="record.status"
            type="radio"
            name="status"
            :value="1"
          />
          <label for="html">Active</label><br />
          <input
            id="css"
            v-model="record.status"
            type="radio"
            name="status"
            :value="0"
          />
          <label for="css">Inactive</label><br />
        </div>
      </div>
    </div>

    <AButton
      type="submit"
      bg="white opacity-10"
      class="col-span-2"
      w="42"
      p="2"
      @click.prevent="onSubmit"
    >
      Update
    </AButton>
  </form>
</template>

<script
  setup
  lang="ts"
>
import { useVuelidate } from "@vuelidate/core";
import { email, required } from "@vuelidate/validators";
import { useContactsStore } from "~/stores/contacts";
import type { Contact } from "~/types/structures";

const contactsStore = useContactsStore();
const router = useRouter();
const route = useRoute();

const record = reactive<Contact>({
  id: route.params.id as string,
  first_name: "",
  last_name: "",
  status: 1,
  phone: "",
  email: "",
});

const rules = {
  first_name: { required },
  last_name: { required },
  phone: { required },
  email: {
    required,
    email,
  },
};

onMounted(async () => {
  const id = route.params.id as string;
  if (!id) return router.push({ name: "contacts" });

  const contact = contactsStore.getContact(id);
  if (!contact) return router.push({ name: "contacts" });

  record.first_name = contact.first_name;
  record.last_name = contact.last_name;
  record.status = contact.status;
  record.phone = contact.phone;
  record.email = contact.email;
});

const v$ = useVuelidate(rules, record);

function resetForm() {
  record.first_name = "";
  record.last_name = "";
  record.status = 1;
  record.phone = "";
  record.email = "";
  v$.value.$reset();
}

async function onSubmit() {
  const isFormValid = await v$.value.$validate();
  if (!isFormValid) return;

  contactsStore.updateContact({ ...record });
  await router.push({ name: "contacts" });
  resetForm();
}
</script>
