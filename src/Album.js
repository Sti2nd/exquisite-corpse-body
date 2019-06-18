import React, { Component } from "react";
import styled from "styled-components";

import ImageList from "./ImageList";

import localforage from "localforage";

class Album extends Component {
  componentDidMount() {
    // Get all images from db
    let imageArray = [];
    localforage
      .iterate((value, key, _iterationNumber) => {
        if (
          this.props.type === "stitched" &&
          value.stitchedImageDataURL != null
        ) {
          imageArray.push([key, value]);
        } else if (
          this.props.type === "original" &&
          value.originalImageDataURL != null
        ) {
          imageArray.push([key, value]);
        }
      })
      .then(() => {
        if (imageArray.length > 0) {
          this.setState({ images: imageArray }, () => {
            this.storeNumImgs(imageArray.length);
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  /**
   * Delete image from database and keep Album state consistent
   */
  handleDeleteImage = imageKey => {
    localforage
      .removeItem(imageKey, () => {
        let imagesAfterDelete = this.state.images.filter(keyValue => {
          return keyValue[0] !== imageKey;
        });
        this.setState({ images: imagesAfterDelete }, () => {
          this.storeNumImgs(imagesAfterDelete.length);
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  /**
   * Pass number of images to parent component
   */
  storeNumImgs = number => {
    // If state exists
    if (this.state && this.props.setNumOriginalsInDatabase) {
      this.props.setNumOriginalsInDatabase(number);
    }
  };

  render() {
    return (
      <StyledAlbum>
        <h3>{this.props.title}</h3>
        {this.state !== null ? (
          <div id="imageBoxContainer">
            <ImageList
              images={this.state.images}
              type={this.props.type}
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
