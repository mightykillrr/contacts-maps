<template>
  <div
    class="flex flex-col-reverse gap-6 md:grid md:grid-cols-[80%_20%] md:flex-row md:gap-2"
    w="full"
    h="full"
  >
    <SkeletonTheme
      v-if="isFetching"
      color="#111315"
      highlight="#3d4043"
      h="full"
      w="full"
    >
      <Skeleton
        :loading="isFetching"
        h="full"
      />
    </SkeletonTheme>
    <div
      ref="chart"
      :class="{ hidden: isFetching }"
      h="full"
      w="full"
    />
    <div
      w="full"
      class="flex flex-col items-center gap-3"
    >
      <SkeletonTheme
        v-if="isFetching"
        color="#111315"
        highlight="#3d4043"
        w="4/6"
      >
        <Skeleton
          :loading="isFetching"
          w="full"
        />
      </SkeletonTheme>
      <span v-else>
    {{ statisticTitle }}
   </span>
      <div
        class="flex items-center gap-3 md:flex-col"
        w="full"
      >
        <AStatistic
          v-for="item in state.items"
          :key="item.type"
          :name="capitalize(item.type)"
          :value="commaFormatter(item.value)"
          :color="item.color"
          :loading="isFetching"
        />
      </div>
    </div>
  </div>
</template>

<script
  setup
  lang="ts"
>
import { Line, type LineOptions } from "@antv/g2plot";
import { useQuery } from "@tanstack/vue-query";
import dayjs from "dayjs";
import { Skeleton, SkeletonTheme } from "vue-loading-skeleton";
import type { ChartData, HistoricalData, InitialHistoricalData } from "~/types/structures";
import { DataType, LineColors } from "~/types/structures";

const URL = "https://disease.sh/v3/covid-19/historical/all?lastdays=all";
const chart = ref<HTMLDivElement>();

function formatData(data: InitialHistoricalData[DataType], type: DataType): ChartData {
  return Object.entries(data).map(([date, value]) => ({
    date,
    type,
    value,
  }));
}

async function fetchData(): Promise<InitialHistoricalData> {
  //  Testing loading states
  // await new Promise(resolve => setTimeout(resolve, 5000));
  return fetch(URL).then(res => res.json());
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function commaFormatter(val: number) {
  return new Intl.NumberFormat("en-US").format(val);
}

let line: Line;

// TanStack Query
// !! Updated `data` from `onSuccess` hook !! //
const { isFetching } = useQuery({
  queryKey: ["case_fluctuation"],
  queryFn: fetchData,
  initialData: {
    cases: {},
    deaths: {},
    recovered: {},
  },
  onSuccess({
    deaths,
    cases,
    recovered,
  }) {
    const data = [
      ...formatData(cases, DataType.Cases),
      ...formatData(deaths, DataType.Deaths),
      ...formatData(recovered, DataType.Recovered),
    ];
    line.update({ data });

    // TODO: Data is not sorted by date. Add sort function.
    const lastData = data[data.length - 1];
    const point = line.chart.getXY(lastData);

    line.chart.showTooltip(point);

    return data;
  },
});

// Docs/Examples attached for future reference
// https://g2plot.antv.antgroup.com/en/api/plots/line
// https://g2plot.antv.antgroup.com/en/examples/case/statistical-scenario/#trend
const options: LineOptions = {
  data: [],
  autoFit: true,
  xField: "date",
  yField: "value",
  seriesField: "type",
  xAxis: {
    type: "cat",
    label: {
      autoRotate: false,
      formatter: (v: string) => {
        const [month, date, year] = v.split("/");
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
    shape: "circle",
    size: 2,
    style: () => {
      return {
        fillOpacity: 0,
        stroke: "transparent",
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
              stroke: "#000",
              lineWidth: 1,
            },
          },
        },
      },
    },
  },
  interactions: [{ type: "marker-active" }, { type: "brush" }],
};

// Card Data for currently hovered timeline on chart
const state = reactive<{
  items: Array<HistoricalData & { color: string }>;
  date: string;
}>({
  items: [
    {
      date: "<placeholder>",
      type: DataType.Cases,
      value: 0,
      color: LineColors.Cases,
    },
    {
      date: "<placeholder>",
      type: DataType.Deaths,
      value: 0,
      color: LineColors.Deaths,
    },
    {
      date: "<placeholder>",
      type: DataType.Recovered,
      value: 0,
      color: LineColors.Recovered,
    },
  ],
  date: "<placeholder>",
});

// Current hovered Data date getter
const statisticTitle = computed(() => {
  return dayjs(state.date, "M/D/YY").format("MMMM DD, YYYY");
});

onMounted(() => {
  if (!chart.value) return;

  line = new Line(chart.value, options);
  line.render();

  // TODO: types missing
  line.on("tooltip:change", (e) => {
    const {
      data: {
        items,
        title,
      },
    } = e;
    state.date = title;
    // items[n].item.data => HistoricalData type
    state.items = items.map(item => ({
      ...item.data,
      color: item.color,
    }));
  });
});
</script>
