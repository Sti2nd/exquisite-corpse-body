import React, { Component, Fragment } from "react";
import styled from "styled-components";
import localforage from "localforage";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import BackIcon from "@material-ui/icons/ArrowBackIos";
import Tooltip from "@material-ui/core/Tooltip";
import ArrowRight from "@material-ui/icons/ArrowRight";
import ArrowLeft from "@material-ui/icons/ArrowLeft";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class BodyPartSelector extends Component {
  // TODO: Merge this function and the identical one in Album.js
  componentDidMount() {
    // Get all images from db
    let imageArray = [];
    localforage
      .iterate((value, key, _iterationNumber) => {
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

  exitBodyPartSelector = () => {
    this.props.exitBodyPartSelector();
  };

  nextHead = () => {
    this.headSlider.slickNext();
  };

  previousHead = () => {
    this.headSlider.slickPrev();
  };

  render() {
    let sliderSettings = {
      dots: true,
      arrows: true,
      infinite: true,
      speed: 300,
      slidesToShow: 3,
      centerMode: true,
      className: "center",
      swipeToSlide: true,
      focusOnSelect: true,
      nextArrow: <ArrowRight color="action" />,
      prevArrow: <ArrowLeft color="action" />
    };

    return (
      <StyledBodyPartSelector>
        <Tooltip title="Back to front page">
          <IconButton
            className="exitButton"
            onClick={this.props.exitBodyPartSelector}
            variant="contained"
          >
            <BackIcon />
          </IconButton>
        </Tooltip>
        <div id="headSliderContainer">
          {this.state !== null ? (
            <Slider {...sliderSettings}>
              {this.state.images.map(keyValuePairs => {
                return (
                  <div className="imageBox" key={keyValuePairs[0]} id={keyValuePairs[0]}>
                    <img src={keyValuePairs[1].stitchedImageDataURL} alt="stitched" />
                  </div>
                )})
              }
            </Slider>
          ) : (
            <p>No images found</p>
          )}
        </div>
      </StyledBodyPartSelector>
    );
  }
}

export default BodyPartSelector;

const StyledBodyPartSelector = styled.div.attrs({
  id: "StyledBodyPartSelector"
})`
  #headSliderContainer {
    max-width: 500px;
    margin: auto;
    margin-top: 1em;
  }

  .imageBox img {
    width: 95%;
  }
`;
