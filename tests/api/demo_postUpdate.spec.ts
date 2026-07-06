import { test, expect } from '@playwright/test';
import { PostApi } from '../../api/postApi';

/**
 * PUT TEST - Replace an entire post (full update)
 * 
 * Demonstrates:
 * - Replacing the entire resource
 * - Expected status code: 200 (OK)
 * - All fields must be provided (PUT replaces everything)
 * - Compare with PATCH which only updates provided fields
 */
test('PUT - Update entire post (full replacement)', async ({ request }) => {
  const postApi = new PostApi(request);

  // Step 1: Get the original post
  const originalResponse = await postApi.getPostById(1);
  const originalPost = await originalResponse.json();
  console.log('Original post:', originalPost);

  // Step 2: Replace the entire post with PUT
  const updateResponse = await postApi.updatePost(
    1, // postId
    'Updated Title Using PUT',
    'This entire post has been replaced with PUT method',
    1 // userId
  );

  // Step 3: Verify the response
  expect(updateResponse.status()).toBe(200); // 200 = OK

  // Step 4: Parse the updated post
  const updatedPost = await updateResponse.json();

  // Step 5: Verify all fields were updated
  expect(updatedPost.id).toBe(1);
  expect(updatedPost.title).toBe('Updated Title Using PUT');
  expect(updatedPost.body).toBe('This entire post has been replaced with PUT method');
  expect(updatedPost.userId).toBe(1);

  // Step 6: Note the difference from original
  console.log('✅ Post updated with PUT (full replacement):');
  console.log('   Original title:', originalPost.title);
  console.log('   New title:', updatedPost.title);
});
