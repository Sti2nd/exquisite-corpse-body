import React, { Component } from "react";
import styled from "styled-components";
import { fabric } from "fabric/dist/fabric";

class Stitcher extends Component {
  constructor(props) {
    super();
  }

  componentDidMount() {
    //TODO: recalculate height and width on browser windows resize?
    const fabricCanvas = new window.fabric.Canvas("fabricCanvas", {
      allowTouchScrolling: true,
      interactive: true,
      height: Math.max(
        document.documentElement.clientHeight,
        window.innerHeight || 0
      ),
      width: Math.max(
        document.documentElement.clientWidth,
        window.innerWidth || 0
      )
    });

    const fabricImageOptions = {
      hasRotatingPoint: false,
      lockSkewingX: true, // Cannot skew by holding shift
      lockSkewingY: true // Cannot skew by holding shift
    };
    // add head
    fabric.Image.fromURL(
      this.props.bodyParts.head,
      img => {
        img.scale(0.2).set({ top: 0 });
        fabricCanvas.add(img);
      },
      fabricImageOptions
    );

    // add body
    fabric.Image.fromURL(
      this.props.bodyParts.body,
      img => {
        img.scale(0.2).set({ top: 200 });
        fabricCanvas.add(img);
      },
      fabricImageOptions
    );

    // add legs
    fabric.Image.fromURL(
      this.props.bodyParts.legs,
      img => {
        img.scale(0.2).set({ top: 400 });
        fabricCanvas.add(img);
      },
      fabricImageOptions
    );

    this.canvas = fabricCanvas;
  }

  handleButtonClick = () => {
    let cropRect = this.getMinimumBoundingRect(this.canvas.getObjects());
    this.saveAsPNG(this.canvas, cropRect);
  };

  /**
   * Get the bounding box that contains all given objects.
   * Returns a bounding box defined by a topLeft and bottomRight Point.
   * @param canvasObjects An array of fabric.Object
   */
  getMinimumBoundingRect = canvasObjects => {
    let topLeft = null;
    let bottomRight = null;
    for (let i = 0; i < canvasObjects.length; i++) {
      // Get bounding rect of current object
      let objBRect = canvasObjects[i].getBoundingRect();
      if (topLeft === null) {
        // Set topLeft instantly if it has no existing value
        topLeft = new fabric.Point(objBRect.left, objBRect.top);
      } else {
        if (topLeft.x > objBRect.left) {
          // update x of topLeft with smallest possible value
          topLeft.x = objBRect.left;
        }
        if (topLeft.y > objBRect.top) {
          // update y of topLeft with smallest possible value
          topLeft.y = objBRect.top;
        }
      }
      if (bottomRight === null) {
        // Set bottomRight instantly if it has no existing value
        bottomRight = new fabric.Point(
          objBRect.left + objBRect.width,
          objBRect.top + objBRect.height
        );
      } else {
        if (bottomRight.x < objBRect.left + objBRect.width) {
          // update x of bottomRight with largest possible value
          bottomRight.x = objBRect.left + objBRect.width;
        }
        if (bottomRight.y < objBRect.top + objBRect.height) {
          // update y of bottomRight with largest possible value
          bottomRight.y = objBRect.top + objBRect.height;
        }
      }
    }
    return { topLeft, bottomRight };
  };

  /**
   * Save the picture in PNG-format
   * @param {fabric.Canvas} canvas The canvas already containing the picture
   * @param {Object} cropRect A rect defined by a topLeft and bottomRight Point
   */
  saveAsPNG = (canvas, cropRect) => {
    // Get an image dataURL from the canvas
    var imageDataURL = canvas.toDataURL({
      // Options
      multiplier: 2,
      // following four is for cropping the image
      left : cropRect.topLeft.x,
      top: cropRect.topLeft.y,
      width: cropRect.bottomRight.x - cropRect.topLeft.x,
      height: cropRect.bottomRight.y - cropRect.topLeft.y
    });
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
        <canvas id="fabricCanvas" />
        <div id="stitchPictureButtonContainer">
          <button onClick={this.handleButtonClick}>Finished stitching</button>
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
