import React, { Component } from 'react';
// import logo from './react.svg';
// import './Home.css';
// import { Link } from 'react-router-dom';
import {
  // Container,
  Header,
  // Menu,
  // Segment,
  Button,
  Image,
  Grid,
  Responsive,
  Card,
} from 'semantic-ui-react';
import { Helmet } from 'react-helmet';

const MOCK_CARD = {
  sourceGroup: 'Temple Guardians',
  title: 'Defend the Temple',
  description: 'Help defend the temple against invasion by evil space aliens that want to steal our pants.',
  needDate: 'Sunday 30 Aug',
  needStart: '10a',
  needEnd: '2p',
}

const HomeTitle = () =>
  <div>
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
  <Card.Group itemsPerRow={cols}>
    {Array.from({length: cols * 20}, (x,i) => <HomeCard key={i} item={MOCK_CARD}/>)}
  </Card.Group>

const HomeSigninButton = () =>
  <Button inverted fluid>sign in</Button>

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
