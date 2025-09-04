export type Platform = 'twitter' | 'instagram' | 'facebook';

export interface Post {
  id: string;
  platform: Platform;
  user: string;
  content: string;
  hashtags: string[];
  sentiment: number; // -1..1
  timestamp: number; // epoch ms
  coords: [number, number]; // [lat, lon]
}

export interface Filters {
  platform?: Platform;
  hashtag?: string;
  minSentiment?: number;
  day?: string; // ISO date
}
