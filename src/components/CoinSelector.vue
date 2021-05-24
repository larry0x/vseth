<template>
  <div id="coinSelector">
    <div class="d-flex align-items-center mb-2">
      <h2 class="me-auto">Select coins</h2>
      <div class="fs-5 ms-auto">
        <span class="interactive-text" @click="selectAll()">select all</span>
        •
        <span class="interactive-text" @click="deselectAll()">deselect all</span>
      </div>
    </div>
    <div class="row px-2 scroll-box">
      <div
        class="col-4 px-1 mb-2"
        v-for="(coin, index) in $store.state.allCoins"
        :key="index"
      >
        <button
          class="btn btn-lg btn-outline-secondary w-100 d-flex align-items-center"
          :ref="`${coin.id}Selector`"
          @click="toggleCoin(coin.id)"
        >
          <CoinIcon :iconUrl="coin.iconUrl" />
          <div class="ms-3">{{ coin.symbol }}</div>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Coin } from "@/types";
import CoinIcon from "@/components/CoinIcon.vue";

export default defineComponent({
  name: "CoinSelector",
  components: { CoinIcon },
  mounted() {
    if (this.$store.state.selectedCoins.length == 0) {
      this.selectCoin("ethereum");
    } else {
      this.$store.state.selectedCoins.forEach((coin) => {
        (this.$refs[`${coin.id}Selector`] as Element).classList.add("active");
      });
    }

    (this.$refs["ethereumSelector"] as Element).classList.add("uninteractable");
  },
  methods: {
    _getCoinById(id: string) {
      return this.$store.state.allCoins.find((coin) => {
        return coin.id === id;
      }) as Coin;
    },
    toggleCoin(id: string) {
      if ((this.$refs[`${id}Selector`] as Element).classList.contains("active")) {
        this.deselectCoin(id);
      } else {
        this.selectCoin(id);
      }
    },
    selectCoin(id: string) {
      (this.$refs[`${id}Selector`] as Element).classList.add("active");

      const coin = this._getCoinById(id);

      if (!this.$store.state.selectedCoins.includes(coin)) {
        this.$store.state.selectedCoins.push(coin);
        console.log("Selected coin:", id);
      }
    },
    deselectCoin(id: string) {
      if (id === "ethereum") {
        console.log("Ethereum cannot be deselected");
        return;
      }

      (this.$refs[`${id}Selector`] as Element).classList.remove("active");

      const coin = this._getCoinById(id);
      const index = this.$store.state.selectedCoins.indexOf(coin);

      if (index > -1) {
        this.$store.state.selectedCoins.splice(index, 1);
        console.log("Deselected coin:", id);
      }
    },
    selectAll() {
      this.$store.state.allCoins.forEach((coin) => {
        this.selectCoin(coin.id);
      });
    },
    deselectAll() {
      this.$store.state.allCoins.forEach((coin) => {
        this.deselectCoin(coin.id);
      });
    },
  },
});
</script>

<style scoped>
.btn {
  text-align: start;
}

.btn.uninteractable {
  pointer-events: none;
  opacity: 0.5;
}

.interactive-text {
  text-decoration: none;
  color: #fff;
  transition: all 0.25s;
}

.interactive-text:hover {
  color: #d1d5da;
  cursor: pointer;
}

.scroll-box {
  max-height: calc(100vh - 50rem);
  overflow-y: auto;
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #6c757d;
}
</style>
