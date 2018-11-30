import React from 'react'
import {Route, Switch} from 'react-router-dom'
import {Container} from 'semantic-ui-react'
import PlayerHorseList from './PlayerHorseList'

const MainContainer = (props) => {
  return(
      <Container>
        <Switch>
          <Route path='/horses' render={()=> <PlayerHorseList horses={props.horses} /> }/>
          <Route path='/' component={null} />
        </Switch>
      </Container>
  )
}

export default MainContainer
