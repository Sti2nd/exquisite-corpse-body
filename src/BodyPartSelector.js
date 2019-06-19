import React, { Component } from "react";
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
  // TODO: Merge this function and the identical one in Album.js ?
  componentDidMount() {
    // Get all images from db
    let imageArray = [];
    localforage
      .iterate((value, key, _iterationNumber) => {
        if (value.originalImageDataURL != null) {
          imageArray.push([key, value]);
        }
      })
      .then(() => {
        //console.log("Iteration through local db completed");
        if (imageArray.length > 0) {
          this.setState({ images: imageArray });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleSelectBodyParts = async () => {
    let selectedHeadImgID = document.querySelector(
      "#headSliderContainer .slick-center .imageBox"
    ).id;
    let selectedBodyImgID = document.querySelector(
      "#bodySliderContainer .slick-center .imageBox"
    ).id;
    let selectedLegsImgID = document.querySelector(
      "#legsSliderContainer .slick-center .imageBox"
    ).id;
    let headImg = await localforage.getItem(selectedHeadImgID).catch(err => {
      console.log(err);
    });
    let bodyImg = await localforage.getItem(selectedBodyImgID).catch(err => {
      console.log(err);
    });
    let legsImg = await localforage.getItem(selectedLegsImgID).catch(err => {
      console.log(err);
    });
    let headObject = headImg.bodyParts.head;
    let bodyObject = bodyImg.bodyParts.body;
    let legsObject = legsImg.bodyParts.legs;
    let greatestHeight = Math.max(
      headObject.height,
      bodyObject.height,
      legsObject.height
    );
    let bodyParts = {
      head: headObject,
      body: bodyObject,
      legs: legsObject,
      greatestHeight: greatestHeight
    };
    this.props.finishedSelecting(bodyParts);
  };

  render() {
    // Handle React Slick doesn't work when there are less images than the slidesToShow setting
    let slidesToShowSetting = 3;
    if (
      this.state !== null &&
      this.state.images.length <= slidesToShowSetting
    ) {
      slidesToShowSetting = 1; // This is safe because one can only get here with more than one image
    }

    let sliderSettings = {
      dots: true,
      arrows: true,
      infinite: true,
      speed: 300,
      slidesToShow: slidesToShowSetting,
      centerMode: true,
      swipeToSlide: true,
      focusOnSelect: true,
      nextArrow: <ArrowRight color="action" fontSize="large" />,
      prevArrow: <ArrowLeft color="action" fontSize="large" />,
      responsive: [
        {
          breakpoint: 400,
          settings: {
            slidesToShow: 1
          }
        }
      ]
    };

    return (
      <StyledBodyPartSelector>
        <Tooltip title="Back to front page">
          <IconButton
            className="cancelButton"
            onClick={this.props.cancelBodyPartSelector}
            variant="contained"
          >
            <BackIcon />
          </IconButton>
        </Tooltip>
        <h4>Select which body parts you want to mix</h4>
        <div id="headSliderContainer" className="sliderContainer">
          {this.state !== null ? (
            <Slider {...sliderSettings} afterChange={this.afterChangeHead}>
              {this.state.images.map(keyValuePairs => {
                return (
                  <div
                    className="imageBox"
                    key={keyValuePairs[0]}
                    id={keyValuePairs[0]}
                  >
                    <img
                      src={keyValuePairs[1].bodyParts.head.dataURL}
                      alt="stitched"
                    />
                  </div>
                );
              })}
            </Slider>
          ) : (
            <p>No images found</p>
          )}
        </div>
        <div id="bodySliderContainer" className="sliderContainer">
          {this.state !== null ? (
            <Slider {...sliderSettings}>
              {this.state.images.map(keyValuePairs => {
                return (
                  <div
                    className="imageBox"
                    key={keyValuePairs[0]}
                    id={keyValuePairs[0]}
                  >
                    <img
                      src={keyValuePairs[1].bodyParts.body.dataURL}
                      alt="stitched"
                    />
                  </div>
                );
              })}
            </Slider>
          ) : (
            <p>No images found</p>
          )}
        </div>
        <div id="legsSliderContainer" className="sliderContainer">
          {this.state !== null ? (
            <Slider {...sliderSettings}>
              {this.state.images.map(keyValuePairs => {
                return (
                  <div
                    className="imageBox"
                    key={keyValuePairs[0]}
                    id={keyValuePairs[0]}
                  >
                    <img
                      src={keyValuePairs[1].bodyParts.legs.dataURL}
                      alt="stitched"
                    />
                  </div>
                );
              })}
            </Slider>
          ) : (
            <p>No images found</p>
          )}
        </div>
        <Tooltip title="Use the selected body parts">
          <Button
            onClick={this.handleSelectBodyParts}
            id="selectBodyPartsButton"
            variant="contained"
            color="primary"
          >
            Continue
          </Button>
        </Tooltip>
      </StyledBodyPartSelector>
    );
  }
}

export default BodyPartSelector;

const StyledBodyPartSelector = styled.div.attrs({
  id: "StyledBodyPartSelector"
})`
  .slick-slide {
    filter: saturate(50%);
  }

  .slick-center {
    filter: saturate(100%);
    transition: all 0.3s ease;
    transform: scale(1.25);
  }

  .sliderContainer {
    max-width: 500px;
    /* Padding to allow for next and previous buttons */
    padding-left: calc(1em + 25px);
    padding-right: calc(1em + 25px);
    margin-right: auto;
    margin-left: auto;
  }

  .slick-prev:hover,
  .slick-prev:focus,
  .slick-next:hover,
  .slick-next:focus {
    color: black;
  }

  #headSliderContainer {
  }

  #bodySliderContainer {
    margin-top: 1em;
  }

  #legsSliderContainer {
    margin-top: 1em;
  }

  #selectBodyPartsButton {
    margin-top: 2.5em;
  }

  .imageBox {
  }

  .imageBox img {
    width: calc(100% - 2em);
    margin: 1em;
    /* Extra top margin to allow image to grow */
    margin-top: 2em;
  }

  h4 {
    margin-top: 2em;
  }
`;
