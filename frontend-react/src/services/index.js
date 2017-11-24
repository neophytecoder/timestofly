import React, {Component} from 'react';

import NavComponent from '../nav';
import Footer from '../footer';
import '../assets/css/content.css';
import Trust from '../ui/trust';

class ServicesComponent extends Component {
  render() {
    return (
      <div>
        <NavComponent />
        <main role="main" className="container-fluid">
          <div className="content">
            <div className="navbar-boxshadow bg-black text-white pb-3">
              <div className='mx-5 pt-4'>
                Home / <span className="font-weight-bold text-white">Our Services</span>
              </div>

              <div className="row justify-content-center font-sz-4">
                <div className="col-6 text-center cursive line-height-12">
                    <span className="text-white p-0 m-0">Oh Yes!</span>
                    <div className="w-100 p-0 m-0"></div>
                    <span className="font-sz-2 font-lato p-0 m-0">We Are Very Great To Do These</span>
                </div>
              </div>

              <div className="row justify-content-center mt-3" style={{fontSize: '0.8rem'}}>
                  <div className="col-3 ">
                    <div className="row">
                      <div className="col-3 col-lg-2">
                        <img src={require("../assets/images/checklist.png")} />
                      </div>
                      <div className="col-9 our_service vertical-line-white pl-2 ml-2">
                        <span className="title">Visual Identity & Content Branding</span>
                        <div className="w-100"></div>
                        With our professional team we create a different kind of branding. We deliver your brand messages, images & value to customer through strong concept & visual of logo, stationaries, brand tagline, catalogue product & company  profile.
                      </div>
                    </div>
                  </div>

                  <div className="col-3 ">
                    <div className="row">
                      <div className="col-3 col-lg-2">
                        <img src={require("../assets/images/checklist.png")} />
                      </div>
                      <div className="col-9 our_service vertical-line-white pl-2 ml-2">
                        <span className="title">Promotional Ad Design</span>
                        <div className="w-100"></div>
                        We believe marketing without a great design is blind. We are here to high - up your business through great print ad design such as map, flyer, brochure, poster, banner or print ad design for every single your business promotional items.
                      </div>
                    </div>
                  </div>

                <div className="w-100 mb-4"> </div>

                <div className="col-3 ">
                  <div className="row">
                    <div className="col-3 col-lg-2">
                      <img src={require("../assets/images/checklist.png")} />
                    </div>
                    <div className="col-9 our_service vertical-line-white pl-2 ml-2">
                      <span className="title">Packaging Design</span>
                      <div className="w-100"></div>
                      Packaging product is a silent marketing. They are increase customer decision to buy your product or just leave it. With us your packaging product not just good or excellent but it works! Because packaging is the most important to increase sales.
                    </div>
                  </div>
                </div>

                <div className="col-3 ">
                  <div className="row">
                    <div className="col-3 col-lg-2">
                      <img src={require("../assets/images/checklist.png")} />
                    </div>
                    <div className="col-9 our_service  vertical-line-white pl-2 ml-2">
                      <span className="title">Book Layout & Editorial Design</span>
                      <div className="w-100"></div>
                      Some of business need a tutorial book or just an internal newsletter or maybe magazine. We are very expert to create some strong concept of cover and layout.  We help your business with an amazing book layout & editorial design.
                    </div>
                  </div>
                </div>

                <div className="w-100 mb-4"> </div>

              </div>
            </div>

            <Trust />

            <div className="row justify-content-center our_service_contact-us p-4">
              <div className="col-7 text-center font-sz-3 line-height-12">
                Increase <span className="cursive font-sz-4">Your Brand Value</span>
                <div className="w-100 pb-0 pt-0 mt-0 mb-0"></div>
                And Be <span className="cursive pl-3 font-sz-4">Awesome !</span>
                <div className="w-100 pb-0 pt-0 mt-0 mb-0"></div>
                <button type="button" className="btn empty btn-empty">Let Us Help You > </button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }
}

export default ServicesComponent;
