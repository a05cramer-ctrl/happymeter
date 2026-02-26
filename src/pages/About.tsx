import { BarChart2, Droplets, Users, Zap, TrendingUp, Shield } from 'lucide-react';

const metrics = [
  {
    icon: <Droplets size={22} />,
    title: 'Liquidity',
    weight: '25%',
    desc: 'Total available liquidity in trading pools. Higher liquidity reduces slippage and indicates a more stable, tradeable asset.',
    color: '#0ea5e9',
  },
  {
    icon: <BarChart2 size={22} />,
    title: 'Volume',
    weight: '25%',
    desc: '24-hour trading volume relative to market cap. Healthy volume signals active market participation and genuine interest.',
    color: '#6366f1',
  },
  {
    icon: <Users size={22} />,
    title: 'Holders',
    weight: '20%',
    desc: 'Number of unique wallet holders. A broad holder distribution reduces concentration risk and whale manipulation.',
    color: '#8b5cf6',
  },
  {
    icon: <Zap size={22} />,
    title: 'Volatility',
    weight: '15%',
    desc: 'Measured as 30-day price standard deviation. Lower volatility indicates a more stable asset, scored inversely.',
    color: '#f59e0b',
  },
  {
    icon: <TrendingUp size={22} />,
    title: 'Momentum',
    weight: '15%',
    desc: 'Short-term price and volume trend strength. Positive momentum with controlled risk earns a higher contribution.',
    color: '#10b981',
  },
];

const bands = [
  { range: '75 – 100', label: 'Low Risk', color: '#10b981', desc: 'Strong fundamentals. Healthy liquidity, broad holders, low volatility.' },
  { range: '50 – 74', label: 'Medium Risk', color: '#f59e0b', desc: 'Adequate metrics with some weakness. Suitable for higher-risk tolerance.' },
  { range: '25 – 49', label: 'High Risk', color: '#f97316', desc: 'Significant concerns in multiple areas. Speculative exposure only.' },
  { range: '0 – 24', label: 'Critical Risk', color: '#ef4444', desc: 'Severe red flags. Extreme caution — potential rug risk or illiquid market.' },
];

export default function About() {
  return (
    <div className="page about">
      <div className="page-header">
        <h1 className="page-title">About HappyMeter</h1>
        <p className="page-sub">A transparent, data-driven scoring system for PumpFun tokens.</p>
      </div>

      {/* Mission */}
      <section className="about-section">
        <div className="about-mission">
          <Shield size={40} className="mission-icon" />
          <div>
            <h2>Our Mission</h2>
            <p>
              HappyMeter exists to bring objective analysis to the PumpFun ecosystem. We evaluate every token
              using a consistent, transparent methodology — no sponsored rankings, no biased listings.
              Our HappyMeter Score gives traders and researchers a fast, reliable signal for token health
              before they commit capital.
            </p>
          </div>
        </div>
      </section>

      {/* Score Methodology */}
      <section className="about-section">
        <h2 className="section-title">Score Methodology</h2>
        <p className="about-intro">
          The HappyMeter Score (0–100) is a weighted composite of five key on-chain and market metrics.
          Each metric is normalized to a 0–100 sub-score, then combined using the weights below.
        </p>
        <div className="metric-grid">
          {metrics.map((m) => (
            <div key={m.title} className="metric-card">
              <div className="metric-icon" style={{ background: `${m.color}18`, color: m.color }}>
                {m.icon}
              </div>
              <div className="metric-header">
                <span className="metric-title">{m.title}</span>
                <span className="metric-weight" style={{ color: m.color }}>{m.weight}</span>
              </div>
              <p className="metric-desc">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Risk Bands */}
      <section className="about-section">
        <h2 className="section-title">Risk Classification</h2>
        <div className="bands-list">
          {bands.map((b) => (
            <div key={b.label} className="band-row">
              <div className="band-score-range" style={{ color: b.color, borderColor: `${b.color}40` }}>
                {b.range}
              </div>
              <div>
                <div className="band-label" style={{ color: b.color }}>{b.label}</div>
                <div className="band-desc">{b.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <section className="about-section">
        <div className="disclaimer">
          <strong>Disclaimer:</strong> HappyMeter scores are for informational purposes only and do not constitute
          financial advice. Cryptocurrency investments carry significant risk. Always conduct your own due diligence
          before making investment decisions.
        </div>
      </section>
    </div>
  );
}
