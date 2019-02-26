import React, { Component } from "react";
import styled from "styled-components";
import { fabric } from "fabric/dist/fabric";

class Stitcher extends Component {
  constructor(props){
    super();
    let canvas = null;
  }

  componentDidMount() {
    //TODO: recalculate height and width on browser windows resize?
    const fabricCanvas = new window.fabric.Canvas("fabricCanvas", {
      allowTouchScrolling: true,
      interactive: true,
      height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
      width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
    });

    const fabricImageOptions = {
      hasRotatingPoint: false,
      lockSkewingX: true, // Cannot skew by holding shift
      lockSkewingY: true, // Cannot skew by holding shift
    }
    // add head
    fabric.Image.fromURL(this.props.bodyParts.head, (img) => {
      img.scale(0.2).set({top:0})
      fabricCanvas.add(img);
    }, fabricImageOptions)

    // add body
    fabric.Image.fromURL(this.props.bodyParts.body, (img) => {
      img.scale(0.2).set({top:200})
      fabricCanvas.add(img);
    }, fabricImageOptions)

    // add legs
    fabric.Image.fromURL(this.props.bodyParts.legs, (img) => {
      img.scale(0.2).set({top:400})
      fabricCanvas.add(img);
    }, fabricImageOptions)

    this.canvas = fabricCanvas;
  }

  handleButtonClick = () => {
    this.saveAsPNG(this.canvas);
  }

  /**
   * Save the picture in PNG-format
   * @param {*} canvas The canvas already containing the picture
   */
  saveAsPNG = canvas => {
    // Get an image dataURL from the canvas
    var imageDataURL = canvas.toDataURL();
    // Save
    this.props.storeStitchedPicture(imageDataURL);
  };

  render() {
    return (
      <StyledStitcher>
        <button
            id="exitStitcherButton"
            className="exitButton"
            onClick={this.props.exitEditor}
          >
            X
          </button>
        <canvas
          id="fabricCanvas"
        />
        <div id="stitchPictureButtonContainer">
            <button onClick={this.handleButtonClick}>
              Finished stitching
            </button>
          </div>
      </StyledStitcher>
    );
  }
}

const StyledStitcher = styled.div.attrs({ id: "StyledStitcher" })`
 #fabricCanvas {
   width: 500px;
   height: 500px;
 }

 #stitchPictureButtonContainer {
    position: fixed;
    bottom: 0;
    width: 100%;
    text-align: center;
  }
`;

export default Stitcher;
