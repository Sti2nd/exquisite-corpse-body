import React from "react";
import ImageMenu from "./ImageMenu";

function ImageList(props) {
  const imageKVs = props.images;

  function handleDeleteImage(imageKey){
    props.handleDeleteImage(imageKey);
  }

  const imageItems = imageKVs.map(keyValuePairs => {

    let imageHTML = null;
    if (props.type === "stitched"){
      imageHTML = <img src={keyValuePairs[1].stitchedImageDataURL} alt="stitched" />
    } else if (props.type === "original"){
      imageHTML = <img src={keyValuePairs[1].originalImageDataURL} alt="stitched" />
    }

    return (
      <div className="imageBox" key={keyValuePairs[0]} id={keyValuePairs[0]}>
        <ImageMenu handleDeleteImg={handleDeleteImage}/>
        {imageHTML}
      </div>
    );
  });

  return <React.Fragment>{imageItems}</React.Fragment>;
}

export default ImageList;
