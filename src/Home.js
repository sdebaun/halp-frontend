import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Header,
  Button,
  Image,
  Grid,
  Responsive,
  Card,
} from 'semantic-ui-react';
import { Helmet } from 'react-helmet';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const QUERY_ACTIVE_PROJECTS = gql`
  query ActiveProjects {
    activeProjects @client {
      title
      sourceGroup
      description
      needDate
      needStart
      needEnd
    }
  }
`

const HomeTitle = () =>
  <div style={{paddingBottom: '2rem'}}>
    <Helmet>
      <title>Work for the Man</title>
    </Helmet>
    <Image src="logo.jpeg" size="medium" centered />
    <Header as="h1" size="huge" textAlign="center" inverted color="grey">
      work for<br/>the man
    </Header>
  </div>

const HomeCard = ({item: {sourceGroup, title, description, needDate, needStart, needEnd}}) =>
  <Card fluid={true}>
    <Card.Content header={title} meta={sourceGroup} description={description}/>
    <Card.Content extra>
      {needDate}<br/>
      {needStart} - {needEnd}
    </Card.Content>
  </Card>

const HomeCards = ({cols}) =>
  <Query query={QUERY_ACTIVE_PROJECTS}>
    {({ data: { activeProjects } }) => 
      <Card.Group itemsPerRow={cols}>
        {activeProjects.map((p, idx) => <HomeCard key={idx} item={p}/>)}
      </Card.Group>        
    }
  </Query>

const HomeSigninButton = () =>
  <Link to={'/signin'}>
    <Button inverted fluid>sign in to admin</Button>
  </Link>

const HomePage = () =>
  <Grid stackable>
    <Grid.Column width={4} style={{backgroundColor: '#000', paddingLeft: '3rem'}}>
      <HomeTitle />
      <Responsive as={HomeSigninButton} {...Responsive.onlyTablet} />
      <Responsive as={HomeSigninButton} {...Responsive.onlyComputer} />
    </Grid.Column>
    <Grid.Column width={12}>
      <Responsive as={HomeCards} cols={1} {...Responsive.onlyMobile} />
      <Responsive as={HomeCards} cols={2} {...Responsive.onlyTablet} />
      <Responsive as={HomeCards} cols={3} {...Responsive.onlyComputer} />
    </Grid.Column>
    <Responsive as={Grid.Column} width={12} {...Responsive.onlyMobile} style={{backgroundColor: '#000'}}>
      <HomeSigninButton />
    </Responsive>
  </Grid>

class HomeRoute extends Component {
  static async getInitialProps({ req, res, match, history, location, ...ctx }) {
    return { whatever: 'stuff', customThing: ctx.customThing };
  }

  render() {
    return <HomePage />
  }
}

export default HomeRoute;
