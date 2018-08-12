/*
 * VisionPage Messages
 *
 * This contains all the text for the VisionPage component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'tedtools.containers.VisionPage.header',
    defaultMessage: 'Computer Vision',
  },
  instructions: {
    id: 'tedtools.containers.VisionPage.instructions',
    defaultMessage: `Click the 'Capture Photo' button to send the current image to the Google Vision API.
    First, it will perform LABEL_DETECTION which will identify of the contents of the image.
    Then, depending on the labels found, it may perform additional analysis.
    For example, 'person' and 'face' labels will trigger a FACE_DETECTION analysis.
    FACE_DETECTION will try to analyze facial expressions (Joy, Sorrow, Surprise, and Anger).
    TEXT_DETECTION will lift text from documents.
    LOGO_DETECTION will try to identify company logos.`,
  },
});
