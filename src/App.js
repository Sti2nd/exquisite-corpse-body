import React, { Component, Fragment } from "react";
import styled from "styled-components";

import Camera from "./Camera";
import Editor from "./Editor";
import Stitcher from "./Stitcher";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "app", //should be "app"
      originalImageDataURL: null,
      stitchedImageDataURL: null,
      bodyParts: {
        head: null,
        body: null,
        legs: null,
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

  /**
   * Save a picture taken with camera
   */
  storeOriginalPicture = PNGimage => {
    // Store image
    this.setState({ originalImageDataURL: PNGimage }, () => {
      // then show editor
      this.setState({ view: "editor" });
    });
  };

  /**
   * Save a picture taken with camera
   */
  storeStitchedPicture = PNGimage => {
    // Store image
    this.setState({ stitchedImageDataURL: PNGimage }, () => {
      // then show editor
      this.setState({ view: "app" });
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
          <button onClick={this.handleButtonClick} id="startCameraButton">
            Click to start camera
          </button>
          <h3>Your images</h3>
          <img
            src={this.state.stitchedImageDataURL}
            alt=""
            style={{ maxWidth: "100%", border: "1px solid black" }}
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
    } else if (this.state.view === "editor") {
      viewComponent = (
        <Editor
          imageDataURL={this.state.originalImageDataURL}
          exitEditor={this.showCamera}
          storeBodyParts={this.storeBodyParts}
        />
      );
    } else if (this.state.view === "stitcher") {
      viewComponent = (
        <Stitcher
          bodyParts={this.state.bodyParts}
          storeStitchedPicture={this.storeStitchedPicture}
        />
      );
    }

    return (
      <StyledApp>
        <div className="App">
          {viewComponent}
          <a id="downloadButton" href="#" download="mix-max.png" hidden>
            Download picture
          </a>
        </div>
      </StyledApp>
    );
  }
}

const StyledApp = styled.div.attrs({ id: "StyledApp" })`
  .App {
    text-align: center;
  }

  button {
    font-size: 1.2rem;
    border-radius: 0.5rem;
    padding: 0.5rem;
    margin: 0.5rem;
    background-color: whitesmoke;
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
    right: 0;
    z-index: 1;
  }
`;

export default App;
