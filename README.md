# Trading Platform - Demo Paper Trading Terminal

A modern, responsive web-based demo trading platform built with React, Vite, and Tailwind CSS. This is a **paper trading simulator** designed for educational and demonstration purposes only.

## ⚠️ IMPORTANT DISCLAIMER

**This application is for DEMO/PAPER TRADING ONLY.**

- ❌ This is NOT a real trading platform
- ❌ No real money is involved
- ❌ Prices are simulated and NOT real market prices
- ❌ Trades are NOT executed on real financial markets
- ✅ All data is stored locally in your browser (localStorage)
- ✅ Use this only for learning and practicing trading strategies

## Features

### 📊 Trading Terminal
- Real-time simulated price charts (Recharts)
- Interactive buy/sell order placement
- Open positions management
- Trade history tracking
- Live P/L calculation
- Multiple timeframe support (1m, 5m, 15m, 1h, 4h, 1D)

### 📈 Markets Page
- Multi-asset support (Forex, Crypto, Indices, Commodities)
- Live price updates
- Bid/Ask spreads
- Market sentiment indicators

### 💼 Portfolio Management
- Account balance tracking
- Equity and margin calculations
- Unrealized P/L monitoring
- Position sizing

### 🔐 Authentication
- Demo login system (no real credentials)
- Registration with validation
- Session management

### ⚙️ Settings
- Profile management
- Notification preferences
- Trading preferences
- Appearance settings

## Tech Stack

- **React 18** - UI library
- **Vite 5** - Build tool
- **Tailwind CSS 3** - Styling
- **React Router 6** - Navigation
- **Recharts 2** - Charts & visualization
- **Lucide React** - Icons

## Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/oisera-2143/trading-platform.git
cd trading-platform

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will open at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/          # Reusable React components
│   ├── layout/         # Layout components (Navbar, Sidebar, etc.)
│   ├── trading/        # Trading-specific components
│   ├── common/         # Common UI components
│   └── forms/          # Form components
├── pages/              # Page components (routes)
├── context/            # React Context for state management
├── services/           # Business logic (trading engine, price simulation)
├── data/               # Mock data and market data
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── styles/             # Global styles
├── App.jsx            # Main app component
├── main.jsx           # Entry point
└── index.css          # Global CSS
```

## Paper Trading Engine

The platform includes a complete paper trading simulation engine:

### Price Simulation
- Realistic price movements using brownian motion
- Configurable volatility and price ranges
- Updates every second in real-time charts
- Persists all data to localStorage

### Trade Management
- Market orders (instant execution)
- Limit orders (when price reaches level)
- Stop loss and take profit automation
- Position tracking and P/L calculation
- Realistic bid/ask spreads

### Account Management
- Starting balance: $10,000
- Real-time balance updates
- Equity and margin calculations
- Risk management features

## Usage Guide

### Landing Page
1. Visit the home page to see platform features
2. Click "Start Trading" or "Try Demo Account"
3. Register with any email/password (demo only)

### Trading Dashboard
1. Select an asset from the market watch
2. View the interactive price chart
3. Enter order details (amount, leverage, etc.)
4. Click Buy or Sell to open a position
5. Monitor P/L in real-time
6. Close positions to realize gains/losses

### Markets Page
- Browse available trading instruments
- View real-time simulated prices
- Check bid/ask spreads
- Monitor market status

### Portfolio
- Track account balance and equity
- Monitor margin usage
- View open positions and P/L
- Review trade history

## Demo Credentials

The app uses a demo login system. You can use any email/password:
- Email: `demo@example.com`
- Password: `demo123`

(These are NOT real credentials)

## Key Features Implementation

### Real-time Price Updates
- Prices update every second
- Simulates market volatility
- Bid/ask spreads applied automatically

### P/L Calculation
- Unrealized P/L: (Current Price - Entry Price) × Quantity
- Realized P/L: Recorded after position closure
- Includes costs and spreads

### Risk Management
- Stop loss execution
- Take profit execution
- Margin requirements
- Leverage support

### Data Persistence
- All trading data saved to localStorage
- Survives browser refresh
- Clear portfolio option in settings

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Limitations

- **Demo Only**: No real market data or real trading
- **Simulated Prices**: Not connected to real exchanges
- **Browser Storage**: Data lost if localStorage is cleared
- **No Mobile App**: Web application only
- **No API**: No external market data sources

## Contributing

This is an educational project. Feel free to fork, modify, and improve!

## License

MIT License - See LICENSE file for details

## Security Note

**This application does NOT:**
- Store real passwords
- Connect to real financial markets
- Process real money
- Include API keys or secrets
- Require bank account information

**All trading is simulated and for educational purposes only.**

## Support

For issues, questions, or suggestions, please open a GitHub issue.

---

**Remember**: This is a demo platform for learning only. Never use it for real trading or financial decisions.
