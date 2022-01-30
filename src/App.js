import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-tsparticles';
import { Component } from 'react';
import Clarifai from 'clarifai'
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';


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
			imageUrl: '',
			box: {},
			route: 'signin',
			isSignedIn: false,
		}
	}

	calculateFaceLocation = (data) => {
		const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
		const image = document.getElementById('inputimage')
		const width = Number(image.width);
		const height = Number(image.height);
		console.log(width, height);
		return {
			leftCol: clarifaiFace.left_col * width,
			topRow: clarifaiFace.top_row * height,
			rightCol: width - (clarifaiFace.right_col * width),
			bottomRow: height - (clarifaiFace.bottom_row * height)

		}
	}

	displayFaceBox = (box) => {
		console.log(box);
		this.setState({box: box});
	}

	onInputChange = (event) => {
		this.setState({input: event.target.value})
		console.log(this.state.input);
	}

	onButtonSubmit = (event) => {
		this.setState({imageUrl: this.state.input});
		app.models
			.predict(
				Clarifai.FACE_DETECT_MODEL, 
				this.state.input)
			.then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
			.catch(err => console.log(err))
	}
//console.log(response.outputs[0].data.regions[0].region_info.bounding_box)

	onRouteChange = (route) =>{
		if (route==='signout'){
			this.setState({isSignedIn: false});
		} else if(route === 'home') {
			this.setState({isSignedIn: true})
		}
		this.setState({route: route});
	}

  render() {
	  const { isSignedIn, imageUrl, route, box } = this.state;
    return (
      <div className="App">
        <Particles id='tsparticles' options={{particlesOptions}}/>
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>
		{ route==='home'
			?<div>
			<Logo />
			<Rank />
			<ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
			<FaceRecognition box={box} imageUrl={imageUrl}/>
			</div>
			:
			(
				route==='signin'
				? <Signin onRouteChange={this.onRouteChange}/>
				: <Register onRouteChange={this.onRouteChange}/>
			)
		}
      </div>
    );
  }
}

export default App;
