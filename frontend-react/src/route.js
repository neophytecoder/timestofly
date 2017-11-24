import React, { Component } from 'react';
import { Route, Switch } from 'react-router';

import BlogComponent from './blog';
import BlogDetailComponent from './blog/blogDetail';
import ContactUsComponent from './contact';
import CareerComponent from './career';
import WorksComponent from './works';
import ServicesComponent from './services';
import MyAdmin from './admin';
import { BlogUploadImage } from './admin/blogs';

class RouteComponent extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/contact" component={ContactUsComponent} />
          <Route path="/blogs/:blogid" component={BlogDetailComponent} />
          <Route path="/blogs" component={BlogComponent} />
          <Route path="/career" component={CareerComponent} />
          <Route path="/services" component={ServicesComponent} />
          <Route path="/" component={WorksComponent} />
          <Route path="/works" component={WorksComponent} />
          <Route path="/admin" component={MyAdmin} />
        </Switch>
      </div>
    );
  }
}

export default RouteComponent;
