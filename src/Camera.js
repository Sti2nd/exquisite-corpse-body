import React, { Component } from 'react';
import styled from "styled-components";




const StyledCamera = styled.div.attrs({id : "StyledCamera"})`
#picturePreview {
  width: 18em;
  height: 32em;
}

#takenPictureFrame {
  max-width: 100%;
}
`





class Camera extends Component {

  componentDidMount(){
    this.showCamera();
  }

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
        width: 1920,
        height: 1080,
        aspectRatio: 1.777777778
      }
    }
    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      video.srcObject = stream;
    }).catch((err) => {
      console.log("It seems you don't have a camera")
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
    context.drawImage(video, 0, 0, canvas.width, canvas.height)

    this.saveAsPNG(canvas);
  }
  
  /**
   * Save the picture in PNG-format
   * @param {*} canvas The canvas already containing the picture
   */
  saveAsPNG = (canvas) => {
    // Get an image dataURL from the canvas
    canvas.toBlob((blob) => {
      var imageDataURL = URL.createObjectURL(blob);
      // Set dataURL as source of image element, showing the captured image
      document.getElementById("takenPictureFrame").setAttribute("src", imageDataURL);
      
      // Set href for download button
      var downloadButton = document.getElementById("downloadButton");
      downloadButton.href = imageDataURL;
      downloadButton.removeAttribute("hidden");
    });
  }

  componentWillUnmount(){
    document.getElementById("picturePreview").getVideoTracks().array.forEach(track => {
      track.stop();
    });
  }

  render() {
    return (
        <StyledCamera>
          <div id="cameraView">
              <button onClick={this.takePicture} id="takePictureButton">Take picture</button>
              <video onLoadedData={this.setVideostreamMetadata} playsInline autoPlay muted id="picturePreview"></video>
              <canvas id="hiddenCanvas" hidden></canvas>
              <img id="takenPictureFrame" alt=""></img>
          </div>
        </StyledCamera>
    )
  }
}

export default Camera;