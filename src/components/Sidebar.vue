<template>
  <nav
    id="sidebar"
    class="position-fixed pt-3 pb-3 ps-4 pe-2"
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
        <div class="d-flex align-items-center mt-2 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            class="logo-icon color-cycle"
          >
            <path
              d="M 12.7469 8.15 L 8 11.05 L 3.25 8.15 L 8 0 l 4.7469 8.15 z M 8 11.9813 L 3.25 9.0813 L 8 16 l 4.75 -6.9188 l -4.75 2.9 z"
            />
          </svg>
          <span class="logo-text ms-2">vseth</span>
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

        <div class="scroll-box pe-3 mb-3">
          <CurrencySelector class="w-100 mb-4" />
          <DateSelector class="w-100 mb-4" />
          <CoinSelector class="w-100" />
        </div>

        <button class="btn btn-lg btn-success" @click="fetchHistoricalPrices()">
          Submit
        </button>

        <div id="footer" class="text-center">
          <a
            href="https://github.com/0xlarry/vseth"
            target="_blank"
            rel="noopener noreferrer"
            class="me-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="social-media-icon"
              viewBox="0 0 16 16"
            >
              <path
                d="M 8 0 C 3.5815 0 0 3.5815 0 8 c 0 4.4185 3.582 8 8 8 c 4.4185 0 8 -3.5815 8 -8 C 16 3.5815 12.4185 0 8 0 z M 9.0335 9.48 c 0.1665 0.1445 0.296 0.654 0.296 0.888 v 2.072 h -1.1825 h -1.184 c 0 0 0.0035 -0.7025 0 -1.184 c -1.62 0.3485 -2.072 -0.888 -2.072 -0.888 C 4.595 9.776 4.299 9.48 4.299 9.48 c -0.592 -0.3515 0 -0.296 0 -0.296 c 0.592 0 0.888 0.592 0.888 0.592 c 0.5195 0.882 1.444 0.74 1.776 0.592 c 0 -0.296 0.1295 -0.7435 0.296 -0.888 c -1.293 -0.1455 -2.369 -0.888 -2.369 -2.368 c 0 -1.48 0.297 -1.776 0.593 -2.072 c -0.06 -0.146 -0.3075 -0.685 0.009 -1.48 c 0 0 0.5815 0 1.1735 0.888 c 0.2935 -0.2935 1.184 -0.296 1.4805 -0.296 c 0.2955 0 1.1865 0.0025 1.4795 0.296 c 0.592 -0.888 1.175 -0.888 1.175 -0.888 c 0.3165 0.795 0.069 1.334 0.009 1.48 c 0.296 0.296 0.592 0.592 0.592 2.072 C 11.402 8.592 10.327 9.3345 9.0335 9.48 z"
              />
            </svg>
          </a>
          <a
            href="https://twitter.com/_0x_larry"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="social-media-icon"
              viewBox="0 0 16 16"
            >
              <path
                d="M 8 0 c 4.4153 0 8 3.5847 8 8 c 0 4.4153 -3.5847 8 -8 8 c -4.4153 0 -8 -3.5847 -8 -8 c 0 -4.4153 3.5847 -8 8 -8 Z m -1.4091 12.2549 c 3.5401 0 5.4757 -2.9334 5.4757 -5.4757 c 0 -0.0838 0 -0.1676 -0.004 -0.2475 c 0.3752 -0.2714 0.7024 -0.6106 0.9618 -0.9978 c -0.3432 0.1517 -0.7144 0.2554 -1.1055 0.3033 c 0.3991 -0.2395 0.7024 -0.6146 0.8461 -1.0656 c -0.3712 0.2195 -0.7823 0.3791 -1.2213 0.4669 c -0.3512 -0.3752 -0.8501 -0.6066 -1.4048 -0.6066 c -1.0616 0 -1.9237 0.8621 -1.9237 1.9237 c 0 0.1517 0.016 0.2993 0.0519 0.439 c -1.6004 -0.0798 -3.0173 -0.8461 -3.9671 -2.0115 c -0.1637 0.2834 -0.2594 0.6146 -0.2594 0.9658 c 0 0.6665 0.3392 1.2572 0.8581 1.6004 c -0.3153 -0.008 -0.6107 -0.0958 -0.8701 -0.2394 l 0 0.0239 c 0 0.9339 0.6625 1.7082 1.5445 1.8878 c -0.1596 0.0439 -0.3312 0.0678 -0.5068 0.0678 c -0.1237 0 -0.2435 -0.012 -0.3632 -0.0359 c 0.2434 0.7663 0.9538 1.3211 1.796 1.337 c -0.6585 0.5149 -1.4887 0.8222 -2.3907 0.8222 c -0.1557 0 -0.3073 -0.008 -0.459 -0.0279 c 0.8421 0.5507 1.8558 0.87 2.9414 0.87 Z"
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
  max-width: 100%;
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
  left: 14.5rem;
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

@supports (-webkit-touch-callout: none) {
  .scroll-box {
    max-height: calc(100vh - 23rem);
    overflow-y: auto;
  }
}

@supports not (-webkit-touch-callout: none) {
  .scroll-box {
    max-height: calc(100vh - 18rem);
    overflow-y: auto;
  }
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

.logo-icon {
  height: 50px;
  width: 50px;
}

.logo-text {
  font-family: "Raleway", sans-serif;
  font-size: 3rem;
  font-weight: 700;
  letter-spacing: 2.5px;
}

.color-cycle {
  animation: colorCycle 5s linear 0s infinite;
}

@keyframes colorCycle {
  from {
    fill: #fff;
  }
  68% {
    fill: #fff;
  }
  70% {
    fill: rgb(118, 156, 241);
  }
  78% {
    fill: rgb(118, 156, 241);
  }
  80% {
    fill: rgb(195, 166, 249);
  }
  88% {
    fill: rgb(195, 166, 249);
  }
  90% {
    fill: rgb(157, 250, 244);
  }
  98% {
    fill: rgb(157, 250, 244);
  }
  100% {
    fill: #fff;
  }
}

.sidebar-toggler {
  width: 3rem;
  height: 3rem;
}

.social-media-icon {
  width: 3rem;
  height: 3rem;
}
</style>
