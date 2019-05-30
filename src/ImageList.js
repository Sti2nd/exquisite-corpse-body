import React from "react";

function ImageList(props){
  const imageKVs = props.images;
  const imageItems = imageKVs.map((keyValuePairs) => {
    console.log(keyValuePairs);
    return <img
      key={keyValuePairs[0]}
      src={keyValuePairs[1].originalImageDataURL}
      alt="stitched"
    /> 
  });

  return (
    <React.Fragment>
      {imageItems}
    </React.Fragment>
  );
}

export default ImageList;