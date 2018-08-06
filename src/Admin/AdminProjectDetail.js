import React from 'react';
import moment from 'moment';
import Moment from 'react-moment';
import { Mutation } from 'react-apollo';
import {
  MUTATION_ADD_PROJECT_DETAIL,
  MUTATION_DELETE_PROJECT_DETAIL,
  MUTATION_UPDATE_PROJECT_DETAIL,
  MUTATION_ADD_PROJECT_SENTPERSON,
  MUTATION_DELETE_PROJECT_SENTPERSON,
  MUTATION_UPDATE_PROJECT_SENTPERSON,
  refetchSpecific
} from '../api/projects';
import { Toggle } from 'react-powerplug';

import {
  Grid,
  Step,
  Statistic,
  Segment,
  Icon,
  Header,
  List,
  Button,
} from 'semantic-ui-react';

import AdminProjectTitle from './AdminProjectTitle';
import FormDetail from './FormDetail';
import FormSentPerson from './FormSentPerson';

const isSameDay = (a, b) =>
  moment(a).startOf('day').isSame(moment(b).startOf('day'))

export const TimeRange = ({needStart, needEnd}) => 
  <Step.Group fluid>
    <Step>
      <Step.Content>
        <Step.Title><Moment format='ddd D MMM' date={needStart}/></Step.Title>
        <Step.Description><Moment format='h:mm a' date={needStart}/></Step.Description>
      </Step.Content>
    </Step>
    <Step>
      <Step.Content>
      <Step.Title>{!isSameDay(needStart, needEnd) ? <Moment format='ddd D MMM' date={needEnd}/> : '-'}</Step.Title>
        <Step.Description><Moment format='h:mm a' date={needEnd}/></Step.Description>
      </Step.Content>
    </Step>
  </Step.Group>

const colorByPercent = percent => {
  if (percent >= 1) { return 'green' }
  if (percent >= 0.75) { return 'olive' }
  if (percent >= 0.5) { return 'yellow' }
  if (percent >= 0.25) { return 'orange' }
  return 'red'
}

export const PeopleStats = ({sentPersonsNeeded, sentPersonCounts: {sent, confirmed, noshow}}) =>
  <Statistic.Group width="three" size='tiny'>
    <Statistic>
      <Statistic.Value><Icon name='users'/> {sentPersonsNeeded}</Statistic.Value>
      <Statistic.Label>Needed</Statistic.Label>
    </Statistic>
    <Statistic color={colorByPercent((sent + confirmed - noshow) / sentPersonsNeeded)} >
      <Statistic.Value><Icon name='play circle'/> {sent + confirmed - noshow}</Statistic.Value>
      <Statistic.Label>Sent</Statistic.Label>
    </Statistic>
    <Statistic color={colorByPercent(confirmed / sentPersonsNeeded)} >
      <Statistic.Value><Icon name='checkmark box'/> {confirmed}</Statistic.Value>
      <Statistic.Label>Confirm</Statistic.Label>
    </Statistic>
  </Statistic.Group>

export const DeliverySchedule = () =>
<Header as='h3'>
<Icon name='calendar check outline'/>
<Header.Content>
  Schedule a Shift
  <Header.Subheader>Contact them and work out a time and date.</Header.Subheader>
</Header.Content>
</Header>

export const DeliveryWalkup = () =>
<Header as='h3'>
<Icon name='child'/>
<Header.Content>
  Walk-Up
  <Header.Subheader>Go find the contact and you can HALP right now!</Header.Subheader>
</Header.Content>
</Header>

export const DeliveryContact = ({contactName, contactAddress}) =>
<Header as='h4'>
  <Icon name='user'/>
  <Header.Content>
    {contactName}
    <Header.Subheader>{contactAddress}</Header.Subheader>
  </Header.Content>
</Header>

export const DeliveryInfo = ({contactMethod, contactName, contactAddress}) =>
  <Segment basic>
    { contactMethod==='SCHEDULE' ? <DeliverySchedule /> : <DeliveryWalkup />}
    <DeliveryContact contactName={contactName} contactAddress={contactAddress}/>
  </Segment>

export const DetailItem = ({projectId, detail: {id, text}}) =>
<Toggle initial={false} onChange={val => console.log('new toggle', val)}>
  {({toggle, on}) => on
    ? <List.Item>
        <DetailUpdate detail={{id, text}} projectId={projectId} toggle={toggle} />
      </List.Item>
    : <List.Item>
      <List.Content floated='right'>
        <Button icon='edit' onClick={toggle}/>
        <ButtonDeleteDetail id={id} projectId={projectId}/>
      </List.Content>
      <Icon name='checkmark'/>
      <List.Content>{text}</List.Content>
    </List.Item>
  }
