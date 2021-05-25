<template>
  <div>
    <Sidebar />

    <div :class="$store.state.sidebarShown ? 'container blue' : 'container'" id="main">
      <div v-if="$store.state.counter == $store.state.selectedCoins.length">
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">asset</th>
              <th scope="col">symbol</th>
              <th scope="col">past price</th>
              <th scope="col">current price</th>
              <th scope="col">percentage</th>
              <th scope="col">multiple</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(coin, index) in $store.state.selectedCoins"
              :key="index"
              :class="'align-middle' + getColor(coin)"
            >
              <td>
                <div class="d-flex align-items-center">
                  <CoinIcon :iconUrl="coin.iconUrl" class="me-3" />
                  <div>
                    {{ coin.name }}
                    <span
                      class="text-danger"
                      v-if="coin.launchDate && coin.launchDate > $store.state.startDate"
                    >
                      (*)
                    </span>
                  </div>
                </div>
              </td>
              <td>{{ coin.symbol }}</td>
              <td>
                {{ coin.priceFormatted("historical", $store.state.currency.symbol) }}
              </td>
              <td>
                {{ coin.priceFormatted("current", $store.state.currency.symbol) }}
              </td>
              <td>
                {{ coin.percentageFormatted() }}
              </td>
              <td>
                {{ coin.multipleFormatted() }}
              </td>
            </tr>
          </tbody>
        </table>
        <p>
          <span class="text-danger">(*)</span> These coins did not exist at the starting
          date selected. Instead, the coins' launch prices (the earliest available prices
          on CoinGecko) are used here.
        </p>
      </div>

      <div
        v-if="$store.state.counter != $store.state.selectedCoins.length"
        class="ps-5 pe-5"
      >
        <h3 class="mt-5 mb-3">README</h3>
        <p>
          This site was created to test the thesis that
          <b>
            HODL'ing base layer currencies such as ETH and BTC is a better strategy than
            betting on low cap alts,
          </b>
          because only very few alts will outperfrom BTC and ETH in the long run, and the
          chance that an average investor can correctly picking these is very low.
        </p>
        <p>
          Here, coins that <b>outperformed</b> ETH in the selected timespan by more than
          50% are considered <b>"winners"</b> and colored
          <span class="text-success">green</span>, while those <b>underperformed</b> ETH
          by more than 50% are considered <b>"losers"</b> and colored
          <span class="text-danger">red</span>.
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Coin } from "@/types";
import Sidebar from "@/components/Sidebar.vue";
import CoinIcon from "@/components/CoinIcon.vue";

export default defineComponent({
  name: "App",
  components: { CoinIcon, Sidebar },
  computed: {
    benchmark() {
      const ethereum = this.$store.state.selectedCoins.find((coin) => {
        return coin.id === "ethereum";
      }) as Coin;
      return ethereum.percentage();
    },
  },
  methods: {
    getColor(coin: Coin) {
      if (coin.id === "ethereum") return " table-primary";
      if (!this.benchmark) return "";

      const percentage = coin.percentage();
      console.log(coin.id, percentage, this.benchmark);
      if (!percentage) return " table-secondary";

      const winnerCutoff =
        this.benchmark >= 0 ? this.benchmark * 1.5 : this.benchmark * 0.5;
      if (percentage >= winnerCutoff) return " table-success";

      const loserCutoff =
        this.benchmark >= 0 ? this.benchmark * 0.5 : this.benchmark * 1.5;
      if (percentage < loserCutoff) return " table-danger";

      return "";
    },
  },
});
</script>

<style>
#app {
  font-family: "Roboto", sans-serif;
  color: #222831;
  background-color: #fff;
  min-height: 100vh;
  padding: 2.5rem 5rem 5rem 10rem;
}

#main {
  max-width: 1000px;
  transition: all 0.2s;
}

.blue {
  filter: blur(1rem);
}
</style>
