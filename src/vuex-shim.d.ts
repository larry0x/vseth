import { Store } from "vuex";
import { Coin } from "@/types";

declare module "@vue/runtime-core" {
  interface State {
    sidebarShown: boolean;
    currency: {
      id: string;
      symbol: string;
    };
    startDate: Date;
    selectedCoins: Coin[];
    allCoins: Coin[];
    counter: number;
  }

  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
