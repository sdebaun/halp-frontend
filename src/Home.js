import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Header,
  Button,
  Image,
  Grid,
  Card,
} from 'semantic-ui-react';
import { Helmet } from 'react-helmet';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { LeftMenuLayout, ResponsiveSwitcher, cardsFrom } from './layouts';

export const QUERY_ACTIVE_PROJECTS = gql`
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

const ButtonSignin = () =>
  <Link to={'/signin'}>
    <Button inverted fluid>sign in to admin</Button>
  </Link>

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
      <ResponsiveSwitcher
        mobile={<Card.Group itemsPerRow={1}>{cardsFrom(HomeCard, activeProjects)}</Card.Group>}
        tablet={<Card.Group itemsPerRow={2}>{cardsFrom(HomeCard, activeProjects)}</Card.Group>}
        computer={<Card.Group itemsPerRow={3}>{cardsFrom(HomeCard, activeProjects)}</Card.Group>}
        />
    }
  </Query>

const HomeTitleLarge = () =>
  <Header as="h1" size="huge" icon textAlign="center" inverted color="grey">
    <Image verticalAlign='top' src="logo.jpeg" style={{width: '100%'}} centered />
    <p>work for<br/>the man</p>
  </Header>

const HomeTitleSmall = () =>
  <Header as="h1" size="small" icon textAlign="center" inverted color="grey">
    <Image verticalAlign='top' src="logo.jpeg" size="tiny" centered />
    <p>work for<br/>the man</p>
  </Header>

const HomeTitle = () =>
  <ResponsiveSwitcher
      mobile={<HomeTitleSmall />}
      tablet={<HomeTitleLarge />}
      computer={<HomeTitleLarge />}
      />

const HomeHelmet = () =>
  <Helmet>
    <title>Work for the Man</title>
  </Helmet>

const HomeSplash = () =>
  <div>
    <HomeTitle />
    <ButtonSignin />
  </div>

const HomePageMobile = () =>
  <Grid stackable>
    <Grid.Column style={{backgroundColor: '#000'}}>
      <HomeTitle />
    </Grid.Column>
    <Grid.Column style={{minHeight: '100%'}}>
      <HomeCards />
    </Grid.Column>
    <Grid.Column style={{backgroundColor: '#000'}}>
      <ButtonSignin />
    </Grid.Column>
  </Grid>

const HomePageLarge = () =>
  <LeftMenuLayout left={<HomeSplash />} right={<HomeCards />} />

class HomePage extends Component {
  static async getInitialProps({ req, res, match, history, location, ...ctx }) {
    return { whatever: 'stuff', customThing: ctx.customThing };
  }

  render() {
    return (
      <div style={{height: '100%'}}>
        <HomeHelmet />
        <ResponsiveSwitcher
          mobile={<HomePageMobile />}
          tablet={<HomePageLarge />}
          computer={<HomePageLarge />}
          />
      </div>      
    )
  }
}

export default HomePage;
