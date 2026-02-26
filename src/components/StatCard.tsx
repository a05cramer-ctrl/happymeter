import { ReactNode } from 'react';

interface Props {
  label: string;
  value: string;
  icon: ReactNode;
  change?: number;
  accent?: string;
}

export default function StatCard({ label, value, icon, change, accent }: Props) {
  return (
    <div className="stat-card">
      <div className="stat-card-icon" style={{ background: accent ? `${accent}18` : undefined }}>
        <span style={{ color: accent }}>{icon}</span>
      </div>
      <div className="stat-card-body">
        <span className="stat-label">{label}</span>
        <span className="stat-value">{value}</span>
        {change !== undefined && (
          <span className={`stat-change ${change >= 0 ? 'positive' : 'negative'}`}>
            {change >= 0 ? '▲' : '▼'} {Math.abs(change).toFixed(2)}%
          </span>
        )}
      </div>
    </div>
  );
}
