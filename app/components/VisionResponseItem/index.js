/**
 *
 * VisionResponseItem.js
 *
 */

import React from 'react';
import ReactJson from 'react-json-view'

import axios from 'axios'

const BASE_URL = "https://content-vision.googleapis.com";
const API_KEY = "AIzaSyAs_J7_OKhpcBOMoW8n1ZJyEW7gnJcPQXk";

class VideoResponseItem extends React.Component {
  constructor(props){
    console.log('[START] VisionResponseItem Constructor');
    super(props);

    console.log('[END] VisionResponseItem Constructor');
  }

  render() {
    return (
      <div>
        <ReactJson src={this.props.resp} />
      </div>
    );
  }
}

export default VideoResponseItem;
