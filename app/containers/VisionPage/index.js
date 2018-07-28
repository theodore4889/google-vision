/*
 * VisionPage
 *
 * List all the features
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import axios from 'axios';

import H1 from 'components/H1';
import WebcamCapture from 'components/WebcamCapture';
import VisionResponseList from 'components/VisionResponseList';

import messages from './messages';

const BASE_URL = 'https://content-vision.googleapis.com';
const API_KEY = 'AIzaSyAs_J7_OKhpcBOMoW8n1ZJyEW7gnJcPQXk';

// Imports the Google Cloud client library
// const vision = require('@google-cloud/vision');
// const client = new vision.ImageAnnotatorClient();  // Creates a client

const DET_LABEL = 'LABEL_DETECTION';
const DET_FACE = 'FACE_DETECTION';

export default class VisionPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visionArray: [],
    };

    this.initItem = this.initItem.bind(this);
    this.likelihoodToScore = this.likelihoodToScore.bind(this);
    this.buildVisionArray = this.buildVisionArray.bind(this);
    this.evaluateItem = this.evaluateItem.bind(this);
    this.queryVision = this.queryVision.bind(this);
  }

  /*
  componentDidMount() {

  } */

  initItem(description, score) {
    return {
      description,
      score: this.likelihoodToScore(score),
    };
  }

  likelihoodToScore(likelihood) {
    switch (likelihood) {
      case 'VERY_UNLIKELY':
        return 0.0;
      case 'UNLIKELY':
        return 0.25;
      case 'LIKELY':
        return 0.75;
      case 'VERY_LIKELY':
        return 1.0;
      default:
        return 0.0;
    }
  }

  buildVisionArray(response, detectType) {
    let visionArray;

    if (detectType === DET_LABEL) {
      visionArray = response.labelAnnotations;
    } else if (detectType === DET_FACE) {
      const annotation = response.faceAnnotations[0];

      visionArray = [
        this.initItem('Anger', annotation.angerLikelihood),
        this.initItem('Joy', annotation.joyLikelihood),
        this.initItem('Sorrow', annotation.sorrowLikelihood),
        this.initItem('Surprise', annotation.surpriseLikelihood),
      ];
    }

    return visionArray;
  }

  evaluateItem(item) {
    switch (item.description) {
      case 'person':
      case 'human':
      case 'head':
      case 'face':
      case 'boy':
      case 'girl':
        return DET_FACE;
      default:
        return null;
    }
  }

  queryVision(imageSrc, detectType) {
    const request = {
      requests: [
        {
          features: [{ type: detectType }],
          image: { content: imageSrc },
        },
      ],
    };

    axios
      .post(`${BASE_URL}/v1/images:annotate?alt=json&key=${API_KEY}`, request)
      .then(res => {
        const response = res.data.responses[0];
        const visionArray = this.buildVisionArray(response, detectType);

        // console.log("res", res);
        // console.log("Response", response);
        // console.log("Vision Array", visionArray);

        this.setState({
          visionArray: this.state.visionArray.concat(visionArray),
        });

        // const now = d.getTime();

        for (let i = 0; i < visionArray.length; i += 1) {
          const item = visionArray[i];
          // visionArray[i].key = `${now}_${i}`;

          const newDetectType = this.evaluateItem(item);
          // console.log("new type" , newDetectType);

          if (newDetectType) {
            this.queryVision(imageSrc, newDetectType);
            break;
          }
        }
      })
      .then(() => {
        // callback();
      });
  }

  /*
  shouldComponentUpdate() {
    return false;
  }
  */

  render() {
    return (
      <div>
        <Helmet>
          <title>Vision</title>
          <meta
            name="description"
            content="Playing around with Google Vision"
          />
        </Helmet>
        <H1>
          <FormattedMessage {...messages.header} />
        </H1>
        <WebcamCapture onCapture={this.queryVision} />
        <VisionResponseList items={this.state.visionArray} />
        <br />
      </div>
    );
  }
}
