import React, { Component, Fragment } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import localforage from "localforage";

import Camera from "./Camera";
import Cropper from "./Cropper";
import Stitcher from "./Stitcher";
import Album from "./Album";
//import testImage from "./testImage.json";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "app", //should be "app"
      originalImageDataURL: null,
      stitchedImageDataURL: null,
      bodyParts: {
        head: {
          dataURL: null,
          height: null,
          width: null
        },
        body: {
          dataURL: null,
          height: null,
          width: null
        },
        legs: {
          dataURL: null,
          height: null,
          width: null
        },
        greatestHeight: null
      }
    };
  }

  handleButtonClick = () => {
    this.showCamera();
  };

  showFrontPage = () => {
    this.setState({ view: "app" });
  };

  showCamera = () => {
    this.setState({ view: "camera" });
  };

  showCropper = () => {
    this.setState({ view: "cropper" });
  };

  /**
   * Save a picture taken with camera
   */
  storeOriginalPicture = PNGimage => {
    // Store image
    this.setState({ originalImageDataURL: PNGimage }, () => {
      // then show cropper
      this.setState({ view: "cropper" });
    });
  };

  /**
   * Save a picture taken with camera
   */
  storeStitchedPicture = PNGimage => {
    // Store image
    this.setState({ stitchedImageDataURL: PNGimage }, () => {
      // then store image object in localforage
      localforage
        .setItem(Date.now() + "", {
          originalImageDataURL: this.state.originalImageDataURL,
          stitchedImageDataURL: this.state.stitchedImageDataURL,
          bodyParts: this.state.bodyParts
        })
        .then(() => {
          // finally show front page again
          this.setState({ view: "app" });
        })
        .catch(err => {
          console.log(err);
        });
    });
  };

  storeBodyParts = bodyParts => {
    // Store bodyParts images
    this.setState({ bodyParts: bodyParts }, () => {
      // Then show Stitcher
      this.setState({ view: "stitcher" });
    });
  };

  render() {
    let viewComponent;
    if (this.state.view === "app") {
      viewComponent = (
        <Fragment>
          <h1>Mix Max</h1>
          <Button
            onClick={this.handleButtonClick}
            id="startCameraButton"
            variant="contained"
            color="primary"
          >
            Click to start camera
          </Button>
          <Divider variant="middle" />
          <Album />
        </Fragment>
      );
    } else if (this.state.view === "camera") {
      viewComponent = (
        <Camera
          className="yolo"
          exitCamera={this.showFrontPage}
          storeOriginalPicture={this.storeOriginalPicture}
        />
      );
    } else if (this.state.view === "cropper") {
      viewComponent = (
        <Cropper
          imageDataURL={this.state.originalImageDataURL}
          exitCropper={this.showCamera}
          storeBodyParts={this.storeBodyParts}
        />
      );
    } else if (this.state.view === "stitcher") {
      viewComponent = (
        <Stitcher
          bodyParts={this.state.bodyParts}
          storeStitchedPicture={this.storeStitchedPicture}
          exitStitcher={this.showCropper}
        />
      );
    }

    return (
      <StyledApp>
        <div className="App">{viewComponent}</div>
      </StyledApp>
    );
  }
}

const StyledApp = styled.div.attrs({ id: "StyledApp" })`
  .App {
    text-align: center;
  }

  #startCameraButton {
    margin-bottom: 2em;
  }

  .imageContainer {
    height: 100vh;
    width: 100vw;
    display: flex;
  }

  .imageView {
    object-fit: contain;
    flex-grow: 1;
    max-width: 100%;
    max-height: 100%;
  }

  .exitButton {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    margin: 0.3em;
  }

  .actionButton {
    margin-bottom: 2em;
  }

  .actionButtonContainer {
    position: fixed;
    bottom: 0;
    width: 100%;
    text-align: center;
  }
`;

export default App;
