import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useTrading } from '../../context/TradingContext';
import { ASSET_LIST, MARKET_CATEGORIES } from '../../data/assets';
import { Card } from '../../components/common/Card';
import { Select } from '../../components/common/Select';
import { PriceCard } from '../../components/common/PriceCard';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { formatPercent } from '../../utils/formatting';

const MarketsPage = () => {
  const { marketPrices, loading } = useTrading();
  const [selectedCategory, setSelectedCategory] = useState('Forex');

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <LoadingSpinner size="lg" />
        </div>
      </DashboardLayout>
    );
  }

  const filteredAssets = ASSET_LIST.filter(
    (asset) => asset.category === selectedCategory
  );

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-full">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-neutral mb-2">Markets</h1>
          <p className="text-neutral-dark">Explore available trading instruments</p>
        </div>

        {/* Category Filter */}
        <Card>
          <Select
            label="Market Category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            options={MARKET_CATEGORIES.map((category) => ({
              value: category,
              label: category,
            }))}
          />
        </Card>

        {/* Market Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAssets.map((asset) => {
            const priceData = marketPrices[asset.symbol];
            const bid = priceData?.bid || asset.basePrice;
            const ask = priceData?.ask || asset.basePrice;
            const change = Math.random() * 4 - 2; // Random change for demo
            const changePercent = change;

            return (
              <PriceCard
                key={asset.symbol}
                symbol={asset.symbol}
                bid={bid}
                ask={ask}
                change={change}
                changePercent={changePercent}
                status="open"
              />
            );
          })}
        </div>

        {/* Market Info */}
        <Card>
          <h3 className="text-lg font-semibold text-neutral mb-4">Market Information</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-neutral-dark mb-1">Category</p>
              <p className="text-neutral font-semibold">{selectedCategory}</p>
            </div>
            <div>
              <p className="text-neutral-dark mb-1">Available Assets</p>
              <p className="text-neutral font-semibold">{filteredAssets.length}</p>
            </div>
            <div>
              <p className="text-neutral-dark mb-1">Market Hours</p>
              <p className="text-neutral font-semibold">24/5 (Demo Only)</p>
            </div>
            <div>
              <p className="text-neutral-dark mb-1">Update Frequency</p>
              <p className="text-neutral font-semibold">Real-time (1s)</p>
            </div>
          </div>
        </Card>

        {/* Educational Info */}
        <Card className="bg-accent bg-opacity-10 border-accent">
          <h3 className="text-lg font-semibold text-neutral mb-2">📚 Learn More</h3>
          <p className="text-neutral-dark text-sm mb-3">
            Each asset has different market characteristics. Practice trading various instruments to improve your skills.
          </p>
          <ul className="text-neutral-dark text-sm space-y-1">
            <li>• <strong>Forex:</strong> Currency pairs with tight spreads</li>
            <li>• <strong>Crypto:</strong> High volatility, 24/7 trading</li>
            <li>• <strong>Commodities:</strong> Physical goods like gold and oil</li>
            <li>• <strong>Indices:</strong> Stock market indices and economic benchmarks</li>
          </ul>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default MarketsPage;
