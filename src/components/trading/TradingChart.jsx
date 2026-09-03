import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useTrading } from '../../context/TradingContext';
import { ASSETS, TIMEFRAMES } from '../../data/assets';
import { formatPrice } from '../../utils/formatting';

const generateChartData = (basePrice, timeframe, points = 50) => {
  const data = [];
  let currentPrice = basePrice;
  const volatility = 0.005;

  const timeMultiplier = {
    '1m': 1,
    '5m': 5,
    '15m': 15,
    '1h': 60,
    '4h': 240,
    '1D': 1440,
  }[timeframe] || 1;

  for (let i = 0; i < points; i++) {
    const randomChange = (Math.random() - 0.5) * volatility * currentPrice;
    currentPrice = Math.max(basePrice * 0.95, Math.min(basePrice * 1.05, currentPrice + randomChange));

    const timestamp = new Date(Date.now() - (points - i) * 60 * 1000 * timeMultiplier);

    data.push({
      time: timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      price: parseFloat(currentPrice.toFixed(4)),
    });
  }

  return data;
};

const TradingChart = ({ symbol }) => {
  const { marketPrices } = useTrading();
  const [timeframe, setTimeframe] = useState('1h');
  const [chartData, setChartData] = useState([]);

  const asset = ASSETS[symbol];
  const priceData = marketPrices[symbol];
  const currentPrice = priceData ? (priceData.bid + priceData.ask) / 2 : asset?.basePrice || 0;

  useEffect(() => {
    const data = generateChartData(currentPrice, timeframe);
    setChartData(data);
  }, [timeframe, currentPrice]);

  if (!asset || !chartData.length) {
    return <div className="bg-secondary border border-tertiary rounded-lg p-4 text-neutral">Loading chart...</div>;
  }

  const minPrice = Math.min(...chartData.map((d) => d.price));
  const maxPrice = Math.max(...chartData.map((d) => d.price));
  const priceRange = maxPrice - minPrice;

  return (
    <div className="bg-secondary border border-tertiary rounded-lg p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
        <div>
          <h3 className="text-lg sm:text-xl font-semibold text-neutral">{symbol}</h3>
          <p className="text-2xl sm:text-3xl font-mono font-bold text-accent mt-1">
            {formatPrice(currentPrice)}
          </p>
        </div>

        {/* Timeframe buttons */}
        <div className="flex flex-wrap gap-2">
          {TIMEFRAMES.map((tf) => (
            <button
              key={tf.value}
              onClick={() => setTimeframe(tf.value)}
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
                timeframe === tf.value
                  ? 'bg-accent text-primary'
                  : 'bg-tertiary text-neutral hover:bg-opacity-80'
              }`}
            >
              {tf.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="w-full h-64 sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#0f3460" />
            <XAxis dataKey="time" stroke="#a0a0a0" />
            <YAxis stroke="#a0a0a0" domain={[minPrice - priceRange * 0.05, maxPrice + priceRange * 0.05]} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#16213e',
                border: '1px solid #0f3460',
                borderRadius: '8px',
              }}
              labelStyle={{ color: '#e0e0e0' }}
              formatter={(value) => formatPrice(value)}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#00d4ff"
              strokeWidth={2}
              dot={false}
              isAnimationActive={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-tertiary">
        <div>
          <p className="text-xs text-neutral-dark">High</p>
          <p className="text-sm font-mono font-semibold text-neutral">{formatPrice(maxPrice)}</p>
        </div>
        <div>
          <p className="text-xs text-neutral-dark">Low</p>
          <p className="text-sm font-mono font-semibold text-neutral">{formatPrice(minPrice)}</p>
        </div>
        <div>
          <p className="text-xs text-neutral-dark">Spread</p>
          <p className="text-sm font-mono font-semibold text-warning">
            {formatPrice(asset.pipValue * asset.spreadPips)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TradingChart;
