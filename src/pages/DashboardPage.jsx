import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import AccountStats from '../../components/layout/AccountStats';
import TradingChart from '../../components/trading/TradingChart';
import OrderPanel from '../../components/trading/OrderPanel';
import OpenPositions from '../../components/trading/OpenPositions';
import TradeHistory from '../../components/trading/TradeHistory';
import { useTrading } from '../../context/TradingContext';
import { ASSET_LIST } from '../../data/assets';
import { Card } from '../../components/common/Card';
import { Select } from '../../components/common/Select';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';

const DashboardPage = () => {
  const { selectedAsset, setSelectedAsset, loading } = useTrading();

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <LoadingSpinner size="lg" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-full">
        {/* Account Stats */}
        <div>
          <h2 className="text-2xl font-bold text-neutral mb-4">Account Overview</h2>
          <AccountStats />
        </div>

        {/* Asset Selector */}
        <Card>
          <Select
            label="Select Asset to Trade"
            value={selectedAsset}
            onChange={(e) => setSelectedAsset(e.target.value)}
            options={ASSET_LIST.map((asset) => ({
              value: asset.symbol,
              label: `${asset.symbol} - ${asset.name}`,
            }))}
          />
        </Card>

        {/* Trading Section */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Chart - spans 2 columns on large screens */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold text-neutral mb-4">Price Chart</h3>
            <TradingChart symbol={selectedAsset} />
          </div>

          {/* Order Panel - sidebar on large screens */}
          <div>
            <OrderPanel asset={selectedAsset} />
          </div>
        </div>

        {/* Positions and History */}
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold text-neutral mb-4">Active Positions</h3>
            <OpenPositions />
          </div>

          <div>
            <h3 className="text-xl font-bold text-neutral mb-4">Recent Trades</h3>
            <TradeHistory />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
