<template>
 <main
  class="flex items-center justify-center"
  font-sans
  h="full"
  p="x-4 y-10"
  text="center gray-700 dark:gray-200"
  w="full"
 >
  <div border="1 rounded" class="grid grid-cols-[20%_80%]" w="1280px" h="80vh">
   <div border="r-1" class="flex flex-col gap-1" h="full" p="y-3">
    <RouterLink :to="{ name: 'contacts' }">
     <Tab>Contacts</Tab>
    </RouterLink>
    <RouterLink :to="{ name: 'charts-maps' }">
     <Tab>Charts and Maps</Tab>
    </RouterLink>
   </div>
   <div w="full" class="flex flex-col overflow-y-scroll" h="full">
    <Suspense>
     <RouterView />
    </Suspense>
   </div>
  </div>
 </main>
</template>

<script lang="ts" setup></script>
