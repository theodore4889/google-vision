import React from 'react';
import { FormattedMessage } from 'react-intl';

import A from 'components/A';
import LocaleToggle from 'containers/LocaleToggle';
import Wrapper from './Wrapper';
import messages from './messages';

function Footer() {
  return (
    <Wrapper>
      <section>
        <FormattedMessage {...messages.licenseMessage} />
      </section>
      <section>
        <LocaleToggle />
      </section>
      <section>
        <FormattedMessage
          {...messages.authorMessage}
          values={{
            author: (
              <A href="https://www.linkedin.com/in/theodore-lano-b5a34723/">
                Teddy Lano
              </A>
            ),
          }}
        />
      </section>
    </Wrapper>
  );
}

export default Footer;
