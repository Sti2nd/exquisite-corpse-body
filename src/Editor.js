import React, { Component } from "react";
import styled from "styled-components";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      head: null,
      body: null,
      legs: null
    };
  }

  _cropperReady = () => {
    this.cropperInstance = this.refs.cropper;
    console.log(this.cropperInstance);
  };

  handleButtonClick = () => {
    if (this.state.head === null) {
      this.setState({
        head: this.cropperInstance.getCroppedCanvas().toDataURL()
      });
    } else if (this.state.body === null) {
      this.setState({
        body: this.cropperInstance.getCroppedCanvas().toDataURL()
      });
    } else if (this.state.legs === null) {
      this.setState({
        legs: this.cropperInstance.getCroppedCanvas().toDataURL()
      });
    } else {
      // Done cropping
      this.props.storeBodyParts({
        head: this.state.head,
        body: this.state.body,
        legs: this.state.legs
      });
    }
  };

  render() {
    let buttonText = "";
    if (this.state.head === null) {
      buttonText = "Select head";
    } else if (this.state.body === null) {
      buttonText = "Select body";
    } else if (this.state.legs === null) {
      buttonText = "Select legs";
    } else {
      buttonText = "Done";
    }

    return (
      <StyledEditor>
        <div className="imageContainer">
          <button
            id="exitEditorButton"
            className="exitButton"
            onClick={this.props.exitEditor}
          >
            X
          </button>
          <div id="cropPictureButtonContainer">
            <button onClick={this.handleButtonClick} id="takePictureButton">
              {buttonText}
            </button>
          </div>
          <Cropper
            className="imageView"
            ref="cropper"
            src={this.props.imageDataURL}
            viewMode={1}
            dragMode="move"
            ready={this._cropperReady}
            preview="#preview"
            movable={false}
            scalable={false}
            zoomable={false}
          />
        </div>
        <div id="preview" />
        <img src={this.state.head} alt=""/>
        <img src={this.state.body} alt=""/>
        <img src={this.state.legs} alt=""/>
      </StyledEditor>
    );
  }
}

const StyledEditor = styled.div.attrs({ id: "StyledEditor" })`
  #cropPictureButtonContainer {
    position: fixed;
    bottom: 0;
    width: 100%;
    text-align: center;
  }

  #cropPictureButtonContainer {
    z-index: 1;
  }

  #preview {
    width: 500px;
    height: 500px;
    overflow: hidden;
  }
`;

export default Editor;
