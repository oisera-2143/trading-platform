import React from 'react';
import { useTrading } from '../../context/TradingContext';
import { formatCurrency } from '../../utils/formatting';
import { ArrowUpRight, ArrowDownLeft, TrendingUp } from 'lucide-react';

const AccountStats = () => {
  const { account } = useTrading();

  if (!account) return null;

  const stats = [
    {
      label: 'Account Balance',
      value: formatCurrency(account.balance),
      icon: TrendingUp,
      color: 'text-accent',
    },
    {
      label: 'Equity',
      value: formatCurrency(account.equity),
      icon: ArrowUpRight,
      color: 'text-success',
    },
    {
      label: 'Used Margin',
      value: formatCurrency(account.usedMargin),
      icon: ArrowDownLeft,
      color: 'text-warning',
    },
    {
      label: 'Free Margin',
      value: formatCurrency(account.freeMargin),
      icon: TrendingUp,
      color: 'text-success',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="bg-secondary border border-tertiary rounded-lg p-4 hover:border-accent transition-colors"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-neutral-dark mb-1">{stat.label}</p>
                <p className="text-lg font-semibold font-mono text-neutral">
                  {stat.value}
                </p>
              </div>
              <Icon className={`w-5 h-5 ${stat.color}`} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AccountStats;
