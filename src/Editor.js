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
      legs: null,
      greatestHeight: null
    };
  }

  _cropperReady = () => {
    this.cropperInstance = this.refs.cropper;
    console.log(this.cropperInstance);
  };

  handleButtonClick = () => {
    if (this.state.head === null) {
      // Store head
      this.setState({
        head: this.getBodyPart(),
        greatestHeight: this.cropperInstance.getData().height
      });
    } else if (this.state.body === null) {
      // Store body
      this.setState({
        body: this.getBodyPart(),
        greatestHeight: this.getNewGreatestHeight(
          this.cropperInstance.getData().height,
          this.state.greatestHeight
        )
      });
    } else if (this.state.legs === null) {
      // Store legs
      this.setState({
        legs: this.getBodyPart(),
        greatestHeight: this.getNewGreatestHeight(
          this.cropperInstance.getData().height,
          this.state.greatestHeight
        )
      });
    } else {
      // Done cropping
      this.props.storeBodyParts({
        head: this.state.head,
        body: this.state.body,
        legs: this.state.legs,
        greatestHeight: this.state.greatestHeight
      });
    }
  };

  /**
   * Returns the data URL of the current crop box
   */
  getBodyPart() {
    return this.cropperInstance.getCroppedCanvas().toDataURL();
  }

   /**
   * Returns the greatest of contender and current height
   */
  getNewGreatestHeight(contenderHeight, currentHeight) {
    if (contenderHeight > currentHeight) {
      return contenderHeight;
    } else {
      return currentHeight;
    }
  }

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
            <button onClick={this.handleButtonClick}>{buttonText}</button>
          </div>
          <Cropper
            className="imageView"
            ref="cropper"
            src={this.props.imageDataURL}
            viewMode={1}
            dragMode="move"
            ready={this._cropperReady}
            // preview="#preview"
            movable={false}
            scalable={false}
            zoomable={false}
          />
        </div>
        {/* <div id="preview" /> 
        <img src={this.state.head} alt=""/>
        <img src={this.state.body} alt=""/>
        <img src={this.state.legs} alt=""/> */}
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
    z-index: 1;
    pointer-events: none;
  }

  #cropPictureButtonContainer button {
    pointer-events: all;
  }

  #preview {
    width: 50px;
    height: 50px;
    overflow: hidden;
  }
`;

export default Editor;
