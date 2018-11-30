import React from 'react'
import {Route, Switch} from 'react-router-dom'
import {Container} from 'semantic-ui-react'
import PlayerHorseList from './PlayerHorseList'
import HorseCard from '../Components/HorseCard'

const MainContainer = (props) => {
  return(
      <Container>
        <Route exact path='/horses' render={()=> (
          <PlayerHorseList
            horses={props.horses}
            currentHorse={props.currentHorse}
            setCurrentHorse={props.setCurrentHorse}
            clearCurrentHorse={props.clearCurrentHorse}
          />
        ) }/>
        <Route exact path='/' component={null} />
      </Container>
  )
}

export default MainContainer
