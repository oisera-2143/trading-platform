// Paper trading engine - simulates prices and manages trades

import { ASSETS } from '../data/assets';

const STORAGE_KEY = 'trading_platform_account';
const MARKET_DATA_KEY = 'trading_platform_market_data';

// Initialize market prices with brownian motion
const initializeMarketPrices = () => {
  const prices = {};
  Object.entries(ASSETS).forEach(([key, asset]) => {
    prices[key] = {
      bid: asset.basePrice - asset.pipValue * asset.spreadPips / 2,
      ask: asset.basePrice + asset.pipValue * asset.spreadPips / 2,
      lastUpdate: Date.now(),
    };
  });
  return prices;
};

// Generate realistic price movement using brownian motion
const generatePriceMovement = (currentPrice, asset, timeframe = '1m') => {
  const volatilityFactor = {
    '1m': 0.3,
    '5m': 0.6,
    '15m': 1.0,
    '1h': 1.5,
    '4h': 2.0,
    '1D': 3.0,
  }[timeframe] || 1.0;
  
  const drift = 0.00001; // Small positive drift
  const randomWalk = (Math.random() - 0.5) * 2;
  const volatility = asset.volatility * volatilityFactor;
  
  const priceChange = (drift + randomWalk * volatility) * currentPrice;
  let newPrice = Math.max(asset.minPrice, Math.min(asset.maxPrice, currentPrice + priceChange));
  
  return newPrice;
};

// Update a single market price
const updateMarketPrice = (symbol, currentPrice, asset) => {
  const newPrice = generatePriceMovement(currentPrice, asset);
  const bid = newPrice - asset.pipValue * asset.spreadPips / 2;
  const ask = newPrice + asset.pipValue * asset.spreadPips / 2;
  
  return {
    bid: Math.max(asset.minPrice, bid),
    ask: Math.min(asset.maxPrice, ask),
    lastUpdate: Date.now(),
  };
};

// Calculate P/L for a position
const calculatePositionPL = (position, currentPrice) => {
  if (position.type === 'buy') {
    return (currentPrice - position.entryPrice) * position.quantity;
  } else {
    return (position.entryPrice - currentPrice) * position.quantity;
  }
};

// Initialize account with default values
const initializeAccount = () => {
  return {
    id: 'demo_' + Date.now(),
    email: 'demo@trading-platform.local',
    balance: 10000,
    equity: 10000,
    usedMargin: 0,
    freeMargin: 10000,
    positions: [],
    trades: [],
    notifications: [],
    createdAt: Date.now(),
    settings: {
      leverage: 1,
      maxPositions: 10,
      stopLossPercent: 5,
      takeProfitPercent: 10,
      defaultOrderType: 'Market',
    },
  };
};

// Load account from localStorage
const loadAccount = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const account = JSON.parse(stored);
      return account;
    }
  } catch (error) {
    console.error('Failed to load account:', error);
  }
  return initializeAccount();
};

// Save account to localStorage
const saveAccount = (account) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(account));
  } catch (error) {
    console.error('Failed to save account:', error);
  }
};

