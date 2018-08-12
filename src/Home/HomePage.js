import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import {
  Header,
  Button,
  Image,
  Grid,
} from 'semantic-ui-react';
import { Helmet } from 'react-helmet';
import { LeftMenuLayout, ResponsiveSwitcher } from '../layouts';

import HomeCards from './HomeCards';
import HomeProject from './HomeProject';
import HomeCarousel from './HomeCarousel';

const ButtonSignin = () =>
  <Button as={Link} to={'/signin'} inverted fluid>sign in to admin</Button>

const HomeContent = () =>
  <div>
    <Route path='/' exact render={() =>
      <HomeCarousel />
      } />
    <Route path='/help/:id' render={({match: {params: {id}}}) =>
      <HomeProject id={id}/>
      } />
  </div>

const HomeTitleLarge = () =>
  <Header as="h1" size="huge" icon textAlign="center" inverted color="grey" style={{fontSize: '5rem'}}>
    <Image verticalAlign='top' src="/logo.jpeg" style={{width: '100%'}} centered />
    <p style={{paddingBottom: '4rem'}}>
      what do<br/>
      you want<br/>
      to HALP<br/>
      with?
    </p>
  </Header>

const HomeTitleSmall = () =>
  <Header as="h1" size="small" icon textAlign="center" inverted color="grey">
    <Image verticalAlign='top' src="/logo.jpeg" size="tiny" centered />
    <p>what do you want to HALP with?</p>
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
      <HomeContent />
    </Grid.Column>
    <Grid.Column style={{backgroundColor: '#000'}}>
      <ButtonSignin />
    </Grid.Column>
  </Grid>

const HomePageLarge = () =>
  <LeftMenuLayout left={<HomeSplash />} right={<HomeContent />} />

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