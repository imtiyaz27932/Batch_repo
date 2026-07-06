# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api\deleteUser.spec.ts >> DELETE - Remove a user
- Location: tests\api\deleteUser.spec.ts:5:5

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 503
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { UserApi } from '../../api/userApi';
  3  | 
  4  | // DELETE test - Remove a user
  5  | test('DELETE - Remove a user', async ({ request }) => {
  6  |   const userApi = new UserApi(request);
  7  | 
  8  |   // Step 1: Create a user
  9  |   const createResponse = await userApi.addUser(
  10 |     'Eve',
  11 |     'Adams',
  12 |     `eve${Date.now()}@test.com`,
  13 |     'password123'
  14 |   );
  15 |   
  16 |   const createBody = await createResponse.json();
  17 |   const userId = createBody.user._id;
  18 |   const token = createBody.token;
  19 | 
  20 |   // Step 2: Delete that user
  21 |   const deleteResponse = await userApi.deleteUser(userId, token);
  22 | 
  23 |   // Step 3: Verify deletion was successful
> 24 |   expect(deleteResponse.status()).toBe(200); // 200 = OK
     |                                   ^ Error: expect(received).toBe(expected) // Object.is equality
  25 |   
  26 |   const deleteBody = await deleteResponse.json();
  27 |   expect(deleteBody.success).toBe(true); // Deletion was successful
  28 | });
  29 | 
```