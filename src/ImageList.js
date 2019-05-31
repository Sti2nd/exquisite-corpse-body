import React from "react";
import ImageMenu from "./ImageMenu";

function ImageList(props) {
  const imageKVs = props.images;

  function handleDeleteImage(imageKey){
    props.handleDeleteImage(imageKey);
  }

  const imageItems = imageKVs.map(keyValuePairs => {
    return (
      <div className="imageBox" key={keyValuePairs[0]} id={keyValuePairs[0]}>
        <ImageMenu handleDeleteImg={handleDeleteImage}/>
        <img src={keyValuePairs[1].stitchedImageDataURL} alt="stitched" />
      </div>
    );
  });

  return <React.Fragment>{imageItems}</React.Fragment>;
}

export default ImageList;
