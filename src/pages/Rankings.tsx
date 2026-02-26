import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronUp, ChevronDown, ChevronsUpDown, Filter } from 'lucide-react';
import { mockCoins } from '../data/mockCoins';
import type { SortField, SortDirection, RiskBand } from '../types';
import { formatPrice, formatVolume, formatNumber, getRiskBand, getRiskColor, getRiskLabel } from '../utils/scoring';

type FilterBand = 'all' | RiskBand;

export default function Rankings() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState<SortField>('happyScore');
  const [sortDir, setSortDir] = useState<SortDirection>('desc');
  const [filterBand, setFilterBand] = useState<FilterBand>('all');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDir('desc');
    }
  };

  const sorted = useMemo(() => {
    return [...mockCoins]
      .filter((c) => {
        const matchSearch =
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.ticker.toLowerCase().includes(search.toLowerCase());
        const matchBand = filterBand === 'all' || getRiskBand(c.happyScore) === filterBand;
        return matchSearch && matchBand;
      })
      .sort((a, b) => {
        const av = a[sortField as keyof typeof a] as number;
        const bv = b[sortField as keyof typeof b] as number;
        if (typeof av === 'string') return 0;
        return sortDir === 'asc' ? (av as number) - (bv as number) : (bv as number) - (av as number);
      });
  }, [search, sortField, sortDir, filterBand]);

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ChevronsUpDown size={14} className="sort-icon" />;
    return sortDir === 'asc' ? (
      <ChevronUp size={14} className="sort-icon active" />
    ) : (
      <ChevronDown size={14} className="sort-icon active" />
    );
  };

  const bands: FilterBand[] = ['all', 'low', 'medium', 'high', 'critical'];
  const bandLabels: Record<FilterBand, string> = {
    all: 'All',
    low: 'Low Risk',
    medium: 'Medium Risk',
    high: 'High Risk',
    critical: 'Critical',
  };

  return (
    <div className="page rankings">
      <div className="page-header">
        <h1 className="page-title">Token Rankings</h1>
        <p className="page-sub">Ranked by HappyMeter Score — composite health rating across all key metrics.</p>
      </div>

      {/* Controls */}
      <div className="rankings-controls">
        <div className="search-box">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search by name or ticker…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-pills">
          <Filter size={14} className="filter-label-icon" />
          {bands.map((b) => (
            <button
              key={b}
              className={`filter-pill ${filterBand === b ? 'active' : ''} ${b !== 'all' ? `band-${b}` : ''}`}
              onClick={() => setFilterBand(b)}
            >
              {bandLabels[b]}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="table-wrapper">
        <table className="rankings-table">
          <thead>
            <tr>
              <th className="th-rank">#</th>
              <th className="th-sortable" onClick={() => handleSort('name')}>
                Coin <SortIcon field="name" />
              </th>
              <th className="th-sortable" onClick={() => handleSort('price')}>
                Price <SortIcon field="price" />
              </th>
              <th className="th-sortable" onClick={() => handleSort('priceChange24h')}>
                24h % <SortIcon field="priceChange24h" />
              </th>
              <th className="th-sortable" onClick={() => handleSort('volume24h')}>
                Volume <SortIcon field="volume24h" />
              </th>
              <th className="th-sortable" onClick={() => handleSort('liquidity')}>
                Liquidity <SortIcon field="liquidity" />
              </th>
              <th className="th-sortable" onClick={() => handleSort('holders')}>
                Holders <SortIcon field="holders" />
              </th>
              <th className="th-sortable" onClick={() => handleSort('volatility')}>
                Volatility <SortIcon field="volatility" />
              </th>
              <th className="th-sortable th-score" onClick={() => handleSort('happyScore')}>
                Score <SortIcon field="happyScore" />
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.length === 0 ? (
              <tr>
                <td colSpan={9} className="empty-row">No coins match your filters.</td>
              </tr>
            ) : (
              sorted.map((coin, i) => {
                const band = getRiskBand(coin.happyScore);
                const color = getRiskColor(band);
                return (
                  <tr
                    key={coin.id}
                    className="table-row"
                    onClick={() => navigate(`/coin/${coin.id}`)}
                  >
                    <td className="td-rank">{i + 1}</td>
                    <td className="td-coin">
                      <div className="coin-name-cell">
                        <span className="coin-name">{coin.name}</span>
                        <span className="coin-ticker">{coin.ticker}</span>
                      </div>
                    </td>
                    <td className="td-num">{formatPrice(coin.price)}</td>
                    <td className={`td-num ${coin.priceChange24h >= 0 ? 'positive' : 'negative'}`}>
                      {coin.priceChange24h >= 0 ? '+' : ''}{coin.priceChange24h}%
                    </td>
                    <td className="td-num">{formatVolume(coin.volume24h)}</td>
                    <td className="td-num">{formatVolume(coin.liquidity)}</td>
                    <td className="td-num">{formatNumber(coin.holders)}</td>
                    <td className="td-num">
                      <span className="volatility-badge" style={{ color, borderColor: `${color}40`, background: `${color}12` }}>
                        {coin.volatility}%
                      </span>
                    </td>
                    <td className="td-score">
                      <div className="score-cell">
                        <span className="score-num" style={{ color }}>{coin.happyScore}</span>
                        <div className="score-mini-track">
                          <div className="score-mini-fill" style={{ width: `${coin.happyScore}%`, background: color }} />
                        </div>
                        <span className="score-band-label" style={{ color }}>{getRiskLabel(band)}</span>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="table-footer">
        Showing {sorted.length} of {mockCoins.length} tokens · Click any row to view details
      </div>
    </div>
  );
}
