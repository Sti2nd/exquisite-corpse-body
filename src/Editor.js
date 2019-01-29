import React, { Component } from "react";
import styled from "styled-components";

class Edit extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    // Set dataURL as source of image element, showing the captured image
    document
      .getElementById("pictureShot")
      .setAttribute("src", this.props.imageDataURL);
  };

  render() {
    return (
      <div className="imageContainer">
      <button id="exitEditorButton" className="exitButton" onClick={this.props.exitEditor}>
            X
      </button>
        <img className="imageView" id="pictureShot" alt="" />
      </div>
    );
  }
}

const StyleViewImage = styled.div.attrs({ id: "StyledViewImage" })`
  #takenPictureFrame {
    max-width: 100%;
  }
`;

export default Edit;
