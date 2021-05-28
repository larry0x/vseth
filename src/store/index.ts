import { createStore } from "vuex";
import { Coin } from "@/types";

const allCoins = [
  new Coin("bitcoin", "BTC", "Bitcoin", "icons/btc.png"),
  new Coin("ethereum", "ETH", "Ethereum", "icons/eth.png"),
  new Coin("cardano", "ADA", "Cardano", "icons/ada.jpg"),
  new Coin("binancecoin", "BNB", "Binance Coin", "icons/bnb.png"),
  new Coin("polkadot", "DOT", "Polkadot", "icons/dot.png", new Date("2020-08-20")),
  new Coin("solana", "SOL", "Solana", "icons/sol.jpeg"),
  new Coin("cosmos", "ATOM", "Cosmos", "icons/atom.png"),
  new Coin("matic-network", "MATIC", "Polygon", "icons/matic-polygon.png"),
  new Coin("dogecoin", "DOGE", "Dogecoin", "icons/doge.jpeg"),
  new Coin("terra-luna", "LUNA", "Terra", "icons/luna.png"),
  new Coin("thorchain", "RUNE", "THORChain", "icons/rune.jpeg"),
  new Coin("uniswap", "UNI", "Uniswap", "icons/uni.png", new Date("2020-09-18")),
  new Coin("chainlink", "LINK", "Chainlink", "icons/link.png"),
  new Coin("aave", "AAVE", "Aave", "icons/aave.png"),
  new Coin(
    "pancakeswap-token",
    "CAKE",
    "PancakeSwap",
    "icons/cake.png",
    new Date("2020-09-30")
  ),
  new Coin("maker", "MKR", "Maker", "icons/mkr.png"),
  new Coin("havven", "SNX", "Synthetix", "icons/snx.png"),
  new Coin(
    "compound-governance-token",
    "COMP",
    "Compound",
    "icons/comp.png",
    new Date("2020-06-17")
  ),
  new Coin("sushi", "SUSHI", "Sushi", "icons/sushi.png", new Date("2020-08-30")),
  new Coin(
    "yearn-finance",
    "YFI",
    "Yearn Finance",
    "icons/yfi.png",
    new Date("2020-07-19")
  ),
  new Coin("the-graph", "GRT", "The Graph", "icons/grt.png", new Date("2020-12-18")),
  new Coin("bancor", "BNT", "Bancor", "icons/bnt.png"),
  new Coin("uma", "UMA", "UMA", "icons/uma.png"),
  new Coin("0x", "ZRX", "0x", "icons/zrx.png"),
  new Coin("nxm", "NXM", "Nexus Mutual", "icons/nxm.jpg", new Date("2020-07-13")),
  new Coin("curve-dao-token", "CRV", "Curve", "icons/crv.png", new Date("2020-08-15")),
  new Coin("1inch", "1INCH", "1inch", "icons/1inch.png", new Date("2020-12-26")),
  new Coin("loopring", "LRC", "Loopring", "icons/lrc.png"),
  new Coin("republic-protocol", "REN", "REN", "icons/ren.png"),
  new Coin("venus", "XVS", "Venus", "icons/xvs.png", new Date("2020-10-07")),
  new Coin("balancer", "BAL", "Balancer", "icons/bal.png", new Date("2020-06-24")),
  new Coin(
    "mirror-protocol",
    "MIR",
    "Mirror Protocol",
    "icons/mir.png",
    new Date("2020-12-05")
  ),
  new Coin("band-protocol", "BAND", "Band Protocol", "icons/band.png"),
  new Coin(
    "alpha-finance",
    "ALPHA",
    "Alpha Finance",
    "icons/alpha.png",
    new Date("2020-10-11")
  ),
  new Coin("alchemix", "ALCX", "Alchemix", "icons/alcx.png", new Date("2021-03-01")),
  new Coin("serum", "SRM", "Serum", "icons/srm.png", new Date("2020-08-12")),
  new Coin(
    "anchor-protocol",
    "ANC",
    "Anchor Protocol",
    "icons/anc.png",
    new Date("2021-03-19")
  ),
  new Coin("raydium", "RAY", "Raydium", "icons/ray.png", new Date("2021-02-22")),
  new Coin("rocket-pool", "RPL", "Rocket Pool", "icons/rpl.png"),
  new Coin(
    "perpetual-protocol",
    "PERP",
    "Perpetual Protocol",
    "icons/perp.jpg",
    new Date("2020-09-10")
  ),
  new Coin(
    "badger-dao",
    "BADGER",
    "Badger DAO",
    "icons/badger.png",
    new Date("2020-12-05")
  ),
  new Coin("rook", "ROOK", "KeeperDAO", "icons/rook.png", new Date("2020-11-09")),
  new Coin("barnbridge", "BOND", "BarnBridge", "icons/bond.png", new Date("2020-10-27")),
  new Coin("cream-2", "CREAM", "C.R.E.A.M.", "icons/cream.png", new Date("2020-08-06")),
  new Coin("hegic", "HEGIC", "Hegic", "icons/hegic.png", new Date("2020-09-13")),
  new Coin("lido-dao", "LDO", "Lido", "icons/ldo.png", new Date("2021-01-06")),
  new Coin("akash-network", "AKT", "Akash", "icons/akt.png", new Date("2020-10-17")),
  new Coin("secret", "SCRT", "Secret Network", "icons/scrt.png", new Date("2020-10-02")),
  new Coin("reserve-rights-token", "RSR", "Reserve Rights Token", "icons/rsr.png"),
  new Coin("tribe-2", "TRIBE", "Tribe", "icons/tribe.png", new Date("2021-04-05")),
  new Coin(
    "injective-protocol",
    "INJ",
    "Injective Protocol",
    "icons/inj.jpeg",
    new Date("2020-10-22")
  ),
  new Coin(
    "harvest-finance",
    "FARM",
    "Harvest Finance",
    "icons/farm.png",
    new Date("2020-09-03")
  ),
  new Coin(
    "rari-governance-token",
    "RGT",
    "Rari Capital",
    "icons/rgt.jpeg",
    new Date("2020-10-23")
  ),
  new Coin("meta", "MTA", "mStable", "icons/mta.png", new Date("2020-07-19")),
  new Coin("haven", "XHV", "Haven", "icons/xhv.png"),
  new Coin("kusama", "KSM", "Kusama", "icons/ksm.jpeg"),
  new Coin("fantom", "FTM", "Fantom", "icons/ftm.png"),
];

console.log("Total number of coins:", allCoins.length);

export default createStore({
  state: {
    overlayShown: false,
    sidebarShown: true,
    currency: {
      id: "",
      symbol: "",
    },
    startDate: new Date(),
    selectedCoins: [] as Coin[],
    allCoins,
    counter: 0,
  },
});
