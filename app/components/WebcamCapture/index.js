/**
 *
 * WebcamCapture.js
 *
 * A common button, if you pass it a prop "route" it'll render a link to a react-router route
 * otherwise it'll render a link with an onclick
 */

import React from 'react';
import Webcam from 'react-webcam';
import PropTypes from 'prop-types';

class WebcamCapture extends React.Component {
  setRef = webcam => {
    this.webcam = webcam;
  };

  capture = () => {
    let imageSrc = this.webcam.getScreenshot();
    imageSrc = imageSrc.substring(imageSrc.indexOf('base64,') + 7);

    this.props.onCapture(imageSrc, 'LABEL_DETECTION');
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
          height={200}
          ref={this.setRef}
          screenshotFormat="image/jpeg"
          width={350}
          videoConstraints={videoConstraints}
        />
        <br />
        <button
          type="button"
          className="btn btn-primary"
          onClick={this.capture}
        >
          Capture Photo
        </button>
      </div>
    );
  }
}

WebcamCapture.propTypes = {
  onCapture: PropTypes.func,
};

export default WebcamCapture;
