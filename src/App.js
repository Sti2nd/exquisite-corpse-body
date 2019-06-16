import React, { Component, Fragment } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import localforage from "localforage";

import Camera from "./Camera";
import Cropper from "./Cropper";
import Stitcher from "./Stitcher";
import Album from "./Album";
import BodyPartSelector from "./BodyPartSelector";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "app", //should be "app"
      numImgsInDatabase: null,
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

  handleStartCameraButtonClick = () => {
    this.showCamera();
  };

  handleConnectBodyPartsButtonClick = () => {
    this.showBodyPartSelector();
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

  showBodyPartSelector = () => {
    this.setState({ view: "bodyPartSelector" });
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

  setNumImgsInDatabase = number => {
    this.setState({ numImgsInDatabase: number });
  };

  render() {
    // Show connectBodyPartsButton if there are enough images
    let connectBodyPartsButton = null;
    if (this.state.numImgsInDatabase > 1) {
      connectBodyPartsButton = (
        <Button
          onClick={this.handleConnectBodyPartsButtonClick}
          id="connectBodypartsButton"
          className="AppButtons"
          variant="contained"
          color="primary"
        >
          Connect bodyparts!
        </Button>
      );
    } else {
      connectBodyPartsButton = (
        <p>You need to take two pictures before partying</p>
      );
    }

    // Show component based on state
    let viewComponent;
    if (this.state.view === "app") {
      viewComponent = (
        <Fragment>
          <h1>Mix Max</h1>
          <Button
            onClick={this.handleStartCameraButtonClick}
            id="startCameraButton"
            className="AppButtons"
            variant="contained"
            color="primary"
          >
            Start camera
          </Button>
          <br />
          {connectBodyPartsButton}
          <Divider variant="middle" />
          <Album
            setNumImgsInDatabase={this.setNumImgsInDatabase}
          />
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
    } else if (this.state.view === "bodyPartSelector"){
      viewComponent = (
        <BodyPartSelector exitBodyPartSelector={this.showFrontPage}/>
      )
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

  .AppButtons {
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
