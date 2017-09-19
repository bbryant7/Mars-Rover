import React, { Component } from 'react';
import '../styles/App.css';
// you get images from the render section when you pass images as a property in GetImage Form

class ImageDisplay extends Component {
  render() {

    console.log(this.props.images)
    let photos = this.props.images.map(photo  => {
      return (

        <div key={photo.id}>
        <img src={photo.img_src} alt="Picture from Mars."/>

        </div>

      );

    });

    return(
      <div>
      {photos}
      </div>
    )


}
}

export default ImageDisplay;


// let photos = this.props.images.map( (photo, index)
// why not state
