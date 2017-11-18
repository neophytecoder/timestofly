import React, { Component } from 'react';
import Truncate from 'react-truncate';

import { timeStampToDate } from '../utils';
import brand from '../assets/images/OAYTM70.png';

class BigBlogComponent extends Component {
  render() {
    return (
      <div className="container mr-5 m-0 pb-0 mb-5">
        <img className="img-fluid" src={brand} alt={this.props.title} style={{width: "100%"}}/>
        <div style={{position: 'absolute', bottom: '40px', left: '40px', color: 'white'}}>
          <span className="font-weight-bold" style={{fontSize: '30pt'}}>
            {this.props.title}
          </span>
          <div className="w-100"></div>
          {timeStampToDate(this.props.posted)}
        </div>
        <div style={{position: 'absolute', bottom: '40px', left: '36px'}} />
      </div>
    );
  }
}

export default BigBlogComponent;