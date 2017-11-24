import { host, headers } from '../constants';

export const SET_BLOGS = "SET_BLOGS";

export const setBlogs = (blogs = []) => ({
  type: SET_BLOGS,
  blogs
});

export const addBlogsAsync = () => (dispatch) => {
  fetch(host + '/api/blogs', {headers})
    .then(data => data.json())
    .then(blogs => {
      dispatch(setBlogs(blogs));
    });
}
