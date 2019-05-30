import React, { Component } from "react";
import styled from "styled-components";

import ImageList from "./ImageList";

import localforage from "localforage";

class Album extends Component {
  componentDidMount(){
    let imageArray = []
    localforage.iterate((value, key, iterationNumber) => {
      imageArray.push([key, value]);
      console.log(iterationNumber)
    }).then(() => {
      console.log("Iteration through local db completed")
      if (imageArray.length > 0){
        this.setState({images: imageArray});
      }
    }).catch((err) => {
      console.log(err)
    });
  }

  render() {
    return (
      <StyledAlbum>
        <h3>Your images</h3>
        {this.state !== null ? 
          <ImageList images={this.state.images}/>
         : 
          <p>No images found</p>
        }
      </StyledAlbum>
    )
  }

}

const StyledAlbum = styled.div.attrs({ id: "StyledAlbum" })`
`;

export default Album;