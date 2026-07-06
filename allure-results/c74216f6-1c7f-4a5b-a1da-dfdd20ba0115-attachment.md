# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api\getUsers.spec.ts >> GET Users API
- Location: tests\api\getUsers.spec.ts:5:5

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 401
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { UserApi} from '../../api/userApi'
  3  | import { logger } from '../../utils/logger';
  4  | 
  5  | test('GET Users API', async ({ request }) => {
  6  | 
  7  |   const userApi = new UserApi(request);
  8  | 
  9  |   logger.info('Fetching users');
  10 | 
  11 |   const response = await userApi.getUsers();
  12 | 
> 13 |   expect(response.status()).toBe(200);
     |                             ^ Error: expect(received).toBe(expected) // Object.is equality
  14 | 
  15 |   const responseBody = await response.json();
  16 | 
  17 |   logger.info(
  18 |     `Total Users Found: ${responseBody.data.length}`
  19 |   );
  20 | 
  21 |   expect(responseBody.data.length).toBeGreaterThan(0);
  22 | 
  23 |   logger.success('GET API verified successfully');
  24 | });
```