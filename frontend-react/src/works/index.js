import React, {Component} from 'react';

import NavComponent from '../nav';
import Footer from '../footer';
import '../assets/css/content.css';
import Trust from '../ui/trust';

import { addWorksAsync } from './actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { host } from '../constants';

class WorksComponent extends Component {
  componentDidMount() {
    this.props.addWorks();
  }

  render() {
    const background = {backgroundSize : 'cover', width: '100%'};
    const textStyle = {
          position: 'absolute',
          top: '10%',
          left: '10%',
    };
    const layer = {
          position: 'absolute',
          top: '0%',
          left: '0%',
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(52, 52, 52, 0.2)'
    };


    return (
      <div>
        <NavComponent />
        <main role="main" className="container-fluid">
          <div className="content">
            <div className="awesome-works">
              <div className="row">
                <div className="col-12 pt-5 text-center font-sz-3">
                    Some of Our
                    <span className="cursive px-2">
                      Awesome
                    </span> Works
                </div>
              </div>

              <div className="row justify-content-center">
                <ul className="nav nav-tabs nav-tabs-customs">
                  <li className="nav-item">
                    <a className="nav-link active" href="#">All Projects</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">Visual Identity & Content Branding</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">Promotional Ad</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">Packaging Design</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">Editorial & Magazine Design</a>
                  </li>
                </ul>
              </div>

              <div className="row m-0 p-0 mt-5 pb-5">
                {
                  this.props.works
                    .filter(work => work.smallimage !== undefined && work.smallimage !== null)
                    .map(work => (
                      <div className="col-6 p-0 m-0" style={{width: '100%'}}>
                        <img src={`${host}${work.smallimage}`} style={background} className="img-fluid" ></img>
                        <div style={layer}></div>
                        <div className='text-white' style={textStyle}>
                          <div style={{
                            borderLeft: '2pt solid white',
                            paddingLeft: '1rem'
                            }}>
                              <div className='font-sz-5 font-weight-bold'>{work.name}</div>
                              <div>{work.extrainfo}</div>
                          </div>
                          <Link to="/" className='white-link'>+ Click to view </Link>
                        </div>
                      </div>
                    ))
                }
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
    );
  }
}

const mapStateToProps = (state, props) => ({
  ...props,
  works: state.works
});

const mapDispatchToProps = (dispatch) => ({
  addWorks: () => dispatch(addWorksAsync())
})

export default connect(mapStateToProps, mapDispatchToProps)(WorksComponent);
