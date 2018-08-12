import React from 'react';

import {
  Segment,
  Icon,
  Header,
} from 'semantic-ui-react';

const DeliveryContact = ({contactName, contactAddress}) =>
<Segment basic>
  <Header as='h4'>
    <Icon name='user'/>
    <Header.Content>
      {contactName}
      <Header.Subheader>{contactAddress}</Header.Subheader>
    </Header.Content>
  </Header>
</Segment>

export default DeliveryContact