import React, { Component } from 'react';

const Trust = (props) => (
  <div className="row justify-content-center mt-4 bg-white line-height-12" >
    <div className="col-12 text-center font-sz-2">
      They <span className="cursive mx-1">Trust</span> Us
    </div>
    <div className="w-100 p-4"></div>
    <div className="col-md-1 col-2"><img className="img-fluid" src={require("../assets/images/hec.png")}  /> </div>
    <div className="col-md-1 col-2"><img className="img-fluid" src={require("../assets/images/ibu.png")}  /> </div>
    <div className="col-md-1 col-2"><img className="img-fluid" src={require("../assets/images/paragon.png")}  /> </div>
    <div className="col-md-1 col-2 pt-3"><img className="img-fluid" src={require("../assets/images/lusaga.png")}  /> </div>
    <div className="col-md-1 col-2 pt-2"><img className="img-fluid" src={require("../assets/images/Layer6.png")}  /> </div>
    <div className="col-md-1 col-2 pt-2"><img className="img-fluid" src={require("../assets/images/globe-rent-a-car.png")}  /> </div>
    <div className="w-100"></div>
    <div className="col-md-1 col-2 pt-2"><img className="img-fluid" src={require("../assets/images/Logo-HS-FA.png")}  /> </div>
    <div className="col-md-1 col-2 text-center">
      <img className="img-fluid mh-50 h-50" src={require("../assets/images/Logo-PDG.png")}  />
    </div>
    <div className="col-md-1 col-2 text-center">
      <img className="img-fluid mh-50 h-50" src={require("../assets/images/emerald.png")}  />
    </div>
    <div className="col-md-1 col-2 text-center">
      <img className="img-fluid mh-50 h-50 w-100 mw-100" src={require("../assets/images/city.png")}  />
    </div>
    <div className="col-md-1 col-2 text-center">
      <img className="img-fluid mh-50 h-50" src={require("../assets/images/Layer4.png")} />
    </div>
    <div className="col-md-1 col-2 pt-2"><img className="img-fluid" src={require("../assets/images/Layer5.png")}  /> </div>
    <div className="w-100" style={{padding: "1rem"}}></div>
  </div>
);

export default Trust;
