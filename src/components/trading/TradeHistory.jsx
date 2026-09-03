import React from 'react';
import { useTrading } from '../../context/TradingContext';
import { formatPrice, formatCurrency, formatPercent, formatDate, getColorClass } from '../../utils/formatting';

const TradeHistory = () => {
  const { account } = useTrading();

  if (!account || account.trades.length === 0) {
    return (
      <div className="bg-secondary border border-tertiary rounded-lg p-6 text-center">
        <p className="text-neutral-dark">No trade history</p>
      </div>
    );
  }

  // Show last 10 trades
  const recentTrades = account.trades.slice(-10).reverse();

  return (
    <div className="bg-secondary border border-tertiary rounded-lg overflow-hidden">
      <div className="p-4 sm:p-6 border-b border-tertiary">
        <h3 className="text-lg sm:text-xl font-semibold text-neutral">Trade History</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-tertiary">
            <tr>
              <th className="px-4 py-3 text-left text-neutral-dark">Time</th>
              <th className="px-4 py-3 text-left text-neutral-dark">Asset</th>
              <th className="px-4 py-3 text-left text-neutral-dark">Type</th>
              <th className="px-4 py-3 text-right text-neutral-dark">Entry</th>
              <th className="px-4 py-3 text-right text-neutral-dark">Exit</th>
              <th className="px-4 py-3 text-right text-neutral-dark">P/L</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-tertiary">
            {recentTrades.map((trade) => (
              <tr key={trade.id} className="hover:bg-tertiary transition-colors">
                <td className="px-4 py-3 text-xs text-neutral-dark font-mono">
                  {formatDate(trade.closeTime)}
                </td>
                <td className="px-4 py-3 font-semibold text-neutral">
                  {trade.symbol}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      trade.type === 'buy'
                        ? 'bg-success bg-opacity-20 text-success'
                        : 'bg-danger bg-opacity-20 text-danger'
                    }`}
                  >
                    {trade.type.toUpperCase()}
                  </span>
                </td>
                <td className="px-4 py-3 text-right font-mono text-neutral">
                  {formatPrice(trade.entryPrice)}
                </td>
                <td className="px-4 py-3 text-right font-mono text-neutral">
                  {formatPrice(trade.exitPrice)}
                </td>
                <td className={`px-4 py-3 text-right font-mono font-semibold ${getColorClass(trade.pl)}`}>
                  <div>{formatCurrency(trade.pl)}</div>
                  <div className="text-xs">{formatPercent(trade.plPercent)}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TradeHistory;
