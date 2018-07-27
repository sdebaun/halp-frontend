import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import {
  Header,
  Button,
  Card,
  Menu,
  Icon,
  Label,
} from 'semantic-ui-react';
import { Helmet } from 'react-helmet';
import { LeftMenuLayout, DrawerMenuLayout, ResponsiveSwitcher, cardsFrom } from '../layouts';

import { QUERY_ACTIVE_PROJECTS } from '../Home/HomeCards'
import { Query } from 'react-apollo'

const AdminCard = ({item: {id, sourceGroup, title, description, needDate, needStart, needEnd}}) =>
  <Card as={Link} to={`/admin/project/${id}`} fluid={true}>
    <Card.Content header={title} meta={sourceGroup} description={description}/>
    <Card.Content extra>
      {needDate}<br/>
      {needStart} - {needEnd}
    </Card.Content>
  </Card>

const AdminCards = ({cols}) =>
  <Query query={QUERY_ACTIVE_PROJECTS}>
    {({ loading, data: { activeProjects } }) => {
      if (loading) { return <div>LOADING...</div> }
      return <ResponsiveSwitcher
        mobile={<Card.Group itemsPerRow={1}>{cardsFrom(AdminCard, activeProjects)}</Card.Group>}
        tablet={<Card.Group itemsPerRow={2}>{cardsFrom(AdminCard, activeProjects)}</Card.Group>}
        computer={<Card.Group itemsPerRow={3}>{cardsFrom(AdminCard, activeProjects)}</Card.Group>}
        />
    }}
  </Query>

export default AdminCards