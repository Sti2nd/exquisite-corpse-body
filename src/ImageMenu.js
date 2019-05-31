import React from "react";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import styled from "styled-components";

function ImageMenu(props) {
  // The below is a hook! it allows us to use state in functional components
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleDelete() {
    // TODO: Confirm with dialog/alert before deleting
    let imageKey = anchorEl.parentNode.parentNode.id + "";
    setAnchorEl(null);
    props.handleDeleteImg(imageKey);
  }

  return (
    <StyledImageMenu>
      <IconButton
        aria-label="Options"
        aria-controls="image-menu"
        aria-haspopup="true"
        onClick={handleClick}
        size="small"
        className="imageOptionButton"
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="image-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
        <MenuItem onClick={handleClose}>Save</MenuItem>
      </Menu>
    </StyledImageMenu>
  );
}

export default ImageMenu;

const StyledImageMenu = styled.div.attrs({ id: "StyledImageMenu" })`
  .imageOptionButton {
    position: absolute;
    right: 0;
  }
`;