import { useContext } from 'react';
import { FilterContext } from '../state/FilterContext';

export default function Filters() {
  const { filters, setFilters } = useContext(FilterContext);

  const set = (key: string, value: any) => {
    setFilters({ ...filters, [key]: value || undefined });
  };

  return (
    <div className="filters-container">
      <h3 className="filters-title">
        🔍 Filtreler
      </h3>
      <div className="filters-grid">
        <div className="filter-group">
          <label className="filter-label">Platform</label>
          <select
            className="filter-select"
            value={filters.platform || ''}
            onChange={(e) => set('platform', e.target.value)}
          >
            <option value="">Tüm Platformlar</option>
            <option value="twitter">Twitter</option>
            <option value="instagram">Instagram</option>
            <option value="facebook">Facebook</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label className="filter-label">Hashtag</label>
          <input
            className="filter-input"
            placeholder="Hashtag ara..."
            value={filters.hashtag || ''}
            onChange={(e) => set('hashtag', e.target.value)}
          />
        </div>
        
        <div className="filter-group">
          <label className="filter-label">Minimum Duygu Skoru</label>
          <input
            className="filter-input"
            type="number"
            placeholder="Duygu skoru..."
            min="-1"
            max="1"
            step="0.1"
            value={filters.minSentiment ?? ''}
            onChange={(e) =>
              set(
                'minSentiment',
                e.target.value === '' ? undefined : Number(e.target.value)
              )
            }
          />
        </div>
        
        <div className="filter-group">
          <label className="filter-label">Tarih</label>
          <input
            className="filter-input"
            type="date"
            value={filters.day || ''}
            onChange={(e) => set('day', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
