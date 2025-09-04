import { describe, it, expect } from 'vitest';
import { generateFakePosts } from './fakeData';

describe('fakeData', () => {
  it('generates requested number of posts', () => {
    const posts = generateFakePosts(5);
    expect(posts).toHaveLength(5);
  });
});
