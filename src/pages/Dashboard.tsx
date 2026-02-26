import { useNavigate } from 'react-router-dom';
import { TrendingUp, BarChart2, Users, Zap } from 'lucide-react';
import { mockCoins } from '../data/mockCoins';
import ScoreGauge from '../components/ScoreGauge';
import { formatPrice, formatVolume, getRiskBand, getRiskColor } from '../utils/scoring';

export default function Dashboard() {
  const navigate = useNavigate();

  const topCoins = [...mockCoins].sort((a, b) => b.happyScore - a.happyScore).slice(0, 3);
  const totalVolume = mockCoins.reduce((s, c) => s + c.volume24h, 0);
  const avgScore = Math.round(mockCoins.reduce((s, c) => s + c.happyScore, 0) / mockCoins.length);
  const totalHolders = mockCoins.reduce((s, c) => s + c.holders, 0);
  const highRisk = mockCoins.filter((c) => getRiskBand(c.happyScore) === 'critical' || getRiskBand(c.happyScore) === 'high').length;

  return (
    <div className="page dashboard">
      {/* Hero */}
      <section className="hero">
        <div className="hero-badge">Live Analytics</div>
        <h1 className="hero-title">
          PumpFun Coin <span className="gradient-text">Analytics</span>
        </h1>
        <p className="hero-sub">
          Evaluate token health using liquidity, volume, holders, and volatility.
          <br />
          Get objective HappyMeter scores for every coin — no hype, just data.
        </p>
        <div className="hero-actions">
          <button className="btn-primary" onClick={() => navigate('/rankings')}>
            View Rankings
          </button>
          <button className="btn-secondary" onClick={() => navigate('/about')}>
            How It Works
          </button>
        </div>

        <div className="hero-stats">
          <div className="hero-stat">
            <span className="hero-stat-value">{mockCoins.length}</span>
            <span className="hero-stat-label">Coins Tracked</span>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat">
            <span className="hero-stat-value">{formatVolume(totalVolume)}</span>
            <span className="hero-stat-label">24h Volume</span>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat">
            <span className="hero-stat-value">{avgScore}</span>
            <span className="hero-stat-label">Avg Score</span>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat">
            <span className="hero-stat-value" style={{ color: '#ef4444' }}>{highRisk}</span>
            <span className="hero-stat-label">High Risk</span>
          </div>
        </div>
      </section>

      {/* Market Overview Cards */}
      <section className="section">
        <h2 className="section-title">Market Overview</h2>
        <div className="overview-grid">
          <div className="overview-card">
            <div className="overview-card-icon blue">
              <BarChart2 size={20} />
            </div>
            <div>
              <div className="overview-card-label">Total 24h Volume</div>
              <div className="overview-card-value">{formatVolume(totalVolume)}</div>
            </div>
          </div>
          <div className="overview-card">
            <div className="overview-card-icon green">
              <TrendingUp size={20} />
            </div>
            <div>
              <div className="overview-card-label">Average Score</div>
              <div className="overview-card-value">{avgScore} / 100</div>
            </div>
          </div>
          <div className="overview-card">
            <div className="overview-card-icon purple">
              <Users size={20} />
            </div>
            <div>
              <div className="overview-card-label">Total Holders</div>
              <div className="overview-card-value">{totalHolders.toLocaleString()}</div>
            </div>
          </div>
          <div className="overview-card">
            <div className="overview-card-icon orange">
              <Zap size={20} />
            </div>
            <div>
              <div className="overview-card-label">High Risk Coins</div>
              <div className="overview-card-value" style={{ color: '#ef4444' }}>{highRisk} / {mockCoins.length}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Performers */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-title">Top Performers</h2>
          <button className="link-btn" onClick={() => navigate('/rankings')}>
            View all →
          </button>
        </div>
        <div className="top-coins-grid">
          {topCoins.map((coin, i) => {
            const band = getRiskBand(coin.happyScore);
            const color = getRiskColor(band);
            return (
              <div
                key={coin.id}
                className="top-coin-card"
                onClick={() => navigate(`/coin/${coin.id}`)}
                style={{ cursor: 'pointer' }}
              >
                <div className="top-coin-rank">#{i + 1}</div>
                <div className="top-coin-header">
                  <div>
                    <div className="top-coin-name">{coin.name}</div>
                    <div className="top-coin-ticker">{coin.ticker}</div>
                  </div>
                  <ScoreGauge score={coin.happyScore} size="sm" />
                </div>
                <div className="top-coin-stats">
                  <div className="top-coin-stat">
                    <span className="tcs-label">Price</span>
                    <span className="tcs-value">{formatPrice(coin.price)}</span>
                  </div>
                  <div className="top-coin-stat">
                    <span className="tcs-label">24h</span>
                    <span className={`tcs-value ${coin.priceChange24h >= 0 ? 'positive' : 'negative'}`}>
                      {coin.priceChange24h >= 0 ? '+' : ''}{coin.priceChange24h}%
                    </span>
                  </div>
                  <div className="top-coin-stat">
                    <span className="tcs-label">Volume</span>
                    <span className="tcs-value">{formatVolume(coin.volume24h)}</span>
                  </div>
                </div>
                <div className="top-coin-bar-track">
                  <div className="top-coin-bar-fill" style={{ width: `${coin.happyScore}%`, background: color }} />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
