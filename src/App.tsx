import { Suspense, useState } from 'react';
import { FilterProvider } from './state/FilterContext';
import { generateFakePosts } from './lib/fakeData';
import MapView from './views/MapView';
import TrendsView from './views/TrendsView';
import TagsView from './views/TagsView';
import InsightsView from './views/InsightsView';
import DataView from './views/DataView';
import TwinView from './views/TwinView';
import { Post } from './types';

const posts: Post[] = generateFakePosts();
const TABS = ['Map', 'Trends', 'Tags', 'Insights', 'Data', 'Twin'] as const;

export default function App() {
  const [tab, setTab] = useState<typeof TABS[number]>('Map');
  
  return (
    <FilterProvider>
      <div className="app-container">
        <nav className="nav-container">
          <h1 className="nav-title">📊 Sosyal Medya Analiz Platformu</h1>
          <div className="nav-tabs">
            {TABS.map((t) => (
              <button 
                key={t} 
                className={`nav-tab ${tab === t ? 'active' : ''}`}
                onClick={() => setTab(t)} 
                disabled={tab === t}
              >
                {t === 'Map' && '🗺️ Harita'}
                {t === 'Trends' && '📈 Trendler'}
                {t === 'Tags' && '🏷️ Etiketler'}
                {t === 'Insights' && '💡 İçgörüler'}
                {t === 'Data' && '📋 Veriler'}
                {t === 'Twin' && '🔄 Digital Twin'}
              </button>
            ))}
          </div>
        </nav>
        
        <main className="main-content">
          <Suspense fallback={
            <div className="loading">
              <div className="loading-spinner"></div>
            </div>
          }>
            {tab === 'Map' && <MapView posts={posts} />}
            {tab === 'Trends' && <TrendsView posts={posts} />}
            {tab === 'Tags' && <TagsView posts={posts} />}
            {tab === 'Insights' && <InsightsView posts={posts} />}
            {tab === 'Data' && <DataView posts={posts} />}
            {tab === 'Twin' && <TwinView />}
          </Suspense>
        </main>
      </div>
    </FilterProvider>
  );
}
