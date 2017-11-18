import React, {Component} from 'react';
import { Link } from 'react-router-dom';

export const SideBar = (props) => (
  <div className="p-0 m-0">
    <div className="full-underline font-sz-2 font-weight-bold">Popular</div>
    { props.blogs.map(blog => (
        <div style={{fontSize: "18pt"}} className="pt-2 pb-2 font-weight-bold">
          <Link to={`/blogs/${blog.image}`}>{blog.title}</Link></div>
    ))}
  </div>
);
