import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { formatPrice, formatPercent, getColorClass } from '../../utils/formatting';

export const PriceCard = ({ symbol, bid, ask, change, changePercent, status = 'open' }) => {
  const isPositive = changePercent >= 0;
  const colorClass = getColorClass(changePercent);
  const midPrice = (bid + ask) / 2;

  return (
    <div className="bg-secondary border border-tertiary rounded-lg p-4 hover:border-accent transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-neutral">{symbol}</h3>
          <p className="text-xs text-neutral-dark mt-1">{status}</p>
        </div>
        {isPositive ? (
          <TrendingUp className="w-5 h-5 text-success" />
        ) : (
          <TrendingDown className="w-5 h-5 text-danger" />
        )}
      </div>

      <div className="space-y-2">
        <div>
          <p className="text-xs text-neutral-dark mb-1">Price</p>
          <p className="text-lg font-mono font-semibold text-neutral">
            {formatPrice(midPrice)}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-tertiary">
          <div>
            <p className="text-xs text-neutral-dark">Bid</p>
            <p className="text-sm font-mono text-neutral">{formatPrice(bid)}</p>
          </div>
          <div>
            <p className="text-xs text-neutral-dark">Ask</p>
            <p className="text-sm font-mono text-neutral">{formatPrice(ask)}</p>
          </div>
        </div>

        <div className="pt-2 border-t border-tertiary">
          <p className={`text-sm font-semibold font-mono ${colorClass}`}>
            {formatPercent(changePercent)}
          </p>
        </div>
      </div>
    </div>
  );
};
