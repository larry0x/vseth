<template>
  <div id="currencySelector">
    <h2 class="mb-3">Select currency</h2>
    <div class="row px-2">
      <div class="col-6 px-1 mb-2">
        <button
          class="btn btn-lg btn-outline-secondary w-100 d-flex align-items-center"
          ref="usdSelector"
          @click="selectCurrency('usd')"
        >
          <img src="flags/us.png" class="flag-icon" />
          <div class="ms-3 me-auto">US Dollar</div>
          <div class="ms-auto">$</div>
        </button>
      </div>
      <div class="col-6 px-1 mb-2">
        <button
          class="btn btn-lg btn-outline-secondary w-100 d-flex align-items-center"
          ref="eurSelector"
          @click="selectCurrency('eur')"
        >
          <img src="flags/eu.png" class="flag-icon" />
          <div class="ms-3 me-auto">Euro</div>
          <div class="ms-auto">€</div>
        </button>
      </div>
      <div class="col-6 px-1 mb-2">
        <button
          class="btn btn-lg btn-outline-secondary w-100 d-flex align-items-center"
          ref="btcSelector"
          @click="selectCurrency('btc')"
        >
          <CoinIcon :iconUrl="'icons/btc.png'" class="coin-icon" />
          <div class="ms-3 me-auto">Bitcoin</div>
          <div class="ms-auto">฿</div>
        </button>
      </div>
      <div class="col-6 px-1 mb-2">
        <button
          class="btn btn-lg btn-outline-secondary w-100 d-flex align-items-center"
          ref="ethSelector"
          @click="selectCurrency('eth')"
        >
          <CoinIcon :iconUrl="'icons/eth.png'" class="coin-icon" />
          <div class="ms-3 me-auto">Ether</div>
          <div class="ms-auto">Ξ</div>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CoinIcon from "@/components/CoinIcon.vue";

export default defineComponent({
  name: "CurrencySelector",
  components: { CoinIcon },
  mounted() {
    // Set currency as usd if currency has not been set before
    // else, set the button of the selected currency active
    const id = this.$store.state.currency.id;
    if (id == "") {
      this.selectCurrency("usd");
    } else {
      (this.$refs[`${id}Selector`] as Element).classList.add("active");
    }
  },
  methods: {
    selectCurrency(currencyId: string) {
      ["usd", "eur", "btc", "eth"].forEach((id) => {
        (this.$refs[`${id}Selector`] as Element).classList.remove("active");
      });

      (this.$refs[`${currencyId}Selector`] as Element).classList.add("active");

      if (currencyId === "usd") {
        this.$store.state.currency = {
          id: "usd",
          symbol: "$",
        };
      } else if (currencyId === "eur") {
        this.$store.state.currency = {
          id: "eur",
          symbol: "€",
        };
      } else if (currencyId === "btc") {
        this.$store.state.currency = {
          id: "btc",
          symbol: "฿",
        };
      } else if (currencyId === "eth") {
        this.$store.state.currency = {
          id: "eth",
          symbol: "Ξ",
        };
      }

      console.log("Selected currency:", this.$store.state.currency.id);
    },
  },
});
</script>

<style scoped>
.btn {
  text-align: start;
}

.flag-icon {
  height: 2.4rem;
  width: 3.2rem;
}

.coin-icon {
  margin-left: 0.4rem;
  margin-right: 0.4rem;
}
</style>
