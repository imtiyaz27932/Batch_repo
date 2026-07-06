import { test, expect } from '@playwright/test';
import { PostApi } from '../../api/postApi';

/**
 * GET ALL POSTS TEST
 *
 * Demonstrates how to retrieve all posts from the API.
 * This is useful for validating list endpoints and verifying
 * that the API returns an array of resources.
 */
test('GET - Retrieve all posts', async ({ request }) => {
  const postApi = new PostApi(request);

  // Step 1: Send GET request to retrieve all posts
  const response = await postApi.getAllPosts();

  // Step 2: Verify the response status
  expect(response.status()).toBe(200);

  // Step 3: Parse the response body
  const posts = await response.json();

  // Step 4: Verify we received an array of posts
  expect(Array.isArray(posts)).toBe(true);
  expect(posts.length).toBeGreaterThan(0);

  // Step 5: Verify expected fields exist on the first post
  expect(posts[0]).toHaveProperty('id');
  expect(posts[0]).toHaveProperty('title');
  expect(posts[0]).toHaveProperty('body');
  expect(posts[0]).toHaveProperty('userId');
});
