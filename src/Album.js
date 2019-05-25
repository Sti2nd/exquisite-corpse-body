import React, { Component } from "react";
import styled from "styled-components";

import localforage from "localforage";

class Album extends Component {

  componentDidMount(){
    localforage.iterate((value, key, iterationNumber) => {
      

      // Remember iterate supports early exist -> can get the x first elements
    })
  }

  render() {
    return (
      <StyledAlbum>
        <h3>Your images</h3>
        <img
          src={this.state.stitchedImageDataURL}
          alt=""
          style={{ maxWidth: "100%", border: "1px solid black" }}
        />
      </StyledAlbum>
    )
  }

}

const StyledAlbum = styled.div.attrs({ id: "StyledApp" })`
`;

export default Album;