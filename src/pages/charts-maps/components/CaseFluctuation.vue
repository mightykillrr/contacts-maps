<template>
 <span v-if="isLoading">Loading...</span>
 <div class="flex" w="full">
  <div ref="chart" w="9/12"></div>
  <div w="3/12" class="flex flex-col">
   <span>{{ statisticTitle }}</span>
   <Statistic
    v-for="item in state.items"
    :key="item.type"
    :name="capitalize(item.type)"
    :value="commaFormatter(item.value)"
   />
  </div>
 </div>
</template>

<script setup lang="ts">
import { Line, type LineOptions } from '@antv/g2plot';
import { useQuery } from '@tanstack/vue-query';
import dayjs from 'dayjs';
import Statistic from '~/components/Statistic.vue';
import type { ChartData, HistoricalData, InitialHistoricalData } from '~/types/structures';
import { DataType, LineColors } from '~/types/structures';

const URL = 'https://disease.sh/v3/covid-19/historical/all?lastdays=all';
const chart = ref<HTMLDivElement>();

function formatData(data: InitialHistoricalData[DataType], type: DataType): ChartData {
 return Object.entries(data).map(([date, value]) => ({
  date,
  type,
  value,
 }));
}

async function fetchData(): Promise<InitialHistoricalData> {
 return fetch(URL).then(res => res.json());
}

function capitalize(s: string) {
 return s.charAt(0).toUpperCase() + s.slice(1);
}

function commaFormatter(val: number) {
 return new Intl.NumberFormat('en-US').format(val);
}

const initialData = await fetchData();

const { isLoading } = useQuery({
 queryKey: [],
 queryFn: fetchData,
});

const data: ChartData = [
 ...formatData(initialData.cases, DataType.Cases),
 ...formatData(initialData.deaths, DataType.Deaths),
 ...formatData(initialData.recovered, DataType.Recovered),
];

const options: LineOptions = {
 data,
 autoFit: true,
 xField: 'date',
 yField: 'value',
 seriesField: 'type',
 xAxis: {
  type: 'cat',
  label: {
   autoRotate: false,
   formatter: (v: string) => {
    const [month, date, year] = v.split('/');
    return `${date}-${month}-20${year}`;
   },
  },
 },
 color: ({ type }) => {
  switch (type) {
   case DataType.Cases:
    return LineColors.Cases;
   case DataType.Deaths:
    return LineColors.Deaths;
   case DataType.Recovered:
    return LineColors.Recovered;
   default:
    return LineColors.Other;
  }
 },
 yAxis: {
  grid: {
   line: {
    style: {
     lineWidth: 0.5,
    },
   },
  },
 },
 point: {
  shape: 'circle',
  size: 2,
  style: () => {
   return {
    fillOpacity: 0,
    stroke: 'transparent',
   };
  },
 },
 appendPadding: [0, 0, 0, 0],
 legend: false,
 smooth: true,
 lineStyle: {
  lineWidth: 1.5,
 },
 tooltip: {
  showMarkers: false,
  follow: false,
  showContent: false,
  showCrosshairs: true,
 },
 theme: {
  geometries: {
   point: {
    circle: {
     active: {
      style: {
       r: 4,
       fillOpacity: 1,
       stroke: '#000',
       lineWidth: 1,
      },
     },
    },
   },
  },
 },
 interactions: [{ type: 'marker-active' }, { type: 'brush' }],
};
let line: Line;

const state = reactive<{
 items: Array<HistoricalData & { color: string }>;
 date: string;
}>({
 items: [
  {
   date: 'Loading...',
   type: DataType.Cases,
   value: 0,
   color: LineColors.Cases,
  },
  {
   date: 'Loading...',
   type: DataType.Deaths,
   value: 0,
   color: LineColors.Deaths,
  },
  {
   date: 'Loading...',
   type: DataType.Recovered,
   value: 0,
   color: LineColors.Recovered,
  },
 ],
 date: 'Loading...',
});

const statisticTitle = computed(() => {
 return dayjs(state.date, 'M/D/YY').format('MMMM DD, YYYY');
});

onMounted(() => {
 if (!chart.value) return;
 line = new Line(chart.value, options);
 line.render();
 line.on('tooltip:change', e => {
  const {
   data: { items, title },
  } = e;
  state.date = title;
  state.items = items.map(item => ({
   ...item.data,
   color: item.color,
  }));
 });
 const lastData = data[data.length - 1];
 const point = line.chart.getXY(lastData);
 line.chart.showTooltip(point);
});
</script>
