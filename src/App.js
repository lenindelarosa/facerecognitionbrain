import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-tsparticles';
import { Component } from 'react';


const particlesOptions = {
  particles: {
    number: {
        value: 160,
        density: {
            enable: true,
            value_area: 800
}}}};


class App extends Component {
  render() {
    return (
      <div className="App">
        <Particles className='particles'
    params={{
	    "particles": {
	        "number": {
	            "value": 160,
	            "density": {
	                "enable": false
	            }
	        },
	        "size": {
	            "value": 10,
	            "random": true
	        },
	        "move": {
	            "direction": "bottom",
	            "out_mode": "out"
	        },
	    },
	}} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm />
      { /*
        
      <FaceRecognition />*/}
      </div>
    );
  }
}

export default App;
