import { useParams, useNavigate } from 'react-router-dom';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { ArrowLeft, TrendingUp, TrendingDown, Users, Droplets, Zap, Calendar } from 'lucide-react';
import { mockCoins } from '../data/mockCoins';
import { formatPrice, formatVolume, formatNumber, getRiskBand, getRiskColor, getRiskLabel } from '../utils/scoring';
import ScoreGauge from '../components/ScoreGauge';
import ScoreBreakdownBar from '../components/ScoreBreakdownBar';
import StatCard from '../components/StatCard';

const CHART_COLOR = '#6366f1';

export default function CoinDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const coin = mockCoins.find((c) => c.id === id);

  if (!coin) {
    return (
      <div className="page not-found">
        <h2>Coin not found</h2>
        <button className="btn-primary" onClick={() => navigate('/rankings')}>Back to Rankings</button>
      </div>
    );
  }

  const band = getRiskBand(coin.happyScore);
  const color = getRiskColor(band);
  const label = getRiskLabel(band);

  const breakdownItems = [
    { label: 'Liquidity Score', value: coin.scoreBreakdown.liquidity },
    { label: 'Volume Score', value: coin.scoreBreakdown.volume },
    { label: 'Holders Score', value: coin.scoreBreakdown.holders },
    { label: 'Volatility Score', value: coin.scoreBreakdown.volatility },
    { label: 'Momentum Score', value: coin.scoreBreakdown.momentum },
  ];

  return (
    <div className="page coin-detail">
      {/* Back */}
      <button className="back-btn" onClick={() => navigate(-1)}>
        <ArrowLeft size={16} /> Back
      </button>

      {/* Header */}
      <div className="detail-header">
        <div className="detail-title-group">
          <div>
            <h1 className="detail-name">{coin.name}</h1>
            <span className="detail-ticker">{coin.ticker}</span>
          </div>
          <div className="detail-score-block">
            <ScoreGauge score={coin.happyScore} size="lg" />
          </div>
        </div>
        <p className="detail-description">{coin.description}</p>
      </div>

      {/* Stats */}
      <div className="detail-stats-grid">
        <StatCard
          label="Price"
          value={formatPrice(coin.price)}
          icon={coin.priceChange24h >= 0 ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
          change={coin.priceChange24h}
          accent={coin.priceChange24h >= 0 ? '#10b981' : '#ef4444'}
        />
        <StatCard
          label="24h Volume"
          value={formatVolume(coin.volume24h)}
          icon={<Zap size={18} />}
          accent="#6366f1"
        />
        <StatCard
          label="Liquidity"
          value={formatVolume(coin.liquidity)}
          icon={<Droplets size={18} />}
          accent="#0ea5e9"
        />
        <StatCard
          label="Holders"
          value={formatNumber(coin.holders)}
          icon={<Users size={18} />}
          accent="#8b5cf6"
        />
        <StatCard
          label="Market Cap"
          value={formatVolume(coin.marketCap)}
          icon={<TrendingUp size={18} />}
          accent="#f59e0b"
        />
        <StatCard
          label="Launch Date"
          value={new Date(coin.launchDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
          icon={<Calendar size={18} />}
          accent="#6366f1"
        />
      </div>

      {/* Charts + Score Breakdown */}
      <div className="detail-content">
        {/* Left: Charts */}
        <div className="charts-col">
          <div className="chart-card">
            <h3 className="chart-title">Price History (30d)</h3>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={coin.priceHistory}>
                <defs>
                  <linearGradient id="priceGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={CHART_COLOR} stopOpacity={0.25} />
                    <stop offset="95%" stopColor={CHART_COLOR} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff0a" />
                <XAxis dataKey="time" tick={{ fontSize: 11, fill: '#64748b' }} tickLine={false} interval={6} />
                <YAxis
                  tickFormatter={(v) => formatPrice(v)}
                  tick={{ fontSize: 11, fill: '#64748b' }}
                  tickLine={false}
                  axisLine={false}
                  width={72}
                />
                <Tooltip
                  contentStyle={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 8 }}
                  labelStyle={{ color: '#94a3b8', fontSize: 12 }}
                  itemStyle={{ color: CHART_COLOR }}
                  formatter={(v: number) => [formatPrice(v), 'Price']}
                />
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke={CHART_COLOR}
                  strokeWidth={2}
                  fill="url(#priceGrad)"
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card">
            <h3 className="chart-title">Volume History (30d)</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={coin.volumeHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff0a" />
                <XAxis dataKey="time" tick={{ fontSize: 11, fill: '#64748b' }} tickLine={false} interval={6} />
                <YAxis
                  tickFormatter={(v) => formatVolume(v)}
                  tick={{ fontSize: 11, fill: '#64748b' }}
                  tickLine={false}
                  axisLine={false}
                  width={72}
                />
                <Tooltip
                  contentStyle={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 8 }}
                  labelStyle={{ color: '#94a3b8', fontSize: 12 }}
                  itemStyle={{ color: '#0ea5e9' }}
                  formatter={(v: number) => [formatVolume(v), 'Volume']}
                />
                <Bar dataKey="volume" fill="#0ea5e9" radius={[3, 3, 0, 0]} opacity={0.85} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Score Breakdown */}
        <div className="score-breakdown-card">
          <h3 className="chart-title">HappyMeter Score Breakdown</h3>
          <div className="score-total-display">
            <span className="score-big" style={{ color }}>{coin.happyScore}</span>
            <div>
              <div className="score-band-pill" style={{ background: `${color}20`, color }}>{label}</div>
              <div className="score-total-sub">Composite Score</div>
            </div>
          </div>

          <div className="breakdown-list">
            {breakdownItems.map((item) => {
              const itemBand = getRiskBand(item.value);
              const itemColor = getRiskColor(itemBand);
              return (
                <ScoreBreakdownBar
                  key={item.label}
                  label={item.label}
                  value={item.value}
                  color={itemColor}
                />
              );
            })}
          </div>

          <div className="score-legend">
            <div className="legend-item"><span className="legend-dot" style={{ background: '#10b981' }} />Low Risk (75–100)</div>
            <div className="legend-item"><span className="legend-dot" style={{ background: '#f59e0b' }} />Medium Risk (50–74)</div>
            <div className="legend-item"><span className="legend-dot" style={{ background: '#f97316' }} />High Risk (25–49)</div>
            <div className="legend-item"><span className="legend-dot" style={{ background: '#ef4444' }} />Critical (0–24)</div>
          </div>
        </div>
      </div>
    </div>
  );
}
