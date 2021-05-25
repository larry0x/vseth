<template>
  <nav
    id="sidebar"
    class="position-fixed p-4"
    :style="$store.state.sidebarShown ? {} : { width: '5rem!important' }"
  >
    <transition name="fade">
      <div id="overlayContainer" v-if="overlayShown">
        <div id="progress" class="progress w-100">
          <div
            ref="progressBar"
            id="progressBar"
            class="progress-bar progress-bar-striped progress-bar-animated fs-3"
            role="progressbar"
          ></div>
        </div>
        <div
          ref="overlayErrorMsg"
          id="overlayErrorMsg"
          class="text-center text-danger fs-5 pt-3 pb-3 px-2 mt-3 bg-light d-none"
        >
          If you request price data too frequently, CoinGecko may temporarily ban your IP
          address. Wait a minute and try again.
        </div>
      </div>
    </transition>

    <transition name="fade">
      <div id="sidebarExtended" v-if="showExtended">
        <div class="d-flex align-items-center mt-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            class="sidebar-toggler ms-auto"
            @click="hideSidebar()"
          >
            <path
              fill-rule="evenodd"
              d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
            />
            <path
              fill-rule="evenodd"
              d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
            />
          </svg>
        </div>

        <CurrencySelector class="w-100 mb-4" />
        <DateSelector class="w-100 mb-4" />
        <CoinSelector class="w-100 mb-4" />

        <button class="btn btn-lg btn-success" @click="fetchHistoricalPrices()">
          Submit
        </button>

        <div id="footer" class="text-center">
          <a href="https://github.com/0xlarry" target="_blank" rel="noopener noreferrer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="github-icon"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"
              />
            </svg>
          </a>
        </div>
      </div>
    </transition>

    <transition name="fade">
      <div id="sidebarCollapsed" class="mt-2" v-if="showCollapsed">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          class="sidebar-toggler"
          style="transform: translateX(-0.56rem)"
          @click="showSidebar()"
        >
          <path
            fill-rule="evenodd"
            d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"
          />
          <path
            fill-rule="evenodd"
            d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"
          />
        </svg>
      </div>
    </transition>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Coin } from "@/types";
import axios from "axios";
import axiosRetry from "axios-retry";
import CoinSelector from "@/components/CoinSelector.vue";
import CurrencySelector from "@/components/CurrencySelector.vue";
import DateSelector from "@/components/DateSelector.vue";

axiosRetry(axios, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
});

const _formatDate = (date: Date) => {
  let year = date.getFullYear();
  let month = (1 + date.getMonth()).toString().padStart(2, "0");
  let day = date.getDate().toString().padStart(2, "0");
  return `${day}-${month}-${year}`; // CoinGecko API date format: dd-mm-yyyy
};

