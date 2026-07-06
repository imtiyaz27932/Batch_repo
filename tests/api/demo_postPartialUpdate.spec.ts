import { test, expect } from '@playwright/test';
import { PostApi } from '../../api/postApi';

/**
 * PATCH TEST - Partially update a post (only provided fields)
 * 
 * Demonstrates:
 * - Updating only specific fields
 * - Expected status code: 200 (OK)
 * - Other fields remain unchanged
 * - Compare with PUT which replaces the entire resource
 * 
 * KEY DIFFERENCE:
 * PUT  = Replace entire resource (need all fields)
 * PATCH = Update only specified fields (other fields stay the same)
 */
test('PATCH - Partially update post (only title)', async ({ request }) => {
  const postApi = new PostApi(request);

  // Step 1: Get the original post first
  const originalResponse = await postApi.getPostById(1);
  const originalPost = await originalResponse.json();
  console.log('Original post:', originalPost);

  // Step 2: Update ONLY the title using PATCH
  const patchResponse = await postApi.partialUpdatePost(1, {
    title: 'Only Title Changed With PATCH', // Only updating title
    // Note: We're NOT providing body or userId - they stay the same
  });

  // Step 3: Verify the response
  expect(patchResponse.status()).toBe(200); // 200 = OK

  // Step 4: Parse the updated post
  const patchedPost = await patchResponse.json();

  // Step 5: Verify only title changed, other fields preserved
  expect(patchedPost.id).toBe(1);
  expect(patchedPost.title).toBe('Only Title Changed With PATCH'); // Changed
  expect(patchedPost.body).toBe(originalPost.body); // Should remain the same
  expect(patchedPost.userId).toBe(originalPost.userId); // Should remain the same

  console.log('✅ Post patched successfully (partial update):');
  console.log('   Title changed:', originalPost.title, '→', patchedPost.title);
  console.log('   Body unchanged:', patchedPost.body);
});

