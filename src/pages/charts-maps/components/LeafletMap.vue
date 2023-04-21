<template>
  <span v-if="isFetching">Loading...</span>
  <LMap
    v-else
    ref="map"
    v-model:zoom="zoom"
    class="rounded"
    :use-global-leaflet="false"
    :center="[47.41322, -1.219482]"
  >
    <LTileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      layer-type="base"
      name="OpenStreetMap"
    />

    <LMarker
      v-for="{ updated, countryInfo, country } in data"
      :key="updated"
      :lat-lng="[countryInfo.lat, countryInfo.long]"
    >
      <LPopup>{{ country }}</LPopup>
    </LMarker>
  </LMap>
</template>

<script
  setup
  lang="ts"
>
import { useQuery } from "@tanstack/vue-query";
import { LMap, LMarker, LPopup, LTileLayer } from "@vue-leaflet/vue-leaflet";
import { type CountryCaseData } from "~/types/structures";

const zoom = 2;

const URL = "https://disease.sh/v3/covid-19/countries";

async function fetchData() {
  return fetch(URL).then(res => res.json());
}

const {
  isFetching,
  data,
} = useQuery<Array<CountryCaseData>>({
  queryFn: fetchData,
  queryKey: ["country_data"],
  initialData: [],
});
</script>
