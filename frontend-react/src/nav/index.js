import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

import '../assets/css/navbar.css';
import brand from '../assets/images/brand.png';

class NavComponent extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-dark nav-black navbar-boxshadow">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src={brand} width="110px" alt="our brand"/>
          </Link>
          <button className="navbar-toggler justify-content-md-end" type="button"
              data-toggle="collapse" data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent" aria-expanded="false"
              aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse d-lg-flex justify-content-lg-end" id="navbarSupportedContent">
            <ul className="navbar-nav">
              <li className="nav-item p-2 nav-custom">
                <Link className="nav-link"  to="/">HOME</Link>
              </li>
              <li className="nav-item p-2 nav-custom">
                <Link className="nav-link"  to="/services">OUR SERVICES </Link>
              </li>
              <li className="nav-item p-2 nav-custom">
                <Link className="nav-link"  to="/works">OUR WORKS </Link>
              </li>
              <li className="nav-item p-2 nav-custom">
                <Link className="nav-link"   to="/blogs">BLOG </Link>
              </li>
              <li className="nav-item p-2 nav-custom">
                <Link className="nav-link"  to="/career">CAREER</Link>
              </li>
              <li className="nav-item p-2 nav-custom">
                <Link className="nav-link"   to="/contact">CONTACT US</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(NavComponent);
