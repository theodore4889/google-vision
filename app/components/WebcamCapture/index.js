/**
 *
 * WebcamCapture.js
 *
 * A common button, if you pass it a prop "route" it'll render a link to a react-router route
 * otherwise it'll render a link with an onclick
 */

import React from 'react';
import Webcam from 'react-webcam';

class WebcamCapture extends React.Component {
  setRef = (webcam) => {
    this.webcam = webcam;
  }

  capture = () => {
    var imageSrc = this.webcam.getScreenshot();
    imageSrc = imageSrc.substring(imageSrc.indexOf("base64,") + 7);
    this.props.updateVisionReq(imageSrc);
  };

  render() {
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: 'user',
    };

    return (
      <div>
        <Webcam
          audio={false}
          height={250}
          ref={this.setRef}
          screenshotFormat="image/jpeg"
          width={350}
          videoConstraints={videoConstraints}
        />
        <br/>
        <button className="btn btn-default" onClick={this.capture}>Capture photo</button>
      </div>
    );
  }
}

export default WebcamCapture;
