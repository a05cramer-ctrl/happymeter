import { getRiskBand, getRiskColor, getRiskLabel } from '../utils/scoring';

interface Props {
  score: number;
  size?: 'sm' | 'md' | 'lg';
}

export default function ScoreGauge({ score, size = 'md' }: Props) {
  const band = getRiskBand(score);
  const color = getRiskColor(band);
  const label = getRiskLabel(band);

  const sizeMap = {
    sm: { bar: 80, height: 6, font: 13 },
    md: { bar: 140, height: 8, font: 15 },
    lg: { bar: 200, height: 12, font: 18 },
  };
  const s = sizeMap[size];

  return (
    <div className="score-gauge" style={{ width: s.bar }}>
      <div className="score-gauge-header" style={{ fontSize: s.font }}>
        <span className="score-value" style={{ color }}>{score}</span>
        <span className="score-max">/100</span>
      </div>
      <div className="score-track" style={{ height: s.height }}>
        <div
          className="score-fill"
          style={{ width: `${score}%`, backgroundColor: color, height: s.height }}
        />
      </div>
      <span className="score-label" style={{ color, fontSize: s.font - 3 }}>{label}</span>
    </div>
  );
}
