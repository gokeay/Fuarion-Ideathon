import { useContext } from 'react';
import { Post } from '../types';
import { FilterContext } from '../state/FilterContext';
import { filterPosts } from '../lib/analytics';
import Filters from '../components/Filters';
import KPIs from '../components/KPIs';

export default function TwinView({ posts }: { posts: Post[] }) {
  const { filters } = useContext(FilterContext);
  const filtered = filterPosts(posts, filters);

  // Digital Twin simülasyonu
  const twinData = {
    realTimePosts: filtered.length,
    predictedTrend: Math.round(filtered.length * 1.15), // %15 artış tahmini
    sentimentPrediction: filtered.reduce((sum, p) => sum + p.sentiment, 0) / filtered.length + 0.05,
    topRegions: ['İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya'],
    viralPotential: filtered.filter(p => p.sentiment > 0.5).length,
    crisisIndicators: filtered.filter(p => p.sentiment < -0.7).length
  };

  const getSentimentLabel = (score: number) => {
    if (score > 0.3) return 'Çok Pozitif';
    if (score > 0.1) return 'Pozitif';
    if (score > -0.1) return 'Nötr';
    if (score > -0.3) return 'Negatif';
    return 'Çok Negatif';
  };

  return (
    <div>
      <Filters />
      <KPIs posts={filtered} />
      
      <div className="charts-container">
        <div className="chart-card">
          <h3 className="chart-title">🔄 Digital Twin Simülasyonu</h3>
          <div style={{ padding: '1rem', display: 'grid', gap: '1rem' }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '1rem',
              background: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-md)'
            }}>
              <span style={{ color: 'var(--text-secondary)' }}>Gerçek Zamanlı Post:</span>
              <span style={{ fontWeight: '600', color: 'var(--primary-color)' }}>
                {twinData.realTimePosts}
              </span>
            </div>
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '1rem',
              background: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-md)'
            }}>
              <span style={{ color: 'var(--text-secondary)' }}>Tahmini Trend:</span>
              <span style={{ fontWeight: '600', color: 'var(--accent-color)' }}>
                {twinData.predictedTrend}
              </span>
            </div>
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '1rem',
              background: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-md)'
            }}>
              <span style={{ color: 'var(--text-secondary)' }}>Duygu Tahmini:</span>
              <span style={{ fontWeight: '600', color: 'var(--success-color)' }}>
                {getSentimentLabel(twinData.sentimentPrediction)}
              </span>
            </div>
          </div>
        </div>

        <div className="chart-card">
          <h3 className="chart-title">📊 Bölgesel Analiz</h3>
          <div style={{ padding: '1rem' }}>
            <div style={{ marginBottom: '1rem' }}>
              <h4 style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                En Aktif Bölgeler:
              </h4>
              {twinData.topRegions.map((region, index) => (
                <div key={region} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.5rem 0',
                  borderBottom: '1px solid var(--border-color)'
                }}>
                  <span style={{ color: 'var(--text-primary)' }}>
                    #{index + 1} {region}
                  </span>
                  <span style={{ 
                    fontWeight: '600', 
                    color: 'var(--primary-color)',
                    fontSize: '0.875rem'
                  }}>
                    {Math.round(Math.random() * 100 + 50)} post
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="chart-card">
          <h3 className="chart-title">🚨 Risk Analizi</h3>
          <div style={{ padding: '1rem', display: 'grid', gap: '1rem' }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '1rem',
              background: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-md)'
            }}>
              <span style={{ color: 'var(--text-secondary)' }}>Viral Potansiyel:</span>
              <span style={{ fontWeight: '600', color: 'var(--success-color)' }}>
                {twinData.viralPotential} post
              </span>
            </div>
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '1rem',
              background: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-md)'
            }}>
              <span style={{ color: 'var(--text-secondary)' }}>Kriz Göstergeleri:</span>
              <span style={{ fontWeight: '600', color: 'var(--danger-color)' }}>
                {twinData.crisisIndicators} post
              </span>
            </div>
            
            <div style={{ 
              padding: '1rem',
              background: twinData.crisisIndicators > 10 ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
              borderRadius: 'var(--radius-md)',
              border: `1px solid ${twinData.crisisIndicators > 10 ? 'var(--danger-color)' : 'var(--success-color)'}`,
              textAlign: 'center'
            }}>
              <span style={{ 
                color: twinData.crisisIndicators > 10 ? 'var(--danger-color)' : 'var(--success-color)',
                fontWeight: '600'
              }}>
                {twinData.crisisIndicators > 10 ? '⚠️ Dikkat Gerekli' : '✅ Durum Normal'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
