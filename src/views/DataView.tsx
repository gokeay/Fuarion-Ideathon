import { useContext } from 'react';
import { Post } from '../types';
import { FilterContext } from '../state/FilterContext';
import { filterPosts } from '../lib/analytics';
import Filters from '../components/Filters';
import KPIs from '../components/KPIs';

export default function DataView({ posts }: { posts: Post[] }) {
  const { filters } = useContext(FilterContext);
  const filtered = filterPosts(posts, filters);

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString('tr-TR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

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
      
      <div className="data-container">
        <h3 className="chart-title">📋 Ham Veri Tablosu</h3>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Platform</th>
                <th>Kullanıcı</th>
                <th>İçerik</th>
                <th>Hashtag'ler</th>
                <th>Duygu Skoru</th>
                <th>Tarih</th>
              </tr>
            </thead>
            <tbody>
              {filtered.slice(0, 50).map((post) => (
                <tr key={post.id}>
                  <td>
                    <span className={`platform-badge platform-${post.platform}`}>
                      {post.platform}
                    </span>
                  </td>
                  <td style={{ fontWeight: '500' }}>{post.user}</td>
                  <td style={{ maxWidth: '300px', wordBreak: 'break-word' }}>
                    {post.content}
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
                      {post.hashtags.map((tag, index) => (
                        <span
                          key={index}
                          style={{
                            background: 'var(--bg-tertiary)',
                            padding: '0.25rem 0.5rem',
                            borderRadius: 'var(--radius-sm)',
                            fontSize: '0.75rem',
                            color: 'var(--text-secondary)'
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span className={`sentiment-indicator ${
                        post.sentiment > 0.1 ? 'sentiment-positive' :
                        post.sentiment < -0.1 ? 'sentiment-negative' : 'sentiment-neutral'
                      }`}></span>
                      <span style={{ 
                        fontWeight: '600',
                        color: getSentimentColor(post.sentiment)
                      }}>
                        {getSentimentLabel(post.sentiment)}
                      </span>
                    </div>
                  </td>
                  <td style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                    {formatDate(post.timestamp)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filtered.length > 50 && (
          <div style={{ 
            textAlign: 'center', 
            padding: '1rem',
            color: 'var(--text-secondary)',
            fontSize: '0.875rem'
          }}>
            Toplam {filtered.length} post bulundu. İlk 50 post gösteriliyor.
          </div>
        )}
      </div>
    </div>
  );
}
