import React from 'react';
import {
  Icon,
} from 'semantic-ui-react';

import { PageTitle } from '../layouts';
import AdminProjectMenu from './AdminProjectMenu';

const AdminProjectTitle = ({project, linkTo}) =>
  <PageTitle
    linkTo={linkTo}
    left={<Icon name='angle left' />}
    middle={project.title}
    right={<AdminProjectMenu project={project} />}
    />

export default AdminProjectTitle