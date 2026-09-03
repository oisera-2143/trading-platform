import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { PaperTradingService } from '../services/tradingEngine';

const TradingContext = createContext();

export const TradingProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [marketPrices, setMarketPrices] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAsset, setSelectedAsset] = useState('EUR/USD');

  // Initialize trading service on mount
  useEffect(() => {
    try {
      PaperTradingService.initialize();
      const initialAccount = PaperTradingService.getAccount();
      const initialPrices = PaperTradingService.getMarketPrices();
      
      setAccount(initialAccount);
      setMarketPrices(initialPrices);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }, []);

  // Update market prices every second
  useEffect(() => {
    if (!account) return;

    const priceInterval = setInterval(() => {
      try {
        const updatedPrices = PaperTradingService.updateMarketPrices();
        const updatedAccount = PaperTradingService.updatePositionsPL();
        PaperTradingService.checkExitConditions();
        
        setMarketPrices(updatedPrices);
        setAccount(updatedAccount);
      } catch (err) {
        console.error('Failed to update prices:', err);
      }
    }, 1000);

    return () => clearInterval(priceInterval);
  }, [account]);

  // Open a new position
  const openPosition = useCallback((symbol, type, quantity, orderType, entryPrice, stopLoss, takeProfit) => {
    try {
      const position = PaperTradingService.openPosition(
        symbol,
        type,
        quantity,
        orderType,
        entryPrice,
        stopLoss,
        takeProfit
      );
      const updatedAccount = PaperTradingService.getAccount();
      setAccount(updatedAccount);
      return position;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  // Close a position
  const closePosition = useCallback((positionId) => {
    try {
      const trade = PaperTradingService.closePosition(positionId);
      const updatedAccount = PaperTradingService.getAccount();
      setAccount(updatedAccount);
      return trade;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  // Clear account
  const clearAccount = useCallback(() => {
    try {
      const newAccount = PaperTradingService.clearAccount();
      setAccount(newAccount);
      setMarketPrices(PaperTradingService.getMarketPrices());
    } catch (err) {
      setError(err.message);
    }
  }, []);

  // Reset account
  const resetAccount = useCallback(() => {
    try {
      const newAccount = PaperTradingService.resetAccount();
      setAccount(newAccount);
      setMarketPrices(PaperTradingService.getMarketPrices());
    } catch (err) {
      setError(err.message);
    }
  }, []);

  const value = {
    account,
    marketPrices,
    loading,
    error,
    selectedAsset,
    setSelectedAsset,
    openPosition,
    closePosition,
    clearAccount,
    resetAccount,
  };

  return (
    <TradingContext.Provider value={value}>
      {children}
    </TradingContext.Provider>
  );
};

export const useTrading = () => {
  const context = useContext(TradingContext);
  if (!context) {
    throw new Error('useTrading must be used within TradingProvider');
  }
  return context;
};
