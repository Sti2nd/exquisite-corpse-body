import React, { Component, Fragment } from "react";
import styled from "styled-components";
import localforage from "localforage";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import BackIcon from "@material-ui/icons/ArrowBackIos";
import ArrowRight from "@material-ui/icons/ArrowRight";
import ArrowLeft from "@material-ui/icons/ArrowLeft";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function NextArrow(props) {
  const { className, onClick } = props;
  return (
    <IconButton className={className} onClick={onClick} variant="contained">
      <ArrowRight />
    </IconButton>
  );
}

function PreviousArrow(props) {
  const { className, onClick } = props;
  return (
    <IconButton className={className} onClick={onClick} variant="contained">
      <ArrowLeft />
    </IconButton>
  );
}

class BodyPartSelector extends Component {
  exitBodyPartSelector = () => {
    this.props.exitBodyPartSelector();
  };

  nextHead = () => {
    this.headSlider.slickNext()
  }

  previousHead = () => {
    this.headSlider.slickPrev()
  }

  render() {
    let sliderSettings = {
      dots: true,
      arrows: true,
      infinite: true,
      speed: 300,
      slidesToShow: 3,
      centerMode: true,
      swipeToSlide: true,
      focusOnSelect: true,
      nextArrow: <ArrowRight color="action"/>,
      prevArrow: <ArrowLeft color="action"/>
    };
    return (
      <StyledBodyPartSelector>
        <IconButton
          className="exitButton"
          onClick={this.props.exitBodyPartSelector}
          variant="contained"
        >
          <BackIcon />
        </IconButton>
        <div id="headSliderContainer">
          <Slider {...sliderSettings}>
            <div>
              <h3>1</h3>
            </div>
            <div>
              <h3>2</h3>
            </div>
            <div>
              <h3>3</h3>
            </div>
            <div>
              <h3>4</h3>
            </div>
          </Slider>
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
    margin: auto
  }
`;
