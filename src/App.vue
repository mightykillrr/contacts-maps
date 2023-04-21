<template>
 <main
  class="flex items-center justify-center"
  font-sans
  h="full"
  p="x-4 y-10"
  text="center gray-700 dark:gray-200"
  w="full"
 >
  <div border="rounded-xl" class="grid grid-cols-[20%_80%] drop-shadow-md" w="1280px" h="80vh" bg="primary">
   <div border="r-1 bor_thin" class="flex flex-col gap-1" h="full" p="y-3 x-2">
    <RouterLink v-for="tab in tabs" :key="tab.title" v-slot="{ isActive }" :to="{ name: tab.location }">
     <ATab :active="isActive">{{ tab.title }}</ATab>
    </RouterLink>
   </div>
   <!--  Router Render -->
   <!--    src/pages/* define routes/locations  -->
   <div w="full" class="flex flex-col overflow-y-auto" h="full">
    <RouterView v-slot="{ Component }">
     <template v-if="Component">
      <KeepAlive>
       <Suspense>
        <!-- main content -->
        <component :is="Component"></component>

        <!-- loading state -->
        <template #fallback> Loading...</template>
       </Suspense>
      </KeepAlive>
     </template>
    </RouterView>
   </div>
  </div>
 </main>
</template>

<script lang="ts" setup>
import { useContactsStore } from '~/stores/contacts';

const contactsStore = useContactsStore();
const router = useRouter();

onMounted(async () => {
 contactsStore.addFakeContacts();
});

const tabs = [
 {
  title: 'Contacts',
  location: 'contacts',
 },
 {
  title: 'Charts and Maps',
  location: 'charts-maps',
 },
];
</script>
