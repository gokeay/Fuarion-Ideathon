import { useContext, useState } from 'react';
import { Post } from '../types';
import { FilterContext } from '../state/FilterContext';
import { filterPosts } from '../lib/analytics';
import Filters from '../components/Filters';
import KPIs from '../components/KPIs';
import MapSVG from '../components/MapSVG';

export default function MapView({ posts }: { posts: Post[] }) {
  const { filters } = useContext(FilterContext);
  const filtered = filterPosts(posts, filters);
  const [mode, setMode] = useState<'turkiye' | 'marmara'>('turkiye');
  
  return (
    <div>
      <Filters />
      <KPIs posts={filtered} />
      
      <div className="map-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <h3 className="map-title">
            {mode === 'turkiye' ? '🗺️ Türkiye Haritası - Sosyal Medya Aktivitesi' : '🗺️ Marmara Bölgesi - Sosyal Medya Aktivitesi'}
          </h3>
          {mode === 'marmara' && (
            <button 
              onClick={() => setMode('turkiye')} 
              className="nav-tab"
              style={{ padding: '0.5rem 1rem' }}
            >
              ◀️ Türkiye'ye Dön
            </button>
          )}
        </div>
        <MapSVG 
          posts={filtered} 
          mode={mode}
          onEnterMarmara={() => setMode('marmara')}
        />
        {mode === 'turkiye' && (
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
            Marmara bölgesine yakınlaştırmak için haritanın Marmara bölgesi alanına tıklayın.
          </div>
        )}
      </div>
    </div>
  );
}
