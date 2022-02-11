import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import { Particles } from 'react-tsparticles';
import { Component } from 'react';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import { useForm } from "react-hook-form";


const particlesOptions = {
	background: {
		color: {
		  value: "#0d47a1",
		},
	  },
	  fpsLimit: 60,
	  interactivity: {
		events: {
		  onClick: {
			enable: true,
			mode: "push",
		  },
		  onHover: {
			enable: true,
			mode: "repulse",
		  },
		  resize: true,
		},
		modes: {
		  bubble: {
			distance: 400,
			duration: 2,
			opacity: 0.8,
			size: 40,
		  },
		  push: {
			quantity: 4,
		  },
		  repulse: {
			distance: 200,
			duration: 0.4,
		  },
		},
	  },
	  particles: {
		color: {
		  value: "#ffffff",
		},
		links: {
		  color: "#ffffff",
		  distance: 150,
		  enable: true,
		  opacity: 0.5,
		  width: 1,
		},
		collisions: {
		  enable: true,
		},
		move: {
		  direction: "none",
		  enable: true,
		  outMode: "bounce",
		  random: false,
		  speed: 1,
		  straight: false,
		},
		number: {
		  density: {
			enable: true,
			area: 800,
		  },
		  value: 80,
		},
		opacity: {
		  value: 0.5,
		},
		shape: {
		  type: "circle",
		},
		size: {
		  random: true,
		  value: 5,
		},
	  },
	  detectRetina: true,
  }

const initialState = {
	input: '',
	imageUrl: '',
	box: {},
	route: 'signin',
	isSignedIn: false,
	user: {
		id: '',
		name: '',
		email: '',
		entries: 0,
		joined: ''
	}
}

class App extends Component {
	constructor(){
		super();
		this.state = initialState;
	}


	loadUser = (data) => {
		this.setState({user: {
			id: data.id,
			name: data.name,
			email: data.email,
			entries: data.entries,
			joined: data.joined
			}
		}
	)}

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
			fetch('https://ldsmartbrainapi.herokuapp.com/imageurl', {
				method: 'post',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({
					input: this.state.input
				})
			})
			.then(response => response.json())
			.then(response => {
				if (response){
					fetch('https://ldsmartbrainapi.herokuapp.com/image', {
						method: 'put',
						headers: {'Content-Type': 'application/json'},
						body: JSON.stringify({
							id: this.state.user.id
						})
					})
						.then(response => response.json())
						.then(count => {
							this.setState(Object.assign(this.state.user, {entries: count}));
						})
						.catch(err => console.log(err))
				}
				this.displayFaceBox(this.calculateFaceLocation(response))
			})
			.catch(err => console.log(err))
	}
//console.log(response.outputs[0].data.regions[0].region_info.bounding_box)

	onRouteChange = (route) =>{
		if (route != 'signout'){
			if(route === 'home') {
				this.setState({isSignedIn: true});
				this.setState({route: route});
			} else {
			this.setState({route: route});
			}
		} else {
			this.setState(initialState);
			this.setState({route: 'signin'});
		}
}

  render() {
	  const { isSignedIn, imageUrl, route, box } = this.state;
    return (
      <div className="App">
        <Particles 
			className='particles' 
			params={particlesOptions}
			//init={particlesInit}
			//loaded={particlesLoaded}
		/>
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} route={route}/>
		{ route==='home'
			?<div>
			<Logo />
			<Rank entries={this.state.user.entries} name={this.state.user.name}/>
			<ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
			<FaceRecognition box={box} imageUrl={imageUrl}/>
			</div>
			:
			(
				route==='signin'
				? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
				: <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
				
			)
		}
      </div>
    );
  }
}

export default App;
