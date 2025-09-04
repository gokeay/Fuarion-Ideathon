import { useContext } from 'react';
import { Post } from '../types';
import { FilterContext } from '../state/FilterContext';
import { filterPosts } from '../lib/analytics';
import Filters from '../components/Filters';
import KPIs from '../components/KPIs';

export default function TagsView({ posts }: { posts: Post[] }) {
  const { filters } = useContext(FilterContext);
  const filtered = filterPosts(posts, filters);

  // Hashtag analizi
  const tagAnalysis = filtered.reduce((acc, post) => {
    post.hashtags.forEach(tag => {
      if (!acc[tag]) {
        acc[tag] = {
          count: 0,
          platforms: new Set(),
          avgSentiment: 0,
          totalSentiment: 0
        };
      }
      acc[tag].count++;
      acc[tag].platforms.add(post.platform);
      acc[tag].totalSentiment += post.sentiment;
      acc[tag].avgSentiment = acc[tag].totalSentiment / acc[tag].count;
    });
    return acc;
  }, {} as Record<string, {
    count: number;
    platforms: Set<string>;
    avgSentiment: number;
    totalSentiment: number;
  }>);

  const sortedTags = Object.entries(tagAnalysis)
    .sort(([,a], [,b]) => b.count - a.count);

  return (
    <div>
      <Filters />
      <KPIs posts={filtered} />
      
      <div className="data-container">
        <h3 className="chart-title">🏷️ Hashtag Detaylı Analizi</h3>
        <div className="charts-container">
          {sortedTags.map(([tag, data]) => (
            <div key={tag} className="chart-card">
              <h4 style={{ 
                fontSize: '1.1rem', 
                marginBottom: '1rem',
                color: 'var(--text-primary)'
              }}>
                {tag}
              </h4>
              
              <div style={{ display: 'grid', gap: '0.75rem' }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Post Sayısı:</span>
                  <span style={{ 
                    fontWeight: '600', 
                    color: 'var(--primary-color)',
                    fontSize: '1.2rem'
                  }}>
                    {data.count}
                  </span>
                </div>
                
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Platformlar:</span>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {Array.from(data.platforms).map(platform => (
                      <span key={platform} className={`platform-badge platform-${platform}`}>
                        {platform}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Duygu Skoru:</span>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span className={`sentiment-indicator ${
                      data.avgSentiment > 0.1 ? 'sentiment-positive' :
                      data.avgSentiment < -0.1 ? 'sentiment-negative' : 'sentiment-neutral'
                    }`}></span>
                    <span style={{ 
                      fontWeight: '600',
                      color: data.avgSentiment > 0.1 ? 'var(--success-color)' :
                             data.avgSentiment < -0.1 ? 'var(--danger-color)' : 'var(--warning-color)'
                    }}>
                      {data.avgSentiment.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
