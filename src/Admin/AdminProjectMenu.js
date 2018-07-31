import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import {
  Dropdown,
  Menu,
} from 'semantic-ui-react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import { MUTATION_CREATE_PROJECT } from './AdminAddProject';

const MUTATION_DELETE_PROJECT = gql`
  mutation deleteProject($id: String!) {
    deleteProject(id: $id) @client
  }
`

const _DropdownItemDelete = ({project, history}) =>
  <Mutation mutation={MUTATION_DELETE_PROJECT} refetchQueries={['AllProjects', 'activeProjects', 'projectCounts']}>
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
  <Mutation mutation={MUTATION_CREATE_PROJECT} refetchQueries={['AllProjects', 'activeProjects', 'projectCounts']}>
    {createProject => {
      const onClick = () => {
        const variables = {
          ...project,
          title: `Copy of ${project.title}`,
        }
        createProject({variables})
          .then(({data: {createProject: result}}) => {history.push(`/admin/project/${result.id}`)})
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