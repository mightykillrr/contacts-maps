<template>
  <div
    class="flex"
    h="full"
    w="full"
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
      :style="{ display: isFetching ? 'none' : 'block' }"
      h="full"
      w="9/12"
    />
    <div
      w="3/12"
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
  await new Promise(resolve => setTimeout(resolve, 5000));
  return fetch(URL).then(res => res.json());
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function commaFormatter(val: number) {
  return new Intl.NumberFormat("en-US").format(val);
}

let line: Line;

const {
  isFetching,
  isFetched,
} = useQuery({
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

const state = reactive<{
  items: Array<HistoricalData & { color: string }>;
  date: string;
}>({
  items: [
    {
      date: "Loading...",
      type: DataType.Cases,
      value: 0,
      color: LineColors.Cases,
    },
    {
      date: "Loading...",
      type: DataType.Deaths,
      value: 0,
      color: LineColors.Deaths,
    },
    {
      date: "Loading...",
      type: DataType.Recovered,
      value: 0,
      color: LineColors.Recovered,
    },
  ],
  date: "Loading...",
});

const statisticTitle = computed(() => {
  return dayjs(state.date, "M/D/YY").format("MMMM DD, YYYY");
});

onMounted(() => {
  if (!chart.value) return;
  line = new Line(chart.value, options);
  line.render();
  line.on("tooltip:change", (e) => {
    const {
      data: {
        items,
        title,
      },
    } = e;
    state.date = title;
    state.items = items.map(item => ({
      ...item.data,
      color: item.color,
    }));

    console.log({ wee: state.items });
  });
});
</script>
