import React, { Component } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import BackIcon from "@material-ui/icons/ArrowBackIos";

class Camera extends Component {
  componentDidMount() {
    this.showCamera();
  }

  setVideoStreamMetadata = e => {
    this.setState(
      {
        videoWidth: e.nativeEvent.target.videoWidth,
        videoHeight: e.nativeEvent.target.videoHeight
      },
      () => {
        console.log(
          "Video stream has width: " +
            this.state.videoWidth +
            ", height: " +
            this.state.videoHeight
        );
      }
    );
  };

  showCamera = () => {
    let video = document.getElementById("cameraStreamView");
    let constraints = {
      audio: false,
      video: {
        facingMode: "environment",
        width: 1920,
        height: 1080,
        aspectRatio: 1.777777778
      }
    };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(stream => {
        // video element is showing the camera stream
        video.srcObject = stream;
      })
      .catch(err => {
        console.log("It seems you don't have a camera");
      });
  };

  takePicture = () => {
    // Initialize
    let canvas = document.getElementById("hiddenCanvas");
    let context = canvas.getContext("2d");
    let video = document.getElementById("cameraStreamView");

    // Set canvas the same size as video inputstream
    canvas.width = this.state.videoWidth;
    canvas.height = this.state.videoHeight;
    // Draw image on canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    this.saveAsPNG(canvas);
  };

  /**
   * Save the picture in PNG-format
   * @param {*} canvas The canvas already containing the picture
   */
  saveAsPNG = canvas => {
    // Get an image dataURL from the canvas
    /*     canvas.toBlob(blob => {
      var imageDataURL = URL.createObjectURL(blob);
      console.log(imageDataURL)
      this.props.storeOriginalPicture(imageDataURL);
    }); */

    let imageDataURL = canvas.toDataURL();
    this.props.storeOriginalPicture(imageDataURL);
  };

  componentWillUnmount() {
    if (document.getElementById("cameraStreamView").srcObject != null) {
      document
        .getElementById("cameraStreamView")
        .srcObject.getVideoTracks()
        .forEach(track => {
          track.stop();
        });
    }
  }

  render() {
    return (
      <StyledCamera>
        <div className="imageContainer">
          <IconButton
            id="exitCameraButton"
            className="exitButton"
            onClick={this.props.exitCamera}
            variant="contained"
          >
            <BackIcon />
          </IconButton>
          <video
            onLoadedData={this.setVideoStreamMetadata}
            playsInline
            autoPlay
            muted
            id="cameraStreamView"
            className="imageView"
          />
          <div
            id="takePictureButtonContainer"
            className="actionButtonContainer"
          >
            <Button
              onClick={this.takePicture}
              className="actionButton"
              variant="contained"
              color="primary"
            >
              Take picture
            </Button>
          </div>
          <canvas id="hiddenCanvas" hidden />
          <img id="takenPictureFrame" alt="" />
        </div>
      </StyledCamera>
    );
  }
}

const StyledCamera = styled.div.attrs({ id: "StyledCamera" })`
  #takenPictureFrame {
    max-width: 100%;
  }
`;

export default Camera;
