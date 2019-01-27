import React, { Component } from 'react';
import Camera from './Camera';
import styled from "styled-components";



const StyledApp = styled.div.attrs({id : "StyledApp"})`
.App {
  text-align: center;
}

.App-logo {
  animation: App-logo-spin infinite 20s linear;
  height: 40vmin;
}

.App-header {
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
}

.App-link {
  color: #61dafb;
}

@keyframes App-logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
`




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

export default App;
