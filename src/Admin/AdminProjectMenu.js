import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import {
  Dropdown,
  Menu,
} from 'semantic-ui-react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import { MUTATION_COPY_PROJECT, MUTATION_DELETE_PROJECT, refetchAll } from '../api/projects';

const _DropdownItemDelete = ({project, history}) =>
  <Mutation mutation={MUTATION_DELETE_PROJECT} refetchQueries={refetchAll}>
    {deleteProject => {
      const onClick = () => {
        const variables = {
          id: project.id,
        }
        deleteProject({variables})
          .then(({data}) => {history.push(`/admin`)})
      }
      return <Dropdown.Item icon='trash' text='delete' onClick={onClick}/>
    }}
  </Mutation>

const _DropdownItemCopy = ({project, history}) =>
  <Mutation mutation={MUTATION_COPY_PROJECT} refetchQueries={refetchAll}>
    {copyProject => {
      const onClick = () => {
        const variables = {
          id: project.id
        }
        copyProject({variables})
          .then(({data: {copyProject: result}}) => {history.push(`/admin/project/${result.id}`)})
      }
      return <Dropdown.Item icon='copy' text='copy' onClick={onClick}/>
    }}
  </Mutation>

const DropdownItemDelete = withRouter(_DropdownItemDelete)
const DropdownItemCopy = withRouter(_DropdownItemCopy)

const AdminProjectMenu = ({project}) =>
  <Menu text style={{minHeight: 0, padding: 0, paddingRight: '12px', margin: 0}}>
    <Menu.Menu position='right'>
      <Dropdown icon='ellipsis vertical'>
        <Dropdown.Menu>
          <Dropdown.Item as={Link} to={`/admin/project/${project.id}/edit`} icon='edit' text='edit' />
          <Dropdown.Item icon='close' text='close' />
          <DropdownItemCopy project={project}/>
          <DropdownItemDelete project={project}/>
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Menu>
  </Menu>

export default AdminProjectMenu;