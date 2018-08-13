import React from 'react';
import {
  Menu,
  Segment,
  Header,
} from 'semantic-ui-react';

import AdminProjectMenu from './AdminProjectMenu';

import { withRouter } from 'react-router-dom';

const _QuickNav = ({history, linkTo, children}) =>
  <Menu secondary fluid widths={2} size='huge'>
    <Menu.Item name='BACK' icon='caret left' onClick={() => linkTo ? history.push(linkTo) : history.goBack()}/>
    <Menu.Item>
      {children}
    </Menu.Item>
  </Menu>

export const QuickNav = withRouter(_QuickNav)

// const _AdminProjectNav = ({history, project, linkTo}) =>
//   <Menu secondary fluid widths={2} size='huge'>
//     <Menu.Item name='BACK' icon='caret left' onClick={() => linkTo ? history.push(linkTo) : history.goBack()}/>
//     <Menu.Item>
//       <AdminProjectMenu project={project} />
//     </Menu.Item>
//   </Menu>

// export const AdminProjectNav = withRouter(_AdminProjectNav)

export const AdminProjectNav = ({project, linkTo}) =>
  <QuickNav linkTo={linkTo}>
    <AdminProjectMenu project={project} />
  </QuickNav>

const _AdminProjectTitle = ({project, linkTo, history}) =>
  <Segment basic style={{marginTop: '0 !important'}}>
    <Header as='h2' style={{fontSize: '1.5rem', color: '#888'}}>{project.sourceGroup}</Header>
    <Header as='h1' style={{fontSize: '2.5rem'}}>{project.title}</Header>
  </Segment>

const AdminProjectTitle = withRouter(_AdminProjectTitle)
export default AdminProjectTitle