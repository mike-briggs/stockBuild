import React, { Component } from 'react';
import './components/App.css'
import './assets/css/bootstrap.min.css'
import './assets/css/font-awesome.css'
import NavBar from './NavBar.js'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Header from './components/Header.js'



export class App extends Component {
  constructor() {
    super();
    this.fiscal = React.createRef();
  }
  scroll(ref) {
    ref.current.scrollIntoView({ behavior: 'smooth' })
  }
  render() {
    const settings = {
      dots: true,
      infinite: true,
      arrows: true,
      speed: 500,
      adaptiveHeight: true,
      autoplay: true,
      autoplaySpeed: 2200,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <div className="">
        <NavBar />
        <Header scroll={this.fiscal}/>
        
        <hr style={{padding:'20px',paddingAbove:'40px'}}></hr>
        <div className="container">
        <div className="col-lg-12 col-md-12 col-12">
                      <h4 style={{ fontFamily: 'Raleway', paddingBottom:'20px',fontSize: '16px',float:'right' }} className="">Copyright &copy;  Stock Search.</h4>
                    </div>
        </div>
        
      </div>
    );
  }

}

export default App;
