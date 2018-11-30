import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import {Container} from 'semantic-ui-react'
import PlayerHorseList from './PlayerHorseList'
import HorseDetail from '../Components/HorseDetail'

class MainContainer extends Component {
  constructor() {
    super()
    this.state={
      currentHorse: null
    }
  }

  displayHorse(props) {
    if(this.props.horses.length > 0) {
      const horse = this.props.horses.find(horse => horse.id === parseInt(props.match.params.id))
      return <HorseDetail horse={horse} />
    } else {
      return null
      // Should give a loading thing
    }
  }

  render() {
    return(
        <Container>
        <Route exact path='/horses/:id' render ={(props) => this.displayHorse(props)} />
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
