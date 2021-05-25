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
          <a
            href="https://github.com/0xlarry/vseth"
            target="_blank"
            rel="noopener noreferrer"
            class="me-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="social-media-icon"
              viewBox="0 0 32 32"
            >
              <path
                d="M16,0C7.163,0,0,7.163,0,16c0,8.837,7.164,16,16,16c8.837,0,16-7.163,16-16C32,7.163,24.837,0,16,0z M18.067,18.96    c0.333,0.289,0.592,1.308,0.592,1.776v4.144h-2.365h-2.368c0,0,0.007-1.405,0-2.368c-3.24,0.697-4.144-1.776-4.144-1.776    C9.19,19.552,8.598,18.96,8.598,18.96c-1.184-0.703,0-0.592,0-0.592c1.184,0,1.776,1.184,1.776,1.184    c1.039,1.764,2.888,1.48,3.552,1.184c0-0.592,0.259-1.487,0.592-1.776c-2.586-0.291-4.738-1.776-4.738-4.736    c0-2.96,0.594-3.552,1.186-4.144c-0.12-0.292-0.615-1.37,0.018-2.96c0,0,1.163,0,2.347,1.776c0.587-0.587,2.368-0.592,2.961-0.592    c0.591,0,2.373,0.005,2.959,0.592c1.184-1.776,2.35-1.776,2.35-1.776c0.633,1.59,0.138,2.668,0.018,2.96    c0.592,0.592,1.184,1.184,1.184,4.144C22.804,17.184,20.654,18.669,18.067,18.96z"
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
              viewBox="0 0 512 512"
            >
              <path
                d="M256,0c141.29,0 256,114.71 256,256c0,141.29 -114.71,256 -256,256c-141.29,0 -256,-114.71 -256,-256c0,-141.29 114.71,-256 256,-256Zm-45.091,392.158c113.283,0 175.224,-93.87 175.224,-175.223c0,-2.682 0,-5.364 -0.128,-7.919c12.005,-8.684 22.478,-19.54 30.779,-31.928c-10.983,4.853 -22.861,8.174 -35.377,9.706c12.772,-7.663 22.478,-19.668 27.076,-34.099c-11.878,7.024 -25.032,12.132 -39.081,14.942c-11.239,-12.005 -27.203,-19.412 -44.955,-19.412c-33.972,0 -61.558,27.586 -61.558,61.558c0,4.853 0.511,9.578 1.66,14.048c-51.213,-2.554 -96.552,-27.075 -126.947,-64.368c-5.237,9.068 -8.302,19.668 -8.302,30.907c0,21.328 10.856,40.23 27.459,51.213c-10.09,-0.255 -19.541,-3.065 -27.842,-7.662l0,0.766c0,29.885 21.2,54.661 49.425,60.409c-5.108,1.404 -10.6,2.171 -16.219,2.171c-3.96,0 -7.791,-0.383 -11.622,-1.15c7.79,24.521 30.523,42.274 57.471,42.784c-21.073,16.476 -47.637,26.31 -76.501,26.31c-4.981,0 -9.834,-0.256 -14.687,-0.894c26.948,17.624 59.387,27.841 94.125,27.841Z"
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

.sidebar-toggler {
  width: 3rem;
  height: 3rem;
}

.social-media-icon {
  width: 3rem;
  height: 3rem;
}
</style>
