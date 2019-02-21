import React, { Component } from "react";
import styled from "styled-components";
import { fabric } from "fabric/dist/fabric";

class Stitcher extends Component {
  constructor(props) {
    super(props);
    this.refs = {
      canvas: {}
    };
  }

  componentDidMount() {
    //TODO: recalculate height and width when browser windows resized?
    const fabricCanvas = new window.fabric.Canvas("fabricCanvas", {
      allowTouchScrolling: true,
      interactive: true,
      height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
      width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
    });

    // create a rectangle object
    var rect = new fabric.Rect({
      left: 100,
      top: 100,
      fill: "red",
      width: 20,
      height: 20
    });

    // "add" rectangle onto canvas
    fabricCanvas.add(rect);
  }

  render() {
    return (
      <StyledStitcher>
        <canvas
          id="fabricCanvas"
        />
      </StyledStitcher>
    );
  }
}

const StyledStitcher = styled.div.attrs({ id: "StyledStitcher" })`
 #fabricCanvas {
   width: 500px;
   height: 500px;
 }
`;

export default Stitcher;
