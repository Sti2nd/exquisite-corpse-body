import React, { Component } from "react";
import styled from "styled-components";
import ReactCropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import IconButton from "@material-ui/core/IconButton";
import BackIcon from "@material-ui/icons/ArrowBackIos";
import Button from "@material-ui/core/Button";

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    };
  }

  _cropperReady = () => {
    this.cropperInstance = this.refs.cropper;
    //console.log(this.cropperInstance);
  };

  handleButtonClick = () => {
    if (this.state.head.dataURL === null) {
      // Store head
      this.setState({
        head: this.getBodyPart(),
        greatestHeight: this.cropperInstance.getData().height
      });
    } else if (this.state.body.dataURL === null) {
      // Store body
      this.setState({
        body: this.getBodyPart(),
        greatestHeight: this.getNewGreatestHeight(
          this.cropperInstance.getData().height,
          this.state.greatestHeight
        )
      });
    } else if (this.state.legs.dataURL === null) {
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
    return {
      dataURL: this.cropperInstance.getCroppedCanvas().toDataURL(),
      height: this.cropperInstance.getData().height,
      width: this.cropperInstance.getData().width
    };
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
    if (this.state.head.dataURL === null) {
      buttonText = "Select head";
    } else if (this.state.body.dataURL === null) {
      buttonText = "Select body";
    } else if (this.state.legs.dataURL === null) {
      buttonText = "Select legs";
    } else {
      buttonText = "Done";
    }

    return (
      <StyledEditor>
        <div className="imageContainer">
          <IconButton
            id="exitCameraButton"
            className="exitButton"
            onClick={this.props.exitCropper}
            variant="contained"
          >
            <BackIcon />
          </IconButton>
          <div id="cropPictureButtonContainer" className="actionButtonContainer">
            <Button
              onClick={this.handleButtonClick}
              variant="contained"
              color="primary"
              className="actionButton"
            >
              {buttonText}
            </Button>
          </div>
          <ReactCropper
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
      </StyledEditor>
    );
  }
}

const StyledEditor = styled.div.attrs({ id: "StyledEditor" })`
  #cropPictureButtonContainer {
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
