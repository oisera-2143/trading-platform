// Utility functions for formatting and calculations

export const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

export const formatPrice = (value) => {
  if (value < 1) {
    return value.toFixed(4);
  }
  if (value < 100) {
    return value.toFixed(2);
  }
  return Math.round(value);
};

export const formatPercent = (value) => {
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
};

export const formatNumber = (value) => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
};

export const getColorClass = (value) => {
  if (value > 0) return 'text-success';
  if (value < 0) return 'text-danger';
  return 'text-neutral';
};

export const getBgColorClass = (value) => {
  if (value > 0) return 'bg-success bg-opacity-10';
  if (value < 0) return 'bg-danger bg-opacity-10';
  return 'bg-neutral bg-opacity-10';
};

export const calculatePL = (entryPrice, currentPrice, quantity, isBuy = true) => {
  if (isBuy) {
    return (currentPrice - entryPrice) * quantity;
  } else {
    return (entryPrice - currentPrice) * quantity;
  }
};

export const calculatePLPercent = (entryPrice, currentPrice, isBuy = true) => {
  if (isBuy) {
    return ((currentPrice - entryPrice) / entryPrice) * 100;
  } else {
    return ((entryPrice - currentPrice) / entryPrice) * 100;
  }
};

export const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(new Date(date));
};

export const formatTime = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(new Date(date));
};

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};
