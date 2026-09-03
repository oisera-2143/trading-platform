import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useTrading } from '../../context/TradingContext';
import { Card } from '../../components/common/Card';
import { formatCurrency, formatPercent, getColorClass } from '../../utils/formatting';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';

const PortfolioPage = () => {
  const { account, loading } = useTrading();

  if (loading || !account) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <LoadingSpinner size="lg" />
        </div>
      </DashboardLayout>
    );
  }

  // Calculate portfolio stats
  const totalOpenPL = account.positions.reduce((sum, pos) => sum + pos.pl, 0);
  const totalClosedPL = account.trades.reduce((sum, trade) => sum + (trade.pl || 0), 0);
  const winningTrades = account.trades.filter((t) => t.pl > 0).length;
  const losingTrades = account.trades.filter((t) => t.pl < 0).length;
  const winRate = account.trades.length > 0 ? (winningTrades / account.trades.length) * 100 : 0;

  // Portfolio breakdown by asset
  const portfolioBreakdown = Object.entries(
    account.positions.reduce((acc, pos) => {
      acc[pos.symbol] = (acc[pos.symbol] || 0) + Math.abs(pos.pl);
      return acc;
    }, {})
  ).map(([symbol, value]) => ({
    name: symbol,
    value: Math.abs(value),
  }));

  const COLORS = ['#00d4ff', '#00ff88', '#ffaa00', '#ff3366', '#ff6600', '#00aa88', '#aa00ff'];

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-full">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-neutral mb-2">Portfolio</h1>
          <p className="text-neutral-dark">Overview of your trading performance</p>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-neutral-dark mb-1">Account Balance</p>
                <p className="text-2xl font-bold text-neutral">{formatCurrency(account.balance)}</p>
              </div>
              <Wallet className="w-5 h-5 text-accent" />
            </div>
          </Card>

          <Card>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-neutral-dark mb-1">Equity</p>
                <p className="text-2xl font-bold text-neutral">{formatCurrency(account.equity)}</p>
              </div>
              <TrendingUp className="w-5 h-5 text-success" />
            </div>
          </Card>

          <Card>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-neutral-dark mb-1">Open P/L</p>
                <p className={`text-2xl font-bold ${getColorClass(totalOpenPL)}`}>
                  {formatCurrency(totalOpenPL)}
                </p>
              </div>
              <TrendingUp className={`w-5 h-5 ${getColorClass(totalOpenPL)}`} />
            </div>
          </Card>

          <Card>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-neutral-dark mb-1">Closed P/L</p>
                <p className={`text-2xl font-bold ${getColorClass(totalClosedPL)}`}>
                  {formatCurrency(totalClosedPL)}
                </p>
              </div>
              <TrendingDown className={`w-5 h-5 ${getColorClass(totalClosedPL)}`} />
            </div>
          </Card>
        </div>

        {/* Trading Stats */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left side - Stats */}
          <Card>
            <h3 className="text-lg font-semibold text-neutral mb-4">Trading Statistics</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-tertiary">
                <span className="text-neutral-dark">Total Trades</span>
                <span className="font-semibold text-neutral">{account.trades.length}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-tertiary">
                <span className="text-neutral-dark">Winning Trades</span>
                <span className="font-semibold text-success">{winningTrades}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-tertiary">
                <span className="text-neutral-dark">Losing Trades</span>
                <span className="font-semibold text-danger">{losingTrades}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-tertiary">
                <span className="text-neutral-dark">Win Rate</span>
                <span className={`font-semibold ${getColorClass(winRate - 50)}`}>
                  {winRate.toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-dark">Open Positions</span>
                <span className="font-semibold text-neutral">{account.positions.length}</span>
              </div>
            </div>
          </Card>

          {/* Right side - Portfolio Breakdown */}
          {portfolioBreakdown.length > 0 ? (
            <Card>
              <h3 className="text-lg font-semibold text-neutral mb-4">Position Breakdown</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={portfolioBreakdown}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {portfolioBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#16213e',
                      border: '1px solid #0f3460',
                      borderRadius: '8px',
                    }}
                    labelStyle={{ color: '#e0e0e0' }}
                    formatter={(value) => formatCurrency(value)}
                  />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          ) : (
            <Card>
              <h3 className="text-lg font-semibold text-neutral mb-4">Position Breakdown</h3>
              <p className="text-neutral-dark text-center py-8">No open positions</p>
            </Card>
          )}
        </div>

        {/* Margin Usage */}
        <Card>
          <h3 className="text-lg font-semibold text-neutral mb-4">Margin Usage</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-neutral-dark">Used Margin</span>
                <span className="font-semibold text-neutral">{formatCurrency(account.usedMargin)}</span>
              </div>
              <div className="w-full bg-tertiary rounded-full h-2 overflow-hidden">
                <div
                  className="bg-warning h-full"
                  style={{
                    width: `${account.balance > 0 ? (account.usedMargin / account.balance) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-neutral-dark">Free Margin</span>
                <span className="font-semibold text-neutral">{formatCurrency(account.freeMargin)}</span>
              </div>
              <div className="w-full bg-tertiary rounded-full h-2 overflow-hidden">
                <div
                  className="bg-success h-full"
                  style={{
                    width: `${account.balance > 0 ? (account.freeMargin / account.balance) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default PortfolioPage;
