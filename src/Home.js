import React, { Component } from 'react';
import logo from './react.svg';
// import './Home.css';
import { Link } from 'react-router-dom';
import {
  Container,
  Header,
  Menu,
  Segment,
  Button,
  Image,
  Grid,
  Responsive,
  Card,
} from 'semantic-ui-react';
import { Helmet } from 'react-helmet';

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

const HomeCard = () =>
  <Card fluid={true}>
    <Card.Content>
      <Card.Description>
        whatever!!!!!!!!!!!!
      </Card.Description>
    </Card.Content>
  </Card>

const HomeCards = ({cols}) =>
  <Card.Group itemsPerRow={cols}>
    {Array.from({length: cols * 20}, (x,i) => <HomeCard key={i}/>)}
  </Card.Group>

const HomeSigninButton = () =>
  <Button inverted fluid>sign in</Button>

const HomePage = () =>
  <Grid stackable>
    <Grid.Column color="black" width={4}>
      <HomeTitle />
      <Responsive as={HomeSigninButton} {...Responsive.onlyTablet} />
      <Responsive as={HomeSigninButton} {...Responsive.onlyComputer} />
    </Grid.Column>
    <Grid.Column width={12}>
      <Responsive as={HomeCards} cols={1} {...Responsive.onlyMobile} />
      <Responsive as={HomeCards} cols={2} {...Responsive.onlyTablet} />
      <Responsive as={HomeCards} cols={3} {...Responsive.onlyComputer} />
    </Grid.Column>
    <Responsive as={Grid.Column} color="black" width={12} {...Responsive.onlyMobile}>
      <HomeSigninButton />
    </Responsive>
  </Grid>

class HomeRoute extends Component {
  static async getInitialProps({ req, res, match, history, location, ...ctx }) {
    return { whatever: 'stuff', customThing: ctx.customThing };
  }

  render() {
    return (
      <HomePage />
    )
  //   return (
  //     <div className="Home">
  //       <div className="Home-header">
  //         <img src={logo} className="Home-logo" alt="logo" />
  //         <h2>Welcome to After.js P: {this.props.whatever} CT: {this.props.customThing}</h2>
  //       </div>
  //       <p className="Home-intro">
  //         To get started, edit <code>src/Home.js</code> or{' '}
  //         <code>src/About.js</code>and save to reload.
  //       </p>
  //       <Link to="/about">About -></Link>
  //     </div>
  //   );
  }
}

export default HomeRoute;
