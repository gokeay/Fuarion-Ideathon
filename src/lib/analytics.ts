import { Post } from '../types';

export function sentimentAverage(posts: Post[]): number {
  if (posts.length === 0) return 0;
  return posts.reduce((sum, p) => sum + p.sentiment, 0) / posts.length;
}

export function countByHashtag(posts: Post[]): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const p of posts) {
    for (const tag of p.hashtags) {
      counts[tag] = (counts[tag] || 0) + 1;
    }
  }
  return counts;
}

export function insightScore(post: Post): number {
  return Math.abs(post.sentiment) * 100;
}

export function filterPosts(posts: Post[], filters: {
  platform?: string;
  hashtag?: string;
  minSentiment?: number;
  day?: string;
}): Post[] {
  return posts.filter(p => {
    if (filters.platform && p.platform !== filters.platform) return false;
    if (filters.hashtag && !p.hashtags.includes(filters.hashtag)) return false;
    if (filters.minSentiment !== undefined && p.sentiment < filters.minSentiment) return false;
    if (filters.day) {
      const day = new Date(p.timestamp).toISOString().slice(0, 10);
      if (day !== filters.day) return false;
    }
    return true;
  });
}
