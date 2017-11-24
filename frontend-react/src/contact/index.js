import React, { Component } from 'react';

import NavComponent from '../nav';
import Footer from '../footer';
import '../assets/css/content.css';

export default class ContactUsComponent extends Component {
  render() {
    return (
      <div className="container-fluid p-0 m-0">
        <NavComponent />
        <main role="main" class="container-fluid contact-us-bg ">
          <div className='px-5 pt-4 text-white transparent-bg'>
            Home / <span className="font-weight-bold">Contact us</span>
          </div>
          <div class="content transparent-bg">
            <div class="row justify-content-center font-sz-5 mt-5">
                <div class="col-9 text-center cursive text-white">
                  One Step Closer
                  <div class="w-100"></div>
                  <span class="font-sz-3 font-lato-light pr-4">To Be</span> Awesome
                </div>
            </div>

            <div class="row justify-content-center">
              <div class="col-4">
                <form class="mb-4">
                  <div class="form-group">
                    <label for="exampleInputName">Name</label>
                    <input type="text" class="form-control" id="exampleInputName"
                      aria-describedby="nameHelp"/>
                  </div>
                  <div class="form-group">
                    <label for="exampleInputPhone1">Phone</label>
                    <input type="text" class="form-control" id="exampleInputPhone" />
                  </div>
                  <div class="form-group">
                    <label for="exampleInputEmail1">Email</label>
                    <input type="text" class="form-control" id="exampleInputEmail" />
                  </div>
                  <div class="form-group">
                    <textarea class="form-control" id="exampleFormControlTextarea1"
                      rows="3"></textarea>
                  </div>
                  <div class="form-group">
                    <label for="exampleInputMessage1">Message</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1"
                      rows="3"></textarea>
                  </div>
                  <button type="submit" class="btn empty full white">Send</button>
                </form>
              </div>
            </div>

          </div>
        </main>
        <Footer />
      </div>
    );
  }
}
