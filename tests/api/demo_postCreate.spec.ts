import { test, expect } from '@playwright/test';
import { PostApi } from '../../api/postApi';

/**
 * POST CREATE TEST
 *
 * Demonstrates how to create a new post using the API.
 * This test verifies that the server returns the expected
 * status code and that the created resource contains the
 * correct values.
 */
test('POST - Create a new post', async ({ request }) => {
  const postApi = new PostApi(request);

  // Step 1: Send POST request to create a new post
  const response = await postApi.createPost(
    'Create Post Example',
    'This post is created as part of the API test demo.',
    1
  );

  // Step 2: Verify the response status code
  expect(response.status()).toBe(201);

  // Step 3: Parse the response body
  const createdPost = await response.json();

  // Step 4: Verify the returned post fields
  expect(createdPost).toHaveProperty('id');
  expect(createdPost.title).toBe('Create Post Example');
  expect(createdPost.body).toBe('This post is created as part of the API test demo.');
  expect(createdPost.userId).toBe(1);

  // Step 5: Log the created ID for debugging
  console.log('Created post ID:', createdPost.id);
});
