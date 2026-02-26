interface Props {
  label: string;
  value: number;
  color: string;
}

export default function ScoreBreakdownBar({ label, value, color }: Props) {
  return (
    <div className="breakdown-row">
      <div className="breakdown-label-row">
        <span className="breakdown-label">{label}</span>
        <span className="breakdown-value" style={{ color }}>{value}</span>
      </div>
      <div className="breakdown-track">
        <div
          className="breakdown-fill"
          style={{ width: `${value}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}
