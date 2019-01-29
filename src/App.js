import React, { Component, Fragment } from "react";
import styled from "styled-components";

import Camera from "./Camera";
import Edit from "./Editor";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "app"
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

  storePicture = PNGimage => {
    // Store image
    this.setState({ imageDataURL: PNGimage }, () => {
      // then show editor
      this.setState({ view: "editor" });
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
        </Fragment>
      );
    } else if (this.state.view === "camera") {
      viewComponent = (
        <Camera
          className="yolo"
          exitCamera={this.showFrontPage}
          storePicture={this.storePicture}
        />
      );
    } else if (this.state.view === "editor") {
      viewComponent = (
        <Edit
          imageDataURL={this.state.imageDataURL}
          exitEditor={this.showCamera}
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
