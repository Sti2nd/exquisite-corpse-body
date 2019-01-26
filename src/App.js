import React, { Component } from 'react';
import './App.css';

class App extends Component {

  setVideostreamMetadata = (e) => {
    this.setState({
      videoWidth : e.nativeEvent.target.videoWidth,
      videoHeight : e.nativeEvent.target.videoHeight
    })
  }

  showCamera = () => {
    let video = document.getElementById("picturePreview");
    var constraints = {
      audio: false,
      video: { 
        facingMode: "environment",
        width: 1280,
        height: 720,
        aspectRatio: 1.777777778
      }
    }
    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      video.srcObject = stream;
    }).catch((err) => {
      console.log("Sorry, you don't have a camera")
    })
  }

  takePicture = () => {
    // Initialize
    let canvas = document.getElementById("hiddenCanvas");
    let context = canvas.getContext("2d");
    let video = document.getElementById("picturePreview");
    
    // Set canvas the same size as video inputstream
    canvas.width = this.state.videoWidth;
    canvas.height = this.state.videoHeight;
    // Draw image on canvas
    context.drawImage(video, 0, 0, this.state.videoWidth, this.state.videoHeight)

    // Get an image dataURL from the canvas
    var imageDataURL = canvas.toDataURL('image/png');
    // Set dataURL as source of image element, showing the captured image
    document.getElementById("takenPictureFrame").setAttribute("src", imageDataURL);
    
    // Set href for download button
    var downloadButton = document.getElementById("downloadButton");
    downloadButton.href = imageDataURL;
    downloadButton.removeAttribute("hidden");
  }

  render() {
    return (
      <div className="App">
        <button onClick={this.showCamera} id="startCameraButton">Click to start camera</button>
        <button onClick={this.takePicture} id="takePictureButton">Take picture</button>
        <video onLoadedData={this.setVideostreamMetadata} playsInline autoPlay muted id="picturePreview"></video>
        <canvas id="hiddenCanvas" hidden></canvas>
        <img id="takenPictureFrame" alt=""></img>
        <a id="downloadButton" href="#" download="mix-max.png" hidden>Download picture</a>
      </div>
    );
  }
}

export default App;
