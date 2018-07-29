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
const DET_TEXT = 'TEXT_DETECTION';

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
    this.onCapture = this.onCapture.bind(this);
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
    console.log('LIKELIHOOD', likelihood);
    switch (likelihood) {
      case 'VERY_UNLIKELY':
        return 0.0;
      case 'UNLIKELY':
        return 0.25;
      case 'POSSIBLE':
        return 0.5;
      case 'LIKELY':
        return 0.75;
      case 'VERY_LIKELY':
        return 1.0;
      default:
        return likelihood;
    }
  }

  buildVisionArray(response, detectType) {
    console.log('detectType:', detectType, ', response:', response);
    let visionArray = [this.initItem(detectType, -1.0)];

    if (detectType === DET_LABEL) {
      visionArray = visionArray.concat(response.labelAnnotations);
    } else if (detectType === DET_FACE) {
      const annotation = response.faceAnnotations[0];

      visionArray = visionArray.concat([
        this.initItem('Anger', annotation.angerLikelihood),
        this.initItem('Joy', annotation.joyLikelihood),
        this.initItem('Sorrow', annotation.sorrowLikelihood),
        this.initItem('Surprise', annotation.surpriseLikelihood),
      ]);
    } else if (detectType === DET_TEXT) {
      visionArray = visionArray.concat([
        this.initItem(`TEXT: ${response.fullTextAnnotation.text}`, null),
      ]);
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
      case 'text':
      case 'document':
      case 'paper':
      case 'ticket':
        return DET_TEXT;
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

  onCapture(imageSrc, detectType) {
    this.setState({
      visionArray: [],
    });

    this.queryVision(imageSrc, detectType);
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
        <div className="container">
          <div className="row">
            <div className="col">
              <WebcamCapture onCapture={this.onCapture} />
            </div>
            <div className="col">
              <VisionResponseList items={this.state.visionArray} />
            </div>
          </div>
        </div>
        <br />
      </div>
    );
  }
}
