const _formatNumber = (number: number, decPlaces: number = 2) => {
  let i = String(Math.floor(number));
  let j = i.length > 3 ? i.length % 3 : 0;
  let k = (number - Math.floor(number)).toFixed(number > 1 ? 2 : 6);

  return (
    (j ? i.substr(0, j) + "," : "") +
    i.substr(j).replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
    ("." + String(k).slice(2))
  );
};

export class Coin {
  id: string;
  name: string;
  symbol: string;
  iconUrl: string;
  launchDate: Date;

  price: {
    historical: number | null;
    current: number | null;
  } = {
    historical: null,
    current: null,
  };

  constructor(
    id: string,
    symbol: string,
    name: string,
    iconUrl?: string,
    launchDate?: Date
  ) {
    this.id = id;
    this.name = name;
    this.symbol = symbol;
    this.iconUrl = iconUrl ? iconUrl : "icons/unknown.png";
    this.launchDate = launchDate ? launchDate : new Date(0);
  }

  addCurrentPrice(price: number | null) {
    this.price.current = price;
  }

  addHistoricalPrice(price: number | null) {
    this.price.historical = price;
  }

  priceFormatted(type: "current" | "historical", currencySymbol = "") {
    let price = type == "current" ? this.price.current : this.price.historical;
    return price ? currencySymbol + _formatNumber(price) : "n/a";
  }

  percentage() {
    if (this.price.historical && this.price.current) {
      return (this.price.current / this.price.historical - 1) * 100;
    } else {
      return null;
    }
  }

  percentageFormatted() {
    let percentage = this.percentage();
    return percentage || percentage == 0
      ? (percentage >= 0 ? "+" : "–") + Math.abs(percentage).toFixed(0) + "%"
      : null;
  }

  multiple() {
    if (this.price.historical && this.price.current) {
      return this.price.current / this.price.historical;
    } else {
      return null;
    }
  }

  multipleFormatted() {
    let multiple = this.multiple();
    return multiple ? multiple.toFixed(multiple >= 10 ? 0 : 1) + "x" : null;
  }
}
