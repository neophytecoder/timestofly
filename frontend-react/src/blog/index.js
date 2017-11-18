import React, { Component } from 'react';
import { connect } from 'react-redux';

import NavComponent from '../nav';
import Footer from '../footer';
import '../assets/css/content.css';
import { addBlogsAsync } from './actions';
import SmallBlogComponent from './smallBlog';
import BigBlogComponent from './bigblog';
import { SideBar } from './sidebar';
import Awesome from '../ui/awesome';

class BlogComponent extends Component {
  componentDidMount() {
    this.props.addBlogs();
  }

  render() {
    return (
      <div className="container-fluid p-0 m-0">
        <NavComponent />
        <div className="mt-4 content">
          <div className="mx-5">
            Home / <span className="font-weight-bold">Blog</span>
            <div className="col-12 text-center mt-5 font-sz-4">
              We <span className="cursive font-sz-9 px-2">Share</span>
              Our <span className="cursive px-5 font-sz-9">Knowledge</span>
            </div>
            <div className="row mt-5">
              <div className="col-8 ">
                {
                  this.props.blogs.map((blog, index) => {
                    if (index === 0) {
                      return <BigBlogComponent key={index} {...blog} />
                    } else {
                      return <SmallBlogComponent key={index} {...blog} />
                    }
                  })
                }

              </div>
              <div className="col-4">
                <SideBar blogs={this.props.blogs} />
              </div>
            </div>
          </div>
          <Awesome />
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  blogs: state.blogs
});
const mapDispatchToProps = (dispatch) => ({
  addBlogs: () => dispatch(addBlogsAsync())
});

export default connect(mapStateToProps, mapDispatchToProps)(BlogComponent);
