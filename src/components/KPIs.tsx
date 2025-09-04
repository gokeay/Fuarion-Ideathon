import { Post } from '../types';

export default function KPIs({ posts }: { posts: Post[] }) {
  const totalPosts = posts.length;
  const platforms = [...new Set(posts.map(p => p.platform))];
  const hashtags = [...new Set(posts.flatMap(p => p.hashtags))];
  const avgSentiment = posts.reduce((sum, p) => sum + p.sentiment, 0) / posts.length;

  return (
    <div className="kpis-container">
      <div className="kpi-card">
        <div className="kpi-value">{totalPosts}</div>
        <div className="kpi-label">Toplam Post</div>
      </div>
      
      <div className="kpi-card">
        <div className="kpi-value">{platforms.length}</div>
        <div className="kpi-label">Platform Sayısı</div>
      </div>
      
      <div className="kpi-card">
        <div className="kpi-value">{hashtags.length}</div>
        <div className="kpi-label">Benzersiz Hashtag</div>
      </div>
      
      <div className="kpi-card">
        <div className="kpi-value">{avgSentiment.toFixed(2)}</div>
        <div className="kpi-label">Ortalama Duygu Skoru</div>
      </div>
    </div>
  );
}
