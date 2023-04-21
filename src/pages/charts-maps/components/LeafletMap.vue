<template>
 <SkeletonTheme v-if="isFetching" color="#111315" highlight="#3d4043" h="full" w="full">
  <Skeleton :loading="isFetching" h="full" />
 </SkeletonTheme>
 <LMap v-else v-model:zoom="zoom" class="rounded" :use-global-leaflet="false" :center="[47.41322, -1.219482]">
  <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" layer-type="base" name="OpenStreetMap" />

  <LMarker
   v-for="{ updated, countryInfo, country, active, recovered, deaths } in data"
   :key="updated"
   :lat-lng="[countryInfo.lat, countryInfo.long]"
  >
   <LPopup>
    <div w="48">
     <ADescription label="Country">
      {{ country }}
     </ADescription>
     <ADescription label="Active Cases">
      {{ active }}
     </ADescription>
     <ADescription label="Recovered">
      {{ recovered }}
     </ADescription>
     <ADescription label="Deaths">
      {{ deaths }}
     </ADescription>
    </div>
   </LPopup>
  </LMarker>
 </LMap>
</template>

<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { LMap, LMarker, LPopup, LTileLayer } from '@vue-leaflet/vue-leaflet';
import { Skeleton, SkeletonTheme } from 'vue-loading-skeleton';
import ADescription from '~/components/ADescription.vue';
import { type CountryCaseData } from '~/types/structures';

const zoom = 1.5;
const URL = 'https://disease.sh/v3/covid-19/countries';

async function fetchData() {
 return fetch(URL).then(res => res.json());
}

// TanStack Query computed values
const { isFetching, data } = useQuery<Array<CountryCaseData>>({
 queryFn: fetchData,
 queryKey: ['country_data'],
 initialData: [],
});
</script>