export default defineComponent({
  name: "Sidebar",
  components: { CoinSelector, CurrencySelector, DateSelector },
  data() {
    return {
      overlayShown: false,
      overlayError: false,
      showExtended: true,
      showCollapsed: false,
    };
  },
  methods: {
    showSidebar() {
      this.$store.state.sidebarShown = true;
      this.showCollapsed = false;
      setTimeout(() => {
        this.showExtended = true;
      }, 200);

      console.log("Sidebar shown");
    },
    hideSidebar() {
      this.$store.state.sidebarShown = false;
      this.showExtended = false;
      setTimeout(() => {
        this.showCollapsed = true;
      }, 200);

      console.log("Sidebar hidden");
    },
    showOverlay() {
      this.overlayShown = true;
      console.log("Overlay shown");
    },
    hideOverlay() {
      this.overlayShown = false;
      console.log("Overlay hidden");
    },
    updateProgreeBar() {
      if (!this.overlayError) {
        const progressBar = this.$refs.progressBar as HTMLElement;
        const percentage =
          Math.ceil(
            (100 * this.$store.state.counter) / this.$store.state.selectedCoins.length
          ).toString() + "%";

        progressBar.innerHTML = percentage;
        progressBar.style.width = percentage;

        console.log("Updated progress bar:", percentage);
      }
    },
    setProgressBarError() {
      const progressBar = this.$refs.progressBar as HTMLElement;
      progressBar.innerHTML = "ERROR";
      progressBar.style.width = "100%";
      progressBar.classList.add("bg-danger");
      progressBar.classList.remove("progress-bar-striped");
      progressBar.classList.remove("progress-bar-animated");

      const errorMsg = this.$refs.overlayErrorMsg as HTMLElement;
      errorMsg.classList.remove("d-none");

      this.overlayError = true;
    },
    _getCoinById(id: string) {
      return this.$store.state.allCoins.find((coin) => {
        return coin.id === id;
      }) as Coin;
    },
    fetchCurrentPrices() {
      let currency = this.$store.state.currency;

      // fetch market cap of coins, then sort from descendingly
      let ids = "";
      this.$store.state.allCoins.forEach((coin) => {
        ids += coin.id + "%2C";
      });

      axios
        .get(
          `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=${currency.id}&include_market_cap=true`
        )
        .then((response) => {
          // Dump current prices in store
          for (let id of Object.keys(response.data)) {
            this._getCoinById(id).addCurrentPrice(response.data[id][currency.id]);
          }

          this.$store.state.allCoins.forEach((coin) => {
            console.log(
              `Current price for ${coin.symbol}: ${currency.symbol}${coin.price.current}`
            );
          });

          // Sort coins by market cap
          this.$store.state.allCoins.sort((a, b) => {
            return response.data[a.id][`${currency.id}_market_cap`] <
              response.data[b.id][`${currency.id}_market_cap`]
              ? 1
              : -1;
          });
        });
    },
    fetchHistoricalPrices() {
      const currency = this.$store.state.currency;

      this.$store.state.counter = 0;
      this.showOverlay();

      this.$store.state.selectedCoins.forEach((coin) => {
        // for Aave, we fetch the price of LEND, and multiply it by 100
        const id = coin.id === "aave" ? "ethlend" : coin.id;

        // If the coin was launched *after* the start date, then we use the launch date;
        // otherwise, we use the user-set start date.
        const date =
          coin.launchDate.getTime() > this.$store.state.startDate.getTime()
            ? coin.launchDate
            : this.$store.state.startDate;

        const formattedDate = _formatDate(date);

        axios
          .get(
            `https://api.coingecko.com/api/v3/coins/${id}/history?date=${formattedDate}`
          )
          .then((response) => {
            try {
              coin.addHistoricalPrice(
                id === "ethlend"
                  ? response.data.market_data.current_price[currency.id] * 100
                  : response.data.market_data.current_price[currency.id]
              );
            } catch {
              coin.addHistoricalPrice(null);
            }

            if (coin.price.historical) {
              console.log(
                `Historical price for ${coin.symbol}: ${currency.symbol}${coin.price.historical}`
              );
            } else {
              console.log(
                `Error fetching historical price for ${coin.symbol} on ${formattedDate}`
              );
            }

            this.$store.state.counter += 1;
            this.updateProgreeBar();

            if (this.$store.state.counter === this.$store.state.selectedCoins.length) {
              this.hideSidebar();

              setTimeout(() => {
                this.hideOverlay();
              }, 200);

              console.log("Finished fetching historical prices!");

              // Once finished, sort all coins by performance
              this.sortCoinsByPerformance();
            }
          })
          .catch(() => {
            this.setProgressBarError();
          });
      });
    },
    sortCoinsByPerformance() {
      this.$store.state.selectedCoins.sort((a, b) => {
        let aPerf = a.multiple();
        let bPerf = b.multiple();
        if (!aPerf) return 1;
        if (!bPerf || aPerf > bPerf) return -1;
        return 1;
      });

      console.log("Sorted coins by performance!");
    },
  },
  computed: {
    currencySymbol() {
      return this.$store.state.currency.symbol;
    },
  },
  watch: {
    currencySymbol() {
      this.fetchCurrentPrices();
    },
  },
});
</script>

<style scoped>
#sidebar {
  width: 36rem;
  min-height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 98;
  transition: all 0.2s;
  background-color: #393e46;
  color: #fff;
  box-shadow: 10px 0px 20px -2px rgba(0, 0, 0, 0.19), 6px 0px 6px -2px rgba(0, 0, 0, 0.23);
}

#sidebar.collapsed {
  width: 5rem !important;
  padding: 0;
}

#sidebar:hover {
  box-shadow: 10px 0px 20px 0px rgba(0, 0, 0, 0.19), 6px 0px 6px 0px rgba(0, 0, 0, 0.23);
}

#overlayContainer {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding-top: 35vh;
  padding-left: 5rem;
  padding-right: 5rem;
  background-color: rgba(245, 245, 245, 0.7);
  z-index: 99999;
  text-align: center;
  transition: all 0.25s;
}

#progress {
  height: 5rem;
  box-shadow: rgba(0, 0, 0, 0.56) 0px 20px 70px 4px;
}

#progressBar {
  width: 0%;
}

#overlayErrorMsg {
  border-radius: 0.25rem;
  box-shadow: rgba(0, 0, 0, 0.56) 0px 20px 70px 4px;
}

#footer {
  position: absolute;
  left: 16.5rem;
  bottom: 1.5rem;
}

a {
  text-decoration: none;
  color: #fff;
  transition: all 0.2s;
}

a:hover {
  color: #d1d5da;
}

svg {
  fill: #fff;
  transition: all 0.25s;
}

svg:hover {
  fill: #d1d5da;
  cursor: pointer;
}

.fade-enter-active {
  transition: opacity 0.2s linear;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.sidebar-toggler {
  width: 3rem;
  height: 3rem;
}

.github-icon {
  width: 3rem;
  height: 3rem;
}
</style>
