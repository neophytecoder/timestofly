import React, { Component } from 'react';
import { Route, Switch } from 'react-router';

import BlogComponent from './blog';
import BlogDetailComponent from './blog/blogDetail';
import ContactUsComponent from './contact'
import MyAdmin from './admin';

class RouteComponent extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/contact-us" component={ContactUsComponent} />
          <Route path="/blogs/:blogid" component={BlogDetailComponent} />
          <Route path="/blogs" component={BlogComponent} />
          <Route path="/admin" component={MyAdmin} />
        </Switch>
      </div>
    );
  }
}

export default RouteComponent;
