import { Post } from '../types';
import { projectToBounds, TR_BOUNDS, MARMARA_BOUNDS, isInBounds } from '../lib/geo';
import trMapImg from '../views/tr_maps.png';
import marmaraImg from '../views/maramara_bolgesi.jpg';

interface Props {
  posts: Post[];
  width?: number;
  height?: number;
  mode?: 'turkiye' | 'marmara';
  onEnterMarmara?: () => void;
}

export default function MapSVG({ posts, width = 800, height = 400, mode = 'turkiye', onEnterMarmara }: Props) {
  const bounds = mode === 'marmara' ? MARMARA_BOUNDS : TR_BOUNDS;

  const handleClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (mode === 'marmara' || !onEnterMarmara) return;
    const rect = (e.target as SVGElement).ownerSVGElement?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const [mx1, my1] = projectToBounds([MARMARA_BOUNDS.maxLat, MARMARA_BOUNDS.minLon], TR_BOUNDS, width, height);
    const [mx2, my2] = projectToBounds([MARMARA_BOUNDS.minLat, MARMARA_BOUNDS.maxLon], TR_BOUNDS, width, height);
    const minX = Math.min(mx1, mx2);
    const maxX = Math.max(mx1, mx2);
    const minY = Math.min(my1, my2);
    const maxY = Math.max(my1, my2);
    if (x >= minX && x <= maxX && y >= minY && y <= maxY) {
      onEnterMarmara();
    }
  };

  const getSentimentColor = (sentiment: number) => {
    if (sentiment > 0.3) return 'var(--success-color)';
    if (sentiment > 0.1) return '#22c55e';
    if (sentiment > -0.1) return 'var(--warning-color)';
    if (sentiment > -0.3) return '#f97316';
    return 'var(--danger-color)';
  };

  const getSentimentSize = (sentiment: number) => {
    return Math.abs(sentiment) * 3 + 2;
  };

  const bgImage = mode === 'marmara' ? `url(${marmaraImg})` : `url(${trMapImg})`;

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center',
      alignItems: 'center',
      padding: '1rem'
    }}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        onClick={handleClick}
        style={{ 
          backgroundImage: bgImage,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          border: '2px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        {posts
          .filter(p => mode === 'turkiye' ? true : isInBounds(p.coords, MARMARA_BOUNDS))
          .map((p) => {
            const [x, y] = projectToBounds(p.coords, bounds, width, height);
            return (
              <g key={p.id}>
                <circle
                  cx={x}
                  cy={y}
                  r={getSentimentSize(p.sentiment)}
                  fill={getSentimentColor(p.sentiment)}
                  opacity="0.8"
                  stroke="white"
                  strokeWidth="1"
                />
                <title>
                  {p.platform} - {p.user}
                  {'\n'}Duygu: {p.sentiment.toFixed(2)}
                  {'\n'}Hashtag: {p.hashtags.join(', ')}
                </title>
              </g>
            );
          })}
      </svg>
    </div>
  );
}
