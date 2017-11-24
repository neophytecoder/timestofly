import React, { Component } from 'react';
import Truncate from 'react-truncate';

import { timeStampToDate } from '../utils';
import brand from '../assets/images/OAYTM70.png';
import { host } from '../constants';
import { Link } from 'react-router-dom';

class BigBlogComponent extends Component {
  render() {
    const background = {backgroundSize : 'cover', width: '100%'};
    const textStyle = {
          position: 'absolute',
          top: '85%',
          left: '5%',
          color: 'white'
    };
    const layer = {
          position: 'absolute',
          top: '0%',
          left: '0%',
          backgroundColor: 'rgba(52, 52, 52, 0.2)',
          width: '100%',
          height: '100%'
    };

    return (
      <div className="row mr-5 m-0 mb-5 p-0">
        <div className='col-12 p-0'>
          {this.props.mediaurl && <img className="img-fluid p-0 m-0" style={background}
              src={`${host}${this.props.mediaurl}`} />}
          {!this.props.mediaurl && <img className="img-fluid p-0 m-0" src={brand} style={background} />}
          <div style={layer}></div>
          <div style={textStyle}>
            <div className="font-weight-bold font-sz-2">
              <Link to={`/blogs/${this.props.blogid}`} className='white-link'>
                {this.props.title}
              </Link>
            </div>
            {timeStampToDate(this.props.posted)}
          </div>
          <div style={{position: 'absolute', bottom: '40px', left: '36px'}} />
        </div>
      </div>
    );
  }
}

export default BigBlogComponent;
