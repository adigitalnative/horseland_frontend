import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import {Container} from 'semantic-ui-react'
import PlayerHorseList from './PlayerHorseList'
import HorseCard from '../Components/HorseCard'

class MainContainer extends Component {
  constructor() {
    super()
    this.state={
      currentHorse: null
    }
  }

  setCurrentHorse = (horse) => {
    this.setState({ currentHorse: horse })
  }

  clearCurrentHorse = () => {
    this.setState({ currentHorse: null })
  }

  render() {
    return(
        <Container>
          <Route exact path='/horses' render={()=> (
            <PlayerHorseList
              horses={this.props.horses}
              currentHorse={this.state.currentHorse}
              setCurrentHorse={this.setCurrentHorse}
              clearCurrentHorse={this.clearCurrentHorse}
            />
          ) }/>
          <Route exact path='/' component={null} />
        </Container>
    )
  }
}

export default MainContainer
