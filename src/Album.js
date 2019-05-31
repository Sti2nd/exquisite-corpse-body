import React, { Component } from "react";
import styled from "styled-components";

import ImageList from "./ImageList";

import localforage from "localforage";

class Album extends Component {
  componentDidMount() {
    let imageArray = [];
    localforage
      .iterate((value, key, iterationNumber) => {
        imageArray.push([key, value]);
      })
      .then(() => {
        console.log("Iteration through local db completed");
        if (imageArray.length > 0) {
          this.setState({ images: imageArray });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleDeleteImage = (imageKey) => {
    localforage.removeItem(imageKey, () => {
      let imagesAfterDelete = this.state.images.filter((keyValue) => {
        return keyValue[0] !== imageKey;
      })
      this.setState({images: imagesAfterDelete})
    }).catch((error) => {
      console.log(error)
    });
  }

  render() {
    return (
      <StyledAlbum>
        <h3>Your images</h3>
        {this.state !== null ? (
          <div id="imageBoxContainer">
            <ImageList
              images={this.state.images}
              handleDeleteImage={this.handleDeleteImage}
            />
          </div>
        ) : (
          <p>No images found</p>
        )}
      </StyledAlbum>
    );
  }
}

const StyledAlbum = styled.div.attrs({ id: "StyledAlbum" })`
  #imageBoxContainer {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
  }

  .imageBox {
    width: 10rem;
    height: 10rem;
    margin: 0.5em;
    position: relative;
  }

  .imageBox img {
    width: 100%;
    height: 100%;
    object-fit: scale-down;
    border: 1px solid grey;
  }
`;

export default Album;
