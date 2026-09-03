import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, TrendingUp, Shield, Zap, BarChart3, Globe } from 'lucide-react';
import { Button } from '../components/common/Button';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: TrendingUp,
      title: 'Real-time Charts',
      description: 'Interactive price charts with multiple timeframes (1m to 1D)',
    },
    {
      icon: Zap,
      title: 'Instant Execution',
      description: 'Market and limit orders with automatic stop loss & take profit',
    },
    {
      icon: BarChart3,
      title: 'Portfolio Management',
      description: 'Track positions, balance, margin, and P/L in real-time',
    },
    {
      icon: Shield,
      title: 'Safe Testing',
      description: 'Paper trading simulator - no real money or market risk',
    },
    {
      icon: Globe,
      title: 'Multi-Asset',
      description: 'Trade Forex, Crypto, Commodities, and Indices',
    },
    {
      icon: TrendingUp,
      title: 'Learning Tools',
      description: 'Practice trading strategies without financial risk',
    },
  ];

  const markets = [
    { symbol: 'EUR/USD', category: 'Forex' },
    { symbol: 'GBP/USD', category: 'Forex' },
    { symbol: 'USD/JPY', category: 'Forex' },
    { symbol: 'BTC/USD', category: 'Crypto' },
    { symbol: 'ETH/USD', category: 'Crypto' },
    { symbol: 'GOLD', category: 'Commodities' },
    { symbol: 'SPX500', category: 'Indices' },
  ];

  return (
    <div className="min-h-screen bg-primary text-neutral">
      {/* Navigation */}
      <nav className="bg-secondary border-b border-tertiary sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-accent to-success rounded-lg flex items-center justify-center">
              <span className="font-bold text-primary text-sm">TP</span>
            </div>
            <span className="text-xl font-bold text-accent hidden sm:inline">Trading Platform</span>
          </div>
          <div className="flex gap-4">
            <Button variant="ghost" onClick={() => navigate('/login')}>
              Login
            </Button>
            <Button variant="primary" onClick={() => navigate('/register')}>
              Register
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Professional Trading <span className="text-accent">Made Simple</span>
            </h1>
            <p className="text-xl text-neutral-dark mb-8">
              Practice trading strategies risk-free with our paper trading simulator. Real-time price updates, interactive charts, and complete position management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate('/register')}
                className="gap-2"
              >
                Start Trading <ArrowRight className="w-5 h-5" />
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => navigate('/login')}
              >
                Try Demo Account
              </Button>
            </div>
            <p className="mt-6 text-sm text-neutral-dark">
              ✅ No credit card required • ✅ No real money • ✅ Instant registration
            </p>
          </div>

          <div className="bg-gradient-to-br from-tertiary to-secondary border border-accent border-opacity-20 rounded-lg p-8 h-96 flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="w-24 h-24 text-accent mx-auto mb-4" />
              <p className="text-neutral-dark">Interactive Trading Terminal</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-secondary border-t border-tertiary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">
            Powerful Features for <span className="text-accent">Paper Trading</span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="bg-primary border border-tertiary rounded-lg p-6 hover:border-accent transition-colors"
                >
                  <Icon className="w-12 h-12 text-accent mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-neutral-dark text-sm">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Markets Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">
          Available <span className="text-accent">Markets</span>
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {markets.map((market) => (
            <div
              key={market.symbol}
              className="bg-secondary border border-tertiary rounded-lg p-4 hover:border-accent transition-colors"
            >
              <p className="font-semibold text-accent text-lg">{market.symbol}</p>
              <p className="text-sm text-neutral-dark">{market.category}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Risk Disclaimer */}
      <section className="bg-secondary border-t border-tertiary py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-danger bg-opacity-10 border border-danger rounded-lg p-6">
            <h3 className="text-lg font-semibold text-danger mb-2">⚠️ Important Disclaimer</h3>
            <p className="text-neutral text-sm mb-3">
              This is a <strong>DEMO/PAPER TRADING PLATFORM ONLY</strong>. All trades are simulated and for educational purposes.
            </p>
            <ul className="text-neutral text-sm space-y-2">
              <li>❌ This is NOT a real trading platform</li>
              <li>❌ No real money is involved</li>
              <li>❌ Prices are simulated, NOT real market data</li>
              <li>❌ Trades are NOT executed on real financial markets</li>
              <li>✅ Use this only for learning and practicing strategies</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Start?</h2>
        <p className="text-xl text-neutral-dark mb-8 max-w-2xl mx-auto">
          Create your free demo account and start practicing trading strategies instantly.
        </p>
        <Button
          variant="primary"
          size="lg"
          onClick={() => navigate('/register')}
          className="gap-2"
        >
          Get Started Now <ArrowRight className="w-5 h-5" />
        </Button>
      </section>

      {/* Footer */}
      <footer className="bg-secondary border-t border-tertiary py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-neutral-dark text-sm">
          <p>Trading Platform © 2024 | Demo Paper Trading Simulator</p>
          <p className="mt-2">Educational purposes only • No real financial transactions</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
