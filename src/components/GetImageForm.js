// stateful smart class based components
import React, { Component } from "react";
import "../styles/App.css";
import apiKey from "./apiKey.js";
import GetImageButton from "./GetImageButton.js";
import ImageDisplay from "./ImageDisplay.js";
const API_KEY = apiKey;

export default class GetImageForm extends Component {
  // use props so you can pass from here to else where
  constructor(props) {
    super(props);

    this.state = {
      rover: "Curiosity",
      camera: "FHAZ",
      images: [],
      sol: ""
    };

    this.fetchRoverImage = this.fetchRoverImage.bind(this);
    this.handleRover = this.handleRover.bind(this);
    this.handleCamera = this.handleCamera.bind(this);
    this.handleSol = this.handleSol.bind(this);
  }

  handleRover(e) {
    e.preventDefault();
    this.setState({
      rover: e.target.value
    });
  }

  handleCamera(e) {
    e.preventDefault();
    this.setState({
      camera: e.target.value
    });
  }
  handleSol(e) {
    e.preventDefault();
    this.setState({
      sol: e.target.value
    });
  }
// e.target.value references the value attribute of the form inputs. will always be value
// **are able to grab input values below because state is set in handles above. does NOT reference initial state
  fetchRoverImage() {
    console.log("Fire!");
    let camera = this.state.camera;
    let rover = this.state.rover;
    let num = this.state.sol;
    let imageURL = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${num}&camera=${camera}&api_key=${API_KEY}`;

    fetch(imageURL)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({ images: data.photos });
      });
    // second then sets the NEW state of the images array to the data we fetched. data because data in first then, photos because thats what object is called in data
  }
  render() {
    // value always = this.state.value, sets value of input
    return (
      <div>
        <h1> Meow Face </h1>
      <form>
        <label htmlFor="rover">Rover</label>
        <select onChange={this.handleRover} id="rover" value={this.state.value}>
          <option value="Curiosity">Curiosity</option>
          <option value="Opportunity">Opportunity</option>
          <option value="Spirit">Spirt</option>
        </select>
        <label htmlFor="camera">Camera Type</label>
        <select
          onChange={this.handleCamera}
          id="rover"
          value={this.state.value}
        >
          <option value="fhaz">FHAZ (Front Hazard)</option>
          <option value="rhaz">RHAZ (Rear Hazard)</option>
          <option value="navcam">NAVCAM (Navigation Cam)</option>
        </select>
        <label htmlFor="sol">Martian Sol: 1000-2000</label>
        <input
          type="number"
          onChange={this.handleSol}
          max="2000"
          min="1000"
          value={this.state.value}
        />
        </form>
        <GetImageButton fetchRoverImage={this.fetchRoverImage} />
        <ImageDisplay images={this.state.images}/>
      </div>
    );
  }
}

  // <GetImageButton fetchRoverImage={this.fetchRoverImage} />
  // renders button and passes method as a property to GetImageButton
  // <ImageDisplay images={this.state.images}/> 
  // renders the images, but also passes the property for images which is set in the fetch
