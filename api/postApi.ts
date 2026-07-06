import { APIRequestContext } from '@playwright/test';

/**
 * PostApi - Educational example for API testing with Playwright
 * 
 * This class demonstrates CRUD operations (Create, Read, Update, Delete)
 * using JSONPlaceholder - a free fake API for testing and learning
 * 
 * Base URL: https://jsonplaceholder.typicode.com
 * Resource: /posts (blog posts)
 */

export class PostApi {
  private baseURL = 'https://jsonplaceholder.typicode.com';

  constructor(private request: APIRequestContext) {}

  /**
   * POST - Create a new post
   * HTTP Method: POST
   * Status Code: 201 (Created)
   */
  async createPost(title: string, body: string, userId: number = 1) {
    return await this.request.post(`${this.baseURL}/posts`, {
      data: {
        title,
        body,
        userId,
      },
      timeout: 15000,
    });
  }

  /**
   * GET - Retrieve all posts
   * HTTP Method: GET
   * Status Code: 200 (OK)
   */
  async getAllPosts() {
    return await this.request.get(`${this.baseURL}/posts`, {
      timeout: 15000,
    });
  }

  /**
   * GET - Retrieve a specific post by ID
   * HTTP Method: GET
   * Status Code: 200 (OK)
   */
  async getPostById(postId: number) {
    return await this.request.get(`${this.baseURL}/posts/${postId}`, {
      timeout: 15000,
    });
  }

  /**
   * GET - Retrieve posts by user ID
   * HTTP Method: GET with query parameters
   * Status Code: 200 (OK)
   */
  async getPostsByUserId(userId: number) {
    return await this.request.get(
      `${this.baseURL}/posts?userId=${userId}`,
      {
        timeout: 15000,
      }
    );
  }

  /**
   * PUT - Replace entire post (full update)
   * HTTP Method: PUT
   * Status Code: 200 (OK)
   * 
   * PUT replaces ALL fields. Any fields not provided will be removed or set to null.
   */
  async updatePost(postId: number, title: string, body: string, userId: number) {
    return await this.request.put(`${this.baseURL}/posts/${postId}`, {
      data: {
        title,
        body,
        userId,
      },
      timeout: 15000,
    });
  }

  /**
   * PATCH - Partially update a post
   * HTTP Method: PATCH
   * Status Code: 200 (OK)
   * 
   * PATCH only updates provided fields. Other fields remain unchanged.
   */
  async partialUpdatePost(postId: number, updateData: any) {
    return await this.request.patch(`${this.baseURL}/posts/${postId}`, {
      data: updateData,
      timeout: 15000,
    });
  }

  /**
   * DELETE - Remove a post
   * HTTP Method: DELETE
   * Status Code: 200 (OK)
   */
  async deletePost(postId: number) {
    return await this.request.delete(`${this.baseURL}/posts/${postId}`, {
      timeout: 15000,
    });
  }
}
