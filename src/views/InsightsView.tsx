import { useContext } from 'react';
import { Post } from '../types';
import { FilterContext } from '../state/FilterContext';
import { filterPosts } from '../lib/analytics';
import Filters from '../components/Filters';
import KPIs from '../components/KPIs';

export default function InsightsView({ posts }: { posts: Post[] }) {
  const { filters } = useContext(FilterContext);
  const filtered = filterPosts(posts, filters);

  // İçgörüler hesaplama
  const insights = {
    totalPosts: filtered.length,
    avgSentiment: filtered.reduce((sum, p) => sum + p.sentiment, 0) / filtered.length,
    topPlatform: filtered.reduce((acc, p) => {
      acc[p.platform] = (acc[p.platform] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    topHashtag: filtered.reduce((acc, p) => {
      p.hashtags.forEach(tag => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>),
    sentimentTrend: filtered
      .sort((a, b) => a.timestamp - b.timestamp)
      .reduce((acc, p, i) => {
        if (i % 20 === 0) acc.push(p.sentiment);
        return acc;
      }, [] as number[])
  };

  const topPlatform = Object.entries(insights.topPlatform)
    .sort(([,a], [,b]) => b - a)[0];
  
  const topHashtag = Object.entries(insights.topHashtag)
    .sort(([,a], [,b]) => b - a)[0];

  const getSentimentLabel = (score: number) => {
    if (score > 0.3) return 'Çok Pozitif';
    if (score > 0.1) return 'Pozitif';
    if (score > -0.1) return 'Nötr';
    if (score > -0.3) return 'Negatif';
    return 'Çok Negatif';
  };

  const getSentimentColor = (score: number) => {
    if (score > 0.1) return 'var(--success-color)';
    if (score < -0.1) return 'var(--danger-color)';
    return 'var(--warning-color)';
  };

  return (
    <div>
      <Filters />
      <KPIs posts={filtered} />
      
      <div className="charts-container">
        <div className="chart-card">
          <h3 className="chart-title">💡 Genel İçgörüler</h3>
          <div style={{ padding: '1rem', display: 'grid', gap: '1rem' }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '1rem',
              background: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-md)'
            }}>
              <span style={{ color: 'var(--text-secondary)' }}>Toplam Analiz:</span>
              <span style={{ fontWeight: '600', color: 'var(--primary-color)' }}>
                {insights.totalPosts} post
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
              <span style={{ color: 'var(--text-secondary)' }}>Genel Duygu:</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className={`sentiment-indicator ${
                  insights.avgSentiment > 0.1 ? 'sentiment-positive' :
                  insights.avgSentiment < -0.1 ? 'sentiment-negative' : 'sentiment-neutral'
                }`}></span>
                <span style={{ 
                  fontWeight: '600',
                  color: getSentimentColor(insights.avgSentiment)
                }}>
                  {getSentimentLabel(insights.avgSentiment)}
                </span>
              </div>
            </div>
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '1rem',
              background: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-md)'
            }}>
              <span style={{ color: 'var(--text-secondary)' }}>En Popüler Platform:</span>
              <span className={`platform-badge platform-${topPlatform?.[0]}`}>
                {topPlatform?.[0]}
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
              <span style={{ color: 'var(--text-secondary)' }}>En Popüler Hashtag:</span>
              <span style={{ fontWeight: '600', color: 'var(--accent-color)' }}>
                {topHashtag?.[0]}
              </span>
            </div>
          </div>
        </div>

        <div className="chart-card">
          <h3 className="chart-title">📊 Duygu Trendi</h3>
          <div style={{ padding: '1rem' }}>
            <div style={{ 
              height: '200px',
              display: 'flex',
              alignItems: 'end',
              gap: '2px',
              padding: '1rem 0'
            }}>
              {insights.sentimentTrend.map((sentiment, i) => (
                <div
                  key={i}
                  style={{
                    width: '8px',
                    height: `${Math.abs(sentiment) * 100 + 20}px`,
                    background: sentiment > 0 ? 'var(--success-color)' : 'var(--danger-color)',
                    borderRadius: '2px',
                    opacity: 0.7
                  }}
                  title={`Duygu: ${sentiment.toFixed(2)}`}
                />
              ))}
            </div>
            <div style={{ 
              textAlign: 'center', 
              color: 'var(--text-secondary)',
              fontSize: '0.875rem',
              marginTop: '1rem'
            }}>
              Duygu skorları zaman içinde değişimi
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
