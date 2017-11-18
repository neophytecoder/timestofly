import React, { Component } from 'react';
import Truncate from 'react-truncate';
import { Link } from 'react-router-dom';

import { timeStampToDate } from '../utils';
import brand from '../assets/images/OAYTM70.png';

class SmallBlogComponent extends Component {
  render() {
    return (
      <div className="row p-0 m-0 mb-5">
        <div className="col-6">
          <img className="img-fluid" src={brand} />
        </div>
        <div className="col-6 font-sz-1 p-0 m-0">
          <span style={{fontSize: "22pt"}} className="font-weight-bold">
            <Link to={`/blogs/${this.props.image}`}>
              {this.props.title}
            </Link>
          </span>
          <div className="w-100 mt-3"></div>
          <div>
            {timeStampToDate(this.props.posted)}
          </div>
          <div className="w-100 mt-3"></div>
          <div style={{fontSize: "14pt"}}>
            <Truncate lines={3}>
              {this.props.content}
            </Truncate>
          </div>

        </div>
      </div>
    );
  }
}

export default SmallBlogComponent;