// Load market data from localStorage
const loadMarketData = () => {
  try {
    const stored = localStorage.getItem(MARKET_DATA_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to load market data:', error);
  }
  return initializeMarketPrices();
};

// Save market data to localStorage
const saveMarketData = (marketData) => {
  try {
    localStorage.setItem(MARKET_DATA_KEY, JSON.stringify(marketData));
  } catch (error) {
    console.error('Failed to save market data:', error);
  }
};

// Process stop loss and take profit
const processExitConditions = (position, currentPrice, asset) => {
  const priceDiff = position.type === 'buy' ? 
    currentPrice - position.entryPrice : 
    position.entryPrice - currentPrice;
  
  const priceChangePercent = (priceDiff / position.entryPrice) * 100;
  
  // Check stop loss
  if (position.stopLoss && position.type === 'buy' && currentPrice <= position.stopLoss) {
    return { exit: true, exitPrice: position.stopLoss, reason: 'Stop Loss' };
  }
  if (position.stopLoss && position.type === 'sell' && currentPrice >= position.stopLoss) {
    return { exit: true, exitPrice: position.stopLoss, reason: 'Stop Loss' };
  }
  
  // Check take profit
  if (position.takeProfit && position.type === 'buy' && currentPrice >= position.takeProfit) {
    return { exit: true, exitPrice: position.takeProfit, reason: 'Take Profit' };
  }
  if (position.takeProfit && position.type === 'sell' && currentPrice <= position.takeProfit) {
    return { exit: true, exitPrice: position.takeProfit, reason: 'Take Profit' };
  }
  
  return { exit: false };
};

// Paper Trading Service API
export const PaperTradingService = {
  // Initialize service
  initialize: () => {
    loadAccount();
    loadMarketData();
  },

  // Get current account state
  getAccount: () => {
    return loadAccount();
  },

  // Get current market prices
  getMarketPrices: () => {
    return loadMarketData();
  },

  // Get price for specific asset
  getAssetPrice: (symbol) => {
    const prices = loadMarketData();
    return prices[symbol] || null;
  },

  // Update all market prices (called every second)
  updateMarketPrices: () => {
    const marketData = loadMarketData();
    const updatedData = { ...marketData };
    
    Object.entries(ASSETS).forEach(([symbol, asset]) => {
      const currentPrice = marketData[symbol];
      if (currentPrice) {
        const bidPrice = (currentPrice.bid + currentPrice.ask) / 2;
        updatedData[symbol] = updateMarketPrice(symbol, bidPrice, asset);
      }
    });
    
    saveMarketData(updatedData);
    return updatedData;
  },

  // Open a new position
  openPosition: (symbol, type, quantity, orderType = 'Market', entryPrice = null, stopLoss = null, takeProfit = null) => {
    const account = loadAccount();
    const marketData = loadMarketData();
    const asset = ASSETS[symbol];
    const priceData = marketData[symbol];
    
    if (!asset || !priceData) {
      throw new Error(`Asset ${symbol} not found`);
    }
    
    // Determine execution price
    let executionPrice;
    if (orderType === 'Market') {
      executionPrice = type === 'buy' ? priceData.ask : priceData.bid;
    } else {
      executionPrice = entryPrice || (type === 'buy' ? priceData.ask : priceData.bid);
    }
    
    const positionCost = executionPrice * quantity;
    const requiredMargin = positionCost / (account.settings.leverage || 1);
    
    // Check if enough margin available
    if (account.freeMargin < requiredMargin) {
      throw new Error('Insufficient margin available');
    }
    
    // Check max positions
    if (account.positions.length >= account.settings.maxPositions) {
      throw new Error(`Maximum positions (${account.settings.maxPositions}) reached`);
    }
    
    // Create position
    const position = {
      id: 'pos_' + Date.now(),
      symbol,
      type,
      quantity,
      entryPrice: executionPrice,
      currentPrice: executionPrice,
      stopLoss,
      takeProfit,
      openTime: Date.now(),
      openPrice: executionPrice,
      leverage: account.settings.leverage || 1,
      status: 'open',
      pl: 0,
      plPercent: 0,
    };
    
    // Update account
    account.positions.push(position);
    account.usedMargin += requiredMargin;
    account.freeMargin = account.balance - account.usedMargin;
    
    // Record notification
    account.notifications.push({
      id: 'notif_' + Date.now(),
      type: 'trade_opened',
      message: `Position opened: ${type.toUpperCase()} ${quantity} ${symbol} @ ${executionPrice.toFixed(4)}`,
      timestamp: Date.now(),
    });
    
    saveAccount(account);
    return position;
  },

  // Close a position
  closePosition: (positionId) => {
    const account = loadAccount();
    const marketData = loadMarketData();
    
    const positionIndex = account.positions.findIndex(p => p.id === positionId);
    if (positionIndex === -1) {
      throw new Error('Position not found');
    }
    
    const position = account.positions[positionIndex];
    const priceData = marketData[position.symbol];
    const exitPrice = position.type === 'buy' ? priceData.bid : priceData.ask;
    
    // Calculate P/L
    const pl = calculatePositionPL(position, exitPrice);
    
    // Create trade record
    const trade = {
      id: 'trade_' + Date.now(),
      symbol: position.symbol,
      type: position.type,
      quantity: position.quantity,
      entryPrice: position.entryPrice,
      exitPrice,
      openTime: position.openTime,
      closeTime: Date.now(),
      pl,
      plPercent: (pl / (position.entryPrice * position.quantity)) * 100,
      status: 'closed',
    };
    
    // Update account
    account.trades.push(trade);
    account.balance += pl;
    account.equity = account.balance;
    
    // Free up margin
    const requiredMargin = (position.entryPrice * position.quantity) / position.leverage;
    account.usedMargin -= requiredMargin;
    account.freeMargin = account.balance - account.usedMargin;
    
    // Remove position
    account.positions.splice(positionIndex, 1);
    
    // Record notification
    account.notifications.push({
      id: 'notif_' + Date.now(),
      type: 'trade_closed',
      message: `Position closed: ${position.type.toUpperCase()} ${position.quantity} ${position.symbol} | P/L: ${pl >= 0 ? '+' : ''}${pl.toFixed(2)} (${trade.plPercent.toFixed(2)}%)`,
      timestamp: Date.now(),
    });
    
    saveAccount(account);
    return trade;
  },

  // Update position P/L based on current market price
  updatePositionsPL: () => {
    const account = loadAccount();
    const marketData = loadMarketData();
    
    let totalUnrealizedPL = 0;
    
    account.positions.forEach(position => {
      const priceData = marketData[position.symbol];
      if (priceData) {
        const midPrice = (priceData.bid + priceData.ask) / 2;
        position.currentPrice = midPrice;
        position.pl = calculatePositionPL(position, midPrice);
        position.plPercent = (position.pl / (position.entryPrice * position.quantity)) * 100;
        totalUnrealizedPL += position.pl;
      }
    });
    
    // Update equity
    account.equity = account.balance + totalUnrealizedPL;
    
    saveAccount(account);
    return account;
  },

  // Check and execute stop loss / take profit
  checkExitConditions: () => {
    const account = loadAccount();
    const marketData = loadMarketData();
    const closedPositions = [];
    
    account.positions = account.positions.filter(position => {
      const priceData = marketData[position.symbol];
      if (!priceData) return true;
      
      const asset = ASSETS[position.symbol];
      const midPrice = (priceData.bid + priceData.ask) / 2;
      const exitCondition = processExitConditions(position, midPrice, asset);
      
      if (exitCondition.exit) {
        // Close position
        const pl = calculatePositionPL(position, exitCondition.exitPrice);
        
        const trade = {
          id: 'trade_' + Date.now(),
          symbol: position.symbol,
          type: position.type,
          quantity: position.quantity,
          entryPrice: position.entryPrice,
          exitPrice: exitCondition.exitPrice,
          openTime: position.openTime,
          closeTime: Date.now(),
          pl,
          plPercent: (pl / (position.entryPrice * position.quantity)) * 100,
          status: 'closed',
          reason: exitCondition.reason,
        };
        
        account.trades.push(trade);
        account.balance += pl;
        account.equity = account.balance;
        
        const requiredMargin = (position.entryPrice * position.quantity) / position.leverage;
        account.usedMargin -= requiredMargin;
        account.freeMargin = account.balance - account.usedMargin;
        
        account.notifications.push({
          id: 'notif_' + Date.now(),
          type: 'trade_closed',
          message: `Position closed by ${exitCondition.reason}: ${position.type.toUpperCase()} ${position.quantity} ${position.symbol} | P/L: ${pl >= 0 ? '+' : ''}${pl.toFixed(2)}`,
          timestamp: Date.now(),
        });
        
        closedPositions.push(trade);
        return false; // Remove from positions array
      }
      
      return true; // Keep position
    });
    
    if (account.positions.length !== (account.positions.length + closedPositions.length)) {
      saveAccount(account);
    }
    
    return closedPositions;
  },

  // Clear all demo data
  clearAccount: () => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(MARKET_DATA_KEY);
    return initializeAccount();
  },

  // Reset to initial state
  resetAccount: () => {
    const newAccount = initializeAccount();
    saveAccount(newAccount);
    saveMarketData(initializeMarketPrices());
    return newAccount;
  },
};
