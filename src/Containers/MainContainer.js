import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import {Container, Loader} from 'semantic-ui-react'
import PlayerHorseList from './PlayerHorseList'
import HorseDetail from '../Components/HorseDetail'
import Landing from '../Components/Landing'
import PlayerProfile from "../Components/PlayerProfile"

class MainContainer extends Component {
  constructor() {
    super()
    this.state={
      currentHorse: null
    }
  }

  displayHorse(props) {
    if(this.props.horses.length > 0) {
      const horse = this.props.allHorses.find(horse => horse.id === parseInt(props.match.params.id))
      return <HorseDetail
        horse={horse}
        setHorseForSale={this.props.setHorseForSale}
        belongsToCurrentPlayer={this.props.playerId === horse.player_id}
        purchaseHorse={this.props.purchaseHorse}
        updateHorse={this.props.updateHorse}
      />
    } else {
      return (
        <Loader active inline>Loading</Loader>
      )
    }
  }

  render() {
    return(
      <Container>
        <Route exact path='/horses/:id' render ={(props) => this.displayHorse(props)} />
        <Route exact path='/' render={()=> (
          <PlayerHorseList
            horses={this.props.horses}
            currentHorse={this.state.currentHorse}
            setCurrentHorse={this.setCurrentHorse}
            clearCurrentHorse={this.clearCurrentHorse}
            setHorseForSale={this.props.setHorseForSale}
            availableHorses={this.props.available_horses}
          />
        ) }/>
        <Route exact path='/profile' render={() => <PlayerProfile horses={this.props.horses} transactions={this.props.transactions} />} />
      </Container>
    )
  }
}

export default MainContainer
