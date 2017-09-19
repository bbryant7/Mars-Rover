// stateful smart class based components
import React, { Component } from 'react';
import '../styles/App.css';
import apiKey from './apiKey.js'
import GetImageButton from './GetImageButton.js'
import ImageDisplay from './ImageDisplay.js'
const API_KEY = apiKey;

export default class GetImageForm extends Component {
  constructor(props){
    super(props)

    this.state = {
  rover: "Curiosity",
  camera: "FHAZ",
  images: [],
  sol: "",
}

  this.fetchRoverImage = this.fetchRoverImage.bind(this);
  }



  fetchRoverImage(){
    let camera = this.state.camera;
    let rover =this.state.rover;
    let num = this.state.sol;
    let imageURL =`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${num}&camera=${camera}&api_key=${API_KEY}`;
    fetch(imageURL).then((response) => {
      return response.json()
    }).then((data)=> {
      this.setState({rover: data.photos.rover.name, camera: data.photos.camera.name, images: data.photos.img_src, sol:data.photos.sol})
    })
}
  render() {
    return (
    <div>
    <h1> Meow Face </h1>
    <select onChange={this.handle}>
    <option value="Curiosity">Curiosity</option>
    <option value="Opportunity">Opportunity</option>
    <option value="Spirit">Spirt</option>
    </select>
    <select onChange={this.handle}>
    <option value="fhaz">FHAZ (Front Hazard)</option>
    <option value="rhaz">RHAZ (Rear Hazard)</option>
    <option value="navcam">NAVCAM (Navigation Cam)</option>
    </select>
    <input onChange={this.handle}/>

    <GetImageButton fetchRoverImage = {this.fetchRoverImage}/>
    <ImageDisplay/>
    </div>

    );
  }
}
