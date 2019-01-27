import React, { Component } from 'react';
import Camera from './Camera';
import styled from "styled-components";




class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      view : "app"
    }
  }

  handleButtonClick = () =>{
    this.setState({view : "camera"})
  }

  render() {
    return (
      <StyledApp>
        <div className="App">
          {this.state.view === "app" ? 
            <button onClick={this.handleButtonClick} id="startCameraButton">Click to start camera</button>
            : null }
          {this.state.view === "camera" ? 
            <Camera className="yolo"/> 
            : null }
          <a id="downloadButton" href="#" download="mix-max.png" hidden>Download picture</a>
        </div>
      </StyledApp>
    )
  }
}





const StyledApp = styled.div.attrs({id : "StyledApp"})`
.App {
  text-align: center;
}

button {
  font-size: 1.2rem;
  border-radius: 0.5rem;
  padding: 0.4rem;
  margin: 0.5rem;
  background-color: khaki;
}
`




export default App;
