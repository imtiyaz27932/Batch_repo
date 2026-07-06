import { test, expect } from '@playwright/test';
import { PostApi } from '../../api/postApi';

/**
 * DELETE TEST - Remove a post
 * 
 * Demonstrates:
 * - Deleting a resource from the server
 * - Expected status code: 200 or 204 (depends on API)
 * - After deletion, the resource is gone
 * - Attempting to get deleted post returns 404 (Not Found)
 */
test('DELETE - Remove a post', async ({ request }) => {
  const postApi = new PostApi(request);

  // Step 1: Verify the post exists before deletion
  const beforeDeleteResponse = await postApi.getPostById(99);
  console.log('Post status before delete:', beforeDeleteResponse.status());

  // Step 2: Delete the post
  const deleteResponse = await postApi.deletePost(99);

  // Step 3: Verify the delete was successful
  // JSONPlaceholder returns 200, real APIs might return 204 (No Content)
  expect(deleteResponse.status()).toBeGreaterThanOrEqual(200);
  expect(deleteResponse.status()).toBeLessThan(300); // 2xx success codes

  console.log('✅ Post deleted successfully');
  console.log('   Status code:', deleteResponse.status());

  // Step 4: In a real API, trying to get the deleted post would return 404
  // JSONPlaceholder is a fake API, so it won't actually delete
  // But in production, you'd do:
  // const afterDeleteResponse = await postApi.getPostById(99);
  // expect(afterDeleteResponse.status()).toBe(404); // Not Found
});

test('DELETE - Multiple posts cleanup', async ({ request }) => {
  const postApi = new PostApi(request);

  // Simulate cleanup: Delete multiple posts
  const postIdsToDelete = [10, 11, 12];

  for (const postId of postIdsToDelete) {
    const deleteResponse = await postApi.deletePost(postId);
    expect(deleteResponse.status()).toBeGreaterThanOrEqual(200);
    expect(deleteResponse.status()).toBeLessThan(300);
    console.log(`✅ Post ${postId} deleted`);
  }

  console.log(`✅ Deleted ${postIdsToDelete.length} posts successfully`);
});
