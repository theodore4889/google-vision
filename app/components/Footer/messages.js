/*
 * Footer Messages
 *
 * This contains all the text for the Footer component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  licenseMessage: {
    id: 'tedtools.components.Footer.license.message',
    defaultMessage: 'This project is licensed under the MIT license.',
  },
  authorMessage: {
    id: 'tedtools.components.Footer.author.message',
    defaultMessage: `
      Created by {author}.
    `,
  },
});
