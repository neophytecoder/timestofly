import React, { Component } from 'react';

import '../assets/css/footer.css';
import facebook from '../assets/images/footer/facebook3.png';
import linkedin from '../assets/images/footer/linkedin.png';
import twitter from '../assets/images/footer/twitter.png';
import youtube from '../assets/images/footer/youtube30.png';
import googleplus from '../assets/images/footer/googleplus.png';

const Footer = (props) => (
  <footer className="footer">
    <div className="container">
      <div className="row justify-content-center">
        <img className="Socmed" src={facebook} />
        <img className="Socmed" src={twitter} />
        <img className="Socmed" src={linkedin} />
        <img className="Socmed" src={googleplus} />
        <img className="Socmed" src={youtube} />
      </div>
      <div className="row justify-content-center font-weight-bold">
        TIMESTOFLY
      </div>
      <div className="row justify-content-center">
        Hamptons Park Apartment
      </div>
      <div className="row justify-content-center">
        JL. Terogong Raya no. 18
      </div>
      <div className="row justify-content-center">
        Cilandak, Jakarta Selatan
      </div>
      <div className="row justify-content-center">
        0812 9592 2211
      </div>
      <div className="row justify-content-center pt-4 pb-4">
          Copyright © timestofly.com
      </div>
    </div>
  </footer>
);

export default Footer;
