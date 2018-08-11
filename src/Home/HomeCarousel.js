import React from 'react';
import { Link } from 'react-router-dom';
import {
  Grid,
  Header,
  Icon,
  Button,
} from 'semantic-ui-react';
import Slider from 'react-slick';
import { Query } from 'react-apollo';
import { QUERY_ACTIVE_PROJECTS_DETAILED } from '../api/projects';

const HomeSlide = ({project}) =>
  <div style={{backgroundColor: 'white'}} style={{margin: '0px 20px'}}>
  <Header as='h1'>{project.title}</Header>
  </div>

const SETTINGS = {
    adaptiveHeight: true,
    autoplay: true,
    // centerMode: true,
    infinite: true,
    dots: true,
  }
  
const HomeCarousel = () =>
  <div style={{padding: '40px'}}>
  <Query query={QUERY_ACTIVE_PROJECTS_DETAILED}>
    {({ loading, data: { projectsActive } }) => {
      if (loading) { return <div>LOADING...</div> }
      return <Slider {...SETTINGS}>
        { projectsActive.map(project => <HomeSlide key={project.id} project={project}/>)}
      </Slider>
    }}
  </Query>
</div>
export default HomeCarousel