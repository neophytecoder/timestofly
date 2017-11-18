import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addBlogsAsync } from './actions';
import NavComponent from '../nav';
import Footer from '../footer';
import {SideBar} from './sidebar';
import Awesome from '../ui/awesome';
import { timeStampToDate } from '../utils';
import { host } from '../constants';

import '../assets/css/content.css';
import '../assets/css/footer.css';
import image from '../assets/images/OAYTM70.png';
import facebook from '../assets/images/facebook.png';
import twitter from '../assets/images/twitter.png';
import googleplus from '../assets/images/googleplus.png';

class BlogDetailComponent extends Component {
  componentDidMount() {
    this.props.addBlogs();
  }

  render() {
    console.log(this.props.match);
    if (this.props.blogs.length !== 0) {
      const blog = this.props.blogs[0];
      return (
        <div className='container-fluid p-0 m-0'>
          <NavComponent />
          <div className="mt-4 content">
            <div className="mx-5 mb-4">
              Home / Blog / <span className="font-weight-bold">{blog.title}</span>
              <div className="col-12 text-center mt-5 font-sz-4">
                We <span className="cursive font-sz-9 px-2">Share</span>
                Our <span className="cursive px-5 font-sz-9">Knowledge</span>
              </div>
              <div className="row mt-5">
                <div className="col-7 px-5">
                  <div className="font-sz-3 font-weight-bold">
                    {blog.title}
                  </div>
                  <div className="w-100"></div>
                  <div style={{fontSize: '14pt'}}>
                    <div className='row mb-1'>
                      <div className='col-6'>
                        {timeStampToDate(blog.posted)}
                      </div>
                      <div className='col-6 text-right'>
                        <img src={facebook} alt="facebook" className="px-2" />
                        <img src={twitter} alt="twitter" className="px-2"/>
                        <img src={googleplus} alt="google plus" className="px-2" />
                      </div>
                    </div>
                  </div>
                  {blog.mediaurl && <img className="img-fluid" src={`${host}${blog.mediaurl}`} />}
                  {!blog.mediaurl && <img className="img-fluid" src={image} />}
                  <div className="w-100"></div>
                  <div className='font-sz-12 pt-4' dangerouslySetInnerHTML={{__html: blog.content}}>

                  </div>
                </div>
                <div className="col-4">
                  <SideBar blogs={this.props.allBlogs} />
                </div>
              </div>
            </div>
            <Awesome />
          </div>
          <Footer />
        </div>
      );
    }
    this.props.history.goBack();
    return <div>An error occured</div>;
  }

}

const mapStateToProps = (state, props) => {
  console.log(state.blogs, props.match.params.blogid);
  const blogs = state.blogs.filter(blog => blog.blogid === props.match.params.blogid);
  return {blogs, ...props, allBlogs: state.blogs};
}

const mapDispatchToProps = (dispatch) => ({
  addBlogs: () => dispatch(addBlogsAsync())
});

export default connect(mapStateToProps, mapDispatchToProps)(BlogDetailComponent);
