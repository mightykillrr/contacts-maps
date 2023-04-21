<template>
  <div
    class="flex flex-col items-center"
    border="1 rounded"
    text="inactive"
    w="4/6"
    p="2"
    :style="{
      borderColor: color,
      backgroundColor: hexToRGB(color, '0.1'),
      color,
    }"
  >
    <span>{{ name }}</span>
    <span>{{ value }}</span>
  </div>
</template>

<script
  setup
  lang="ts"
>
defineProps<{
  name: string;
  value: string | number;
  color: string;
}>();

function hexToRGB(hex: string, alpha: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  if (alpha)
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;

  return `rgb(${r}, ${g}, ${b})`;
}
</script>
