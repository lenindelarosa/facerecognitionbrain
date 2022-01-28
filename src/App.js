import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-tsparticles';
import { Component } from 'react';
import Clarifai from 'clarifai'
import FaceRecognition from './components/FaceRecognition/FaceRecognition';


const particlesOptions = {
	background: {
		color: {
		  value: "#0d47a1"
		}
	}
}


const app = new Clarifai.App({apiKey: '7789afab63904f769efd2a89f57c8dc7'})

class App extends Component {
	constructor(){
		super();
		this.state = {
			input: '',
			imageUrl: ''
		}
	}

	onInputChange = (event) => {
		this.setState({input: event.target.value})
		console.log(this.state.input);
	}

	onButtonSubmit = (event) => {
		this.setState({imageUrl: this.state.input});
		app.models
			.predict(
				Clarifai.COLOR_MODEL, 
				this.state.input)
			.then(
				function (response) {
					console.log(response)
				},
				function (err){
					console.log(err)
				}
		)
	}

  render() {
    return (
      <div className="App">
        <Particles id='tsparticles' options={{particlesOptions}}/>
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
		<FaceRecognition imageUrl={this.state.imageUrl}/>
      </div>
    );
  }
}

export default App;