</Toggle>

export const ButtonDeleteDetail = ({projectId, id}) =>
<Mutation mutation={MUTATION_DELETE_PROJECT_DETAIL} refetchQueries={refetchSpecific(projectId)}>
  {deleteProjectDetail =>
    <Button icon='trash' onClick={() => deleteProjectDetail({variables: {id}})} />
  }
</Mutation>

export const DetailUpdate = ({detail, projectId, toggle}) =>
<Mutation mutation={MUTATION_UPDATE_PROJECT_DETAIL} refetchQueries={refetchSpecific(projectId)}>
{updateProjectDetail => 
  <FormDetail
    initialValues={detail}
    okLabel={'Update'}
    cancelLabel={'Cancel'}
    onSubmit={(values, {setSubmitting, setErrors, resetForm}) => {
      updateProjectDetail({variables: {id: detail.id, ...values}})
      .then(({data: {updateProjectDetail: result}}) => {
        if (result) {
          console.log('result', result)
          setSubmitting(false)
          toggle()
        }
        else {
          setSubmitting(false)
          setErrors({failure: 'I can\'t find anyone with that email and password.'})
        }
      })
    }}
    onCancel={toggle}
    />
}
</Mutation>

export const DetailAdd = ({id}) =>
  <Mutation mutation={MUTATION_ADD_PROJECT_DETAIL} refetchQueries={refetchSpecific(id)}>
    {addProjectDetail => 
      <FormDetail
        initialValues={{text: ''}}
        okLabel={'Add'}
        cancelLabel={'Cancel'}
        onSubmit={(values, {setSubmitting, setErrors, resetForm}) => {
          addProjectDetail({variables: {projectId: id, ...values}})
          .then(({data: {addProjectDetail: result}}) => {
            if (result) {
              console.log('result', result)
              setSubmitting(false)
              resetForm()
              // history.push(`/admin/project/${result.id}`)
            }
            else {
              setSubmitting(false)
              setErrors({failure: 'I can\'t find anyone with that email and password.'})
            }
          })
        }}
        onCancel={() => {}}
        />
    }
  </Mutation>

export const Details = ({id, details}) =>
  <div>
    <h3>What are they looking for?</h3>
    <List divided verticalAlign='middle' size='large'>
      { details.map(d => <DetailItem key={d.id} projectId={id} detail={d} />) }
      <List.Item>
        <DetailAdd id={id} />
      </List.Item>
    </List>
  </div>

const SentPersonAdd = ({id}) =>
<Mutation mutation={MUTATION_ADD_PROJECT_SENTPERSON} refetchQueries={refetchSpecific(id)}>
{(addProjectDetail, {error}) => 
  <FormSentPerson
    initialValues={{name: '', email: ''}}
    okLabel={'Add'}
    cancelLabel={'Cancel'}
    onSubmit={(values, {setSubmitting, setErrors, resetForm}) => {
      addProjectDetail({variables: {projectId: id, ...values}})
      .then(({data: {addProjectSentPerson: result}}) => {
        if (result) {
          console.log('result', result)
          setSubmitting(false)
          resetForm()
        }
        else {
          console.log('err', error)
          setSubmitting(false)
          setErrors({failure: error})
        }
      })
    }}
    onCancel={() => {}}
    />
}
</Mutation>

const SentPersonItem = ({projectId, sentPerson}) =>
  <List.Item>
    {sentPerson.name} : {sentPerson.email} : {sentPerson.state}
  </List.Item>

const SentPersons = ({id, sentPersons}) =>
  <div>
    <Header as='h3'>Sending People</Header>
    <List divided verticalAlign='middle' size='large'>
      { sentPersons.length == 0 && <List.Item>Nobody has been sent to help.</List.Item> }
      { sentPersons.map(p => <SentPersonItem key={p.id} projectId={id} sentPerson={p}/>)}
      <List.Item>
        <SentPersonAdd id={id}/>
      </List.Item>
    </List>
  </div>

const AdminProjectDetail = ({project}) =>
  <div>
    <AdminProjectTitle project={project} linkTo='/admin' />
    <Grid stackable>
      <Grid.Row columns={2}>
        <Grid.Column>
          <p style={{fontSize: '1.5rem', fontWeight: 200}}>{project.pitch}</p>
          <TimeRange {...project} />
          <Details {...project} />
        </Grid.Column>
        <Grid.Column>
          <PeopleStats {...project} />
          <DeliveryInfo {...project} />
          <SentPersons {...project} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </div>

export default AdminProjectDetail


