<template>
  <img :src="iconUrl" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CoinIcon",
  props: {
    iconUrl: String,
  },
});
</script>

<style scoped>
img {
  height: 2.4rem;
  width: 2.4rem;
  border-radius: 100%;
  background-color: #fff;
  box-shadow: 0 0 0 2px #dfe8f9;
}
</style>
