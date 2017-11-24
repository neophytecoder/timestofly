import React, {Component} from 'react';

import NavComponent from '../nav';
import Footer from '../footer';
import '../assets/css/content.css';

export default class CareerComponent extends Component {
  render() {
    return (
      <div>
        <NavComponent />
        <main role="main" className="container-fluid">
          <div className='mx-5 pt-4'>
            Home / <span className="font-weight-bold">Career</span>
          </div>
          <div className="content justify-content-center">
            <div className="row justify-content-center font-sz-6">
                We Are Always Looking
            </div>
            <div className="row justify-content-center font-sz-6" style={{lineHeight: '1.2rem'}}>
              <span className="pt-3">to Hire</span>
              <span className="cursive font-sz-9 pl-4 pr-2 pt-5">Awesome</span>
              <span className="pt-3">People</span>
            </div>
            <div className="row justify-content-center font-sz-2" style={{marginTop: '5rem'}}>
              We may not be hiring for your position right this moment, but if you are interested
            </div>
            <div className="row justify-content-center  font-sz-2">
              in joining our team or are under-appreciated at your current employer, please fill in
            </div>
            <div className="row justify-content-center  font-sz-2">
              form below and attach your resume.
            </div>
            <div className="row justify-content-center Apply_Now">
              <button type="button" className="btn empty">Apply Now > </button>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    )
  }
}
