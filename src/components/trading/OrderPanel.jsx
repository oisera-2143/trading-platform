import React, { useState } from 'react';
import { useTrading } from '../../context/TradingContext';
import { ASSETS, ORDER_TYPES } from '../../data/assets';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { Alert } from '../common/Alert';
import { Toast } from '../../utils/toast';
import { formatPrice } from '../../utils/formatting';

const OrderPanel = ({ asset, onOrderPlaced }) => {
  const { openPosition, account } = useTrading();
  const [orderType, setOrderType] = useState('Market');
  const [side, setSide] = useState('buy');
  const [quantity, setQuantity] = useState('1.0');
  const [entryPrice, setEntryPrice] = useState('');
  const [stopLoss, setStopLoss] = useState('');
  const [takeProfit, setTakeProfit] = useState('');
  const [leverage, setLeverage] = useState('1');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const assetData = ASSETS[asset];
  const currentPrice = assetData?.basePrice || 0;

  const validateForm = () => {
    const newErrors = {};

    if (!quantity || parseFloat(quantity) <= 0) {
      newErrors.quantity = 'Quantity must be greater than 0';
    }

    if (orderType === 'Limit' && (!entryPrice || parseFloat(entryPrice) <= 0)) {
      newErrors.entryPrice = 'Entry price required for limit orders';
    }

    if (stopLoss && parseFloat(stopLoss) <= 0) {
      newErrors.stopLoss = 'Stop loss must be greater than 0';
    }

    if (takeProfit && parseFloat(takeProfit) <= 0) {
      newErrors.takeProfit = 'Take profit must be greater than 0';
    }

    if (!account || account.freeMargin <= 0) {
      newErrors.margin = 'Insufficient free margin';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const position = openPosition(
        asset,
        side,
        parseFloat(quantity),
        orderType,
        orderType === 'Limit' ? parseFloat(entryPrice) : null,
        stopLoss ? parseFloat(stopLoss) : null,
        takeProfit ? parseFloat(takeProfit) : null
      );

      Toast.success(`${side.toUpperCase()} order placed successfully`);

      // Reset form
      setQuantity('1.0');
      setEntryPrice('');
      setStopLoss('');
      setTakeProfit('');
      setLeverage('1');

      if (onOrderPlaced) {
        onOrderPlaced(position);
      }
    } catch (error) {
      Toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-secondary border border-tertiary rounded-lg p-4 sm:p-6">
      <h3 className="text-xl font-semibold text-neutral mb-4">Place Order</h3>

      {errors.margin && (
        <Alert
          type="danger"
          message={errors.margin}
          className="mb-4"
        />
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Side Selector */}
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setSide('buy')}
            className={`py-2 px-4 rounded-lg font-semibold transition-colors ${
              side === 'buy'
                ? 'bg-success text-primary'
                : 'bg-tertiary text-neutral hover:bg-opacity-80'
            }`}
          >
            BUY
          </button>
          <button
            type="button"
            onClick={() => setSide('sell')}
            className={`py-2 px-4 rounded-lg font-semibold transition-colors ${
              side === 'sell'
                ? 'bg-danger text-primary'
                : 'bg-tertiary text-neutral hover:bg-opacity-80'
            }`}
          >
            SELL
          </button>
        </div>

        {/* Order Type */}
        <Select
          label="Order Type"
          value={orderType}
          onChange={(e) => setOrderType(e.target.value)}
          options={[
            { value: 'Market', label: 'Market Order' },
            { value: 'Limit', label: 'Limit Order' },
          ]}
        />

        {/* Current Price Display */}
        <div className="bg-tertiary rounded-lg p-3">
          <p className="text-xs text-neutral-dark mb-1">Current Price</p>
          <p className="text-lg font-mono font-semibold text-accent">
            {formatPrice(currentPrice)}
          </p>
        </div>

        {/* Quantity */}
        <Input
          label="Quantity"
          type="number"
          step="0.01"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          error={errors.quantity}
          required
        />

        {/* Entry Price (for limit orders) */}
        {orderType === 'Limit' && (
          <Input
            label="Entry Price"
            type="number"
            step="0.0001"
            value={entryPrice}
            onChange={(e) => setEntryPrice(e.target.value)}
            error={errors.entryPrice}
            required
          />
        )}

        {/* Stop Loss */}
        <Input
          label="Stop Loss (Optional)"
          type="number"
          step="0.0001"
          value={stopLoss}
          onChange={(e) => setStopLoss(e.target.value)}
          error={errors.stopLoss}
          placeholder="Leave empty for no stop loss"
        />

        {/* Take Profit */}
        <Input
          label="Take Profit (Optional)"
          type="number"
          step="0.0001"
          value={takeProfit}
          onChange={(e) => setTakeProfit(e.target.value)}
          error={errors.takeProfit}
          placeholder="Leave empty for no take profit"
        />

        {/* Submit Button */}
        <Button
          type="submit"
          variant={side === 'buy' ? 'success' : 'danger'}
          size="lg"
          isLoading={loading}
          className="w-full"
        >
          {side.toUpperCase()} {quantity} {asset}
        </Button>
      </form>

      {/* Info */}
      <div className="mt-4 text-xs text-neutral-dark space-y-1 border-t border-tertiary pt-4">
        <p>📌 Demo trading simulation only</p>
        <p>🔒 No real money involved</p>
        <p>⚡ Real-time price updates</p>
      </div>
    </div>
  );
};

export default OrderPanel;
