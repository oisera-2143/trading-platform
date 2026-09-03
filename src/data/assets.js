// Market data and asset information

export const ASSETS = {
  'EUR/USD': {
    id: 'eurusd',
    symbol: 'EUR/USD',
    name: 'Euro / US Dollar',
    category: 'Forex',
    basePrice: 1.0850,
    minPrice: 0.9000,
    maxPrice: 1.2000,
    volatility: 0.0008,
    pipValue: 0.0001,
    spreadPips: 2,
  },
  'GBP/USD': {
    id: 'gbpusd',
    symbol: 'GBP/USD',
    name: 'British Pound / US Dollar',
    category: 'Forex',
    basePrice: 1.2700,
    minPrice: 1.1000,
    maxPrice: 1.5000,
    volatility: 0.0010,
    pipValue: 0.0001,
    spreadPips: 2,
  },
  'USD/JPY': {
    id: 'usdjpy',
    symbol: 'USD/JPY',
    name: 'US Dollar / Japanese Yen',
    category: 'Forex',
    basePrice: 149.50,
    minPrice: 100.00,
    maxPrice: 160.00,
    volatility: 0.012,
    pipValue: 0.01,
    spreadPips: 3,
  },
  'BTC/USD': {
    id: 'btcusd',
    symbol: 'BTC/USD',
    name: 'Bitcoin / US Dollar',
    category: 'Cryptocurrency',
    basePrice: 42500,
    minPrice: 20000,
    maxPrice: 70000,
    volatility: 0.025,
    pipValue: 1,
    spreadPips: 50,
  },
  'ETH/USD': {
    id: 'ethusd',
    symbol: 'ETH/USD',
    name: 'Ethereum / US Dollar',
    category: 'Cryptocurrency',
    basePrice: 2250,
    minPrice: 1000,
    maxPrice: 4000,
    volatility: 0.028,
    pipValue: 1,
    spreadPips: 10,
  },
  'GOLD': {
    id: 'gold',
    symbol: 'GOLD',
    name: 'Gold (per troy ounce)',
    category: 'Commodities',
    basePrice: 2050,
    minPrice: 1800,
    maxPrice: 2500,
    volatility: 0.015,
    pipValue: 1,
    spreadPips: 2,
  },
  'SPX500': {
    id: 'spx500',
    symbol: 'SPX500',
    name: 'S&P 500 Index',
    category: 'Indices',
    basePrice: 5250,
    minPrice: 4000,
    maxPrice: 6500,
    volatility: 0.012,
    pipValue: 1,
    spreadPips: 5,
  },
};

export const ASSET_LIST = Object.values(ASSETS);

export const MARKET_CATEGORIES = ['Forex', 'Cryptocurrency', 'Commodities', 'Indices'];

export const ORDER_TYPES = {
  MARKET: 'Market Order',
  LIMIT: 'Limit Order',
  STOP: 'Stop Order',
};

export const POSITION_STATUS = {
  OPEN: 'Open',
  CLOSED: 'Closed',
  PENDING: 'Pending',
};

export const TIMEFRAMES = [
  { value: '1m', label: '1m' },
  { value: '5m', label: '5m' },
  { value: '15m', label: '15m' },
  { value: '1h', label: '1h' },
  { value: '4h', label: '4h' },
  { value: '1D', label: '1D' },
];
