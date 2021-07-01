const baseURL = `https://jsonplaceholder.typicode.com`;
export const PlaceholderAPI = {
  /**
   * retrieve 10 posts at a time
   */
  posts: (start = 0, limit = 10) =>
    `${baseURL}/posts?_limit=${limit}&_start=${start}`,
  /**
   * retrieve post for the specified Id
   */
  post: (id: number | string) => `${baseURL}/posts/${id}`,
  /**
   * Rertrieve comments for the specified post id
   */
  comments: (postId: number | string) => `${baseURL}/posts/${postId}/comments`,
  /**
   * retrieve 10 users at a time
   */
  users: (start = 0, limit = 10) =>
    `${baseURL}/users?_limit=${limit}&_start=${start}`,
  /**
   * retrieve a user for the given id
   */
  user: (id: number | string) => `${baseURL}/users/${id}`,
};
