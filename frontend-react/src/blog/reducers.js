import {SET_BLOGS} from "./actions";

export const blogReducers = (state = [], action) => {
  const filteredBlogs = state.filter(blog => {
    return action.blogs.filter(actionBlog => actionBlog.blogid === blog.blogid).length === 0;
  });
  switch (action.type) {
    case SET_BLOGS:
        return [...action.blogs, ...filteredBlogs];
    default:
      return state;
  }
};
