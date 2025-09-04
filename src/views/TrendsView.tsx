import { useContext } from 'react';
import { Post } from '../types';
import { FilterContext } from '../state/FilterContext';
import { filterPosts } from '../lib/analytics';
import Filters from '../components/Filters';
import KPIs from '../components/KPIs';

export default function TrendsView({ posts }: { posts: Post[] }) {
  const { filters } = useContext(FilterContext);
  const filtered = filterPosts(posts, filters);

  // Platform bazında post sayıları
  const platformCounts = filtered.reduce((acc, post) => {
    acc[post.platform] = (acc[post.platform] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Hashtag bazında post sayıları
  const hashtagCounts = filtered.reduce((acc, post) => {
    post.hashtags.forEach(tag => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  return (
    <div>
      <Filters />
      <KPIs posts={filtered} />
      
      <div className="charts-container">
        <div className="chart-card">
          <h3 className="chart-title">📊 Platform Dağılımı</h3>
          <div style={{ padding: '1rem' }}>
            {Object.entries(platformCounts).map(([platform, count]) => (
              <div key={platform} style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                padding: '0.5rem 0',
                borderBottom: '1px solid var(--border-color)'
              }}>
                <span className={`platform-badge platform-${platform}`}>
                  {platform}
                </span>
                <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>
                  {count} post
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-card">
          <h3 className="chart-title">🏷️ Hashtag Popülerliği</h3>
          <div style={{ padding: '1rem' }}>
            {Object.entries(hashtagCounts)
              .sort(([,a], [,b]) => b - a)
              .slice(0, 10)
              .map(([tag, count]) => (
                <div key={tag} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  padding: '0.5rem 0',
                  borderBottom: '1px solid var(--border-color)'
                }}>
                  <span style={{ color: 'var(--text-primary)' }}>{tag}</span>
                  <span style={{ fontWeight: '600', color: 'var(--primary-color)' }}>
                    {count}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
