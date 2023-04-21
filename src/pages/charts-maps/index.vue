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
          v-for="tab in tabs"
          :key="tab"
          v-slot="{ selected }"
          w="full"
        >
          <ATab
            w="full"
            p="1"
            :active="selected"
          >
            {{ tab }}
          </ATab>
        </HTab>
      </HTabList>

      <HTabPanels
        h="full"
      >
        <HTabPanel
          v-for="(comp, idx) in contents"
          :key="idx"
          class="focus:outline-none"
          p="y-3"
          h="84"
          :unmount="false"
        >
          <component
            :is="comp"
          />
        </HTabPanel>
      </HTabPanels>
    </HTabGroup>
  </div>
</template>

<script
  setup
  lang="ts"
>
import CaseFluctuation from "./components/CaseFluctuation.vue";
import LeafletMap from "~/pages/charts-maps/components/LeafletMap.vue";

const tabs = ["Case Fluctuation", "Worldwide Cases"];
const contents = [CaseFluctuation, LeafletMap];
</script>
