<template>
  <div
    h="full"
    w="full"
    p="4"
  >
    <HTabGroup>
      <HTabList
        class="flex rounded-xl space-x-1"
        w="full"
        m="b-6"
      >
        <HTab
          v-for="{ title } in tabs"
          :key="title"
          v-slot="{ selected }"
          w="full"
        >
          <ATab
            w="full"
            p="1"
            :active="selected"
          >
            {{ title }}
          </ATab>
        </HTab>
      </HTabList>

      <HTabPanels h="full">
        <HTabPanel
          v-for="({ content }, idx) in tabs"
          :key="idx"
          class="focus:outline-none"
          p="y-0.5"
          h="84"
          :unmount="false"
        >
          <Component :is="content" />
        </HTabPanel>
      </HTabPanels>
    </HTabGroup>
  </div>
</template>

<script
  setup
  lang="ts"
>
import type { Component } from "vue";
import CaseFluctuation from "./components/CaseFluctuation.vue";
import LeafletMap from "./components/LeafletMap.vue";

const tabs = [
  {
    title: "Case Fluctuation",
    content: CaseFluctuation as Component,
  },
  {
    title: "Worldwide Cases",
    content: LeafletMap as Component,
  },
];
</script>
