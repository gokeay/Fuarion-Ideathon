import { Post, Platform } from '../types';

const PLATFORMS: Platform[] = ['twitter', 'instagram', 'facebook'];
const HASHTAGS = ['#Deprem', '#Afet', '#Egitim', '#Saglik', '#Ekonomi'];

function randomCoords(): [number, number] {
  const lat = 36 + Math.random() * 7; // 36-43 latitude
  const lon = 26 + Math.random() * 19; // 26-45 longitude
  return [lat, lon];
}

export function generateFakePosts(count = 200): Post[] {
  const posts: Post[] = [];
  for (let i = 0; i < count; i++) {
    const platform = PLATFORMS[Math.floor(Math.random() * PLATFORMS.length)];
    const hashtag = HASHTAGS[Math.floor(Math.random() * HASHTAGS.length)];
    const sentiment = Math.random() * 2 - 1;
    posts.push({
      id: `${i}`,
      platform,
      user: `user${i}`,
      content: `Post ${i} about ${hashtag}`,
      hashtags: [hashtag],
      sentiment,
      timestamp: Date.now() - Math.floor(Math.random() * 86400000),
      coords: randomCoords()
    });
  }
  return posts;
}
