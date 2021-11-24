import React, { useState } from 'react';
import './App.css';
import Particles from "react-tsparticles";
import Navigation from './Components/Navigation/Navigation.js';
import Rank from './Components/Rank/Rank.js';
import Logo from './Components/Logo/Logo.js';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Clarifai from 'clarifai';


const app = new Clarifai.App({
  apiKey: 'c13b367795254e81809002937fe5376d'
});

const params = {
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
      value: "#ED52CD",
    },
    links: {
      color: "#ED52CD",
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
      speed: 4,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        value_area: 800,
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

const App = () => {

  const particlesInit = (main) => {
    console.log(main)


  };

  const particlesLoaded = (container) => {
    console.log(container)
  };

  const [input, setInput] = useState(" ");
  const [imageurl, setImageurl] = useState('');
  const [box, setBox] = useState('');

  const calculateFaceLocation = (data) => {
    const clarifaiFace = data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  const displayFaceBox = (box) => {
    setBox(box);
  }

  const onInputChange = (event) => {
    setInput(event.target.value)
  }

  const onButtonSubmit = () => {
    setImageurl(input);

    //   app.models
    //     .predict(
    //       // HEADS UP! Sometimes the Clarifai Models can be down or not working as they are constantly getting updated.
    //       // A good way to check if the model you are using is up, is to check them on the clarifai website. For example,
    //       // for the Face Detect Mode: https://www.clarifai.com/models/face-detection
    //       // If that isn't working, then that means you will have to wait until their servers are back up. Another solution
    //       // is to use a different version of their model that works like the ones found here: https://github.com/Clarifai/clarifai-javascript/blob/master/src/index.js
    //       // so you would change from:
    //       // .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    //       // to:
    //       // .predict('53e1df302c079b3db8a0a36033ed2d15', this.state.input)
    //       {
    //         id: "a403429f2ddf4b49b307e318f00e528b" ,
    //         version: "34ce21a40cc24b6b96ffee54aabff139",
    //       },
    //       input)
    //       fetch('https://api.clarifai.com/v2/models/a403429f2ddf4b49b307e318f00e528b/outputs', {
    // 				method: 'post',
    // 				headers: {'Content-Type': 'application/json'},
    // 				body: JSON.stringify({
    // 					input: input
    // 				})
    // 			})
    //   	.then(response => response.json())
    // .then(response => {
    //   console.log(response)
    //   if (response) {
    //     fetch('http://localhost:3000/imageurl', {
    //       method: 'put',
    //       headers: { 'Content-Type': 'application/json' },
    //       body: JSON.stringify({
    //         // id: this.state.user.id
    //       })
    //     })
    //     // .then(response => response.json())
    //     // .then(count => {
    //     //   this.setState(Object.assign(this.state.user, { entries: count }))
    //     // })

    //   }
    //   displayFaceBox(calculateFaceLocation(response))
    // })
    // .catch(error => console.log('error', error));
    //   }

    const raw = JSON.stringify({
      "user_app_id": {
        "user_id": "tkojxc2qlwy4",
        "app_id": "7b16c00f8b3248cfa10dabfb17a9cac4"
      },
      "inputs": [
        {
          "data": {
            "image": {
              "url": input
              //  "https://images.pexels.com/photos/3586798/pexels-photo-3586798.jpeg"
            }
          }
        }
      ]
    });

    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Key 93c2946bd1b3463a86e3d1a3235e64ec'
      },
      body: raw
    };

    // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
    // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
    // this will default to the latest version_id

    fetch("https://api.clarifai.com/v2/models/a403429f2ddf4b49b307e318f00e528b/outputs", requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(JSON.parse(result, null, 2).outputs[0].data)
        displayFaceBox(calculateFaceLocation(JSON.parse(result, null, 2).outputs[0].data))
      })
      .catch(error => console.log('error', error));
  }
  return (
    <>
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={params}
        className='particles'
      />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm onInputChange={onInputChange} onButtonSubmit={onButtonSubmit} />
      <FaceRecognition imageurl={imageurl} box={box} />
    </>
  );
}


export default App;
