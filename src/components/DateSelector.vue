<template>
  <div id="dateSelector">
    <h2 class="mb-3">Select start date</h2>
    <div class="row px-2">
      <div class="col-6 px-1 mb-2">
        <button
          class="btn btn-lg btn-outline-secondary w-100 d-flex align-items-center"
          ref="7dSelector"
          @click="selectStartDate('7d')"
        >
          <div class="me-auto">7d</div>
          <div class="ms-auto" ref="7dStartDate"></div>
        </button>
      </div>
      <div class="col-6 px-1 mb-2">
        <button
          class="btn btn-lg btn-outline-secondary w-100 d-flex align-items-center"
          ref="30dSelector"
          @click="selectStartDate('30d')"
        >
          <div class="me-auto">30d</div>
          <div class="ms-auto" ref="30dStartDate"></div>
        </button>
      </div>
      <div class="col-6 px-1 mb-2">
        <button
          class="btn btn-lg btn-outline-secondary w-100 d-flex align-items-center"
          ref="90dSelector"
          @click="selectStartDate('90d')"
        >
          <div class="me-auto">90d</div>
          <div class="ms-auto" ref="90dStartDate"></div>
        </button>
      </div>
      <div class="col-6 px-1 mb-2">
        <button
          class="btn btn-lg btn-outline-secondary w-100 d-flex align-items-center"
          ref="180dSelector"
          @click="selectStartDate('180d')"
        >
          <div class="me-auto">180d</div>
          <div class="ms-auto" ref="180dStartDate"></div>
        </button>
      </div>
      <div class="col-6 px-1 mb-2">
        <button
          class="btn btn-lg btn-outline-secondary w-100 d-flex align-items-center"
          ref="365dSelector"
          @click="selectStartDate('365d')"
        >
          <div class="me-auto">365d</div>
          <div class="ms-auto" ref="365dStartDate"></div>
        </button>
      </div>
      <div class="col-6 px-1 mb-2">
        <button
          class="btn btn-lg btn-outline-secondary w-100 d-flex align-items-center"
          ref="ytdSelector"
          @click="selectStartDate('ytd')"
        >
          <div class="me-auto">YTD</div>
          <div class="ms-auto" ref="ytdStartDate"></div>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

const today = new Date();
const dates: { [key: string]: Date } = {
  "7d": new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000),
  "30d": new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000),
  "90d": new Date(today.getTime() - 90 * 24 * 60 * 60 * 1000),
  "180d": new Date(today.getTime() - 180 * 24 * 60 * 60 * 1000),
  "365d": new Date(today.getTime() - 365 * 24 * 60 * 60 * 1000),
  ytd: new Date(today.getFullYear(), 0, 1),
};

let selectedDateId = "";

export default defineComponent({
  name: "DataSelector",
  data() {
    return { dates };
  },
  mounted() {
    ["7d", "30d", "90d", "180d", "365d", "ytd"].forEach((id) => {
      const date: Date = this.dates[id];
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      (this.$refs[`${id}StartDate`] as Element).innerHTML = `${month}/${day}/${year}`;
    });

    if (selectedDateId == "") {
      this.selectStartDate("7d");
    } else {
      (this.$refs[`${selectedDateId}Selector`] as Element).classList.add("active");
    }
  },
  methods: {
    selectStartDate(dateId: string) {
      ["7d", "30d", "90d", "180d", "365d", "ytd"].forEach((id) => {
        (this.$refs[`${id}Selector`] as Element).classList.remove("active");
      });

      (this.$refs[`${dateId}Selector`] as Element).classList.add("active");

      this.$store.state.startDate = this.dates[dateId];
      selectedDateId = dateId;

      console.log("Selected start date:", selectedDateId);
    },
  },
});
</script>

<style scoped>
.btn {
  text-align: start;
}
</style>
