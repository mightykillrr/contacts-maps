<template>
  <main
    class="flex items-center justify-center"
    font-sans
    h="full"
    p="2 xl:12"
    text="center gray-700 dark:gray-200"
    w="full"
  >
    <div
      border="rounded-xl"
      class="flex flex-col drop-shadow-md lg:grid lg:grid-cols-[20%_80%]"
      w="1280px"
      h="full"
      bg="primary"
    >
      <div
        border="b-1 bor_thin lg:r-1 lg:b-0"
        class="flex gap-1 lg:flex-col 2xl:gap-3"
        w="full"
        p="2 2xl:4"
      >
        <RouterLink
          v-for="tab in tabs"
          :key="tab.title"
          w="full"
          :to="{ name: tab.location }"
        >
          <ATab
            w="full"
            :active="$route.path.includes(tab.location)"
          >
            {{ tab.title }}
          </ATab>
        </RouterLink>
      </div>
      <!--  Router Render -->
      <!--    src/pages/* define routes/locations  -->
      <div
        w="full"
        class="flex flex-col overflow-y-auto"
        h="full"
      >
        <RouterView v-slot="{ Component }">
          <template v-if="Component">
            <Suspense>
              <!-- main content -->
              <component :is="Component"></component>

              <!-- loading state -->
              <template #fallback> Loading...</template>
            </Suspense>
          </template>
        </RouterView>
      </div>
    </div>
  </main>
</template>

<script
  lang="ts"
  setup
>
import { useContactsStore } from "~/stores/contacts";

const contactsStore = useContactsStore();
const router = useRouter();

onMounted(async () => {
  contactsStore.addFakeContacts();
});

const tabs = [
  {
    title: "Contacts",
    location: "contacts",
  },
  {
    title: "Charts and Maps",
    location: "charts-maps",
  },
];
</script>
