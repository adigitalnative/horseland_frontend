import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import {Container, Loader} from 'semantic-ui-react'
import PlayerHorseList from './PlayerHorseList'
import HorseDetail from '../Components/HorseDetail'
import SaleList from '../Components/SaleList'
import Landing from '../Components/Landing'

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
      return <HorseDetail horse={horse} setHorseForSale={this.props.setHorseForSale}/>
    } else {
      return (
        <Loader active inline>Loading</Loader>
      )
    }
  }

  render() {
    return(
      <Container>
        <Route exact path="/available_horses" render={() => <SaleList horses={this.props.available_horses}/>} />
        <Route exact path='/horses/:id' render ={(props) => this.displayHorse(props)} />
        <Route exact path='/horses' render={()=> (
          <PlayerHorseList
            horses={this.props.horses}
            currentHorse={this.state.currentHorse}
            setCurrentHorse={this.setCurrentHorse}
            clearCurrentHorse={this.clearCurrentHorse}
            setHorseForSale={this.props.setHorseForSale}
          />
        ) }/>
        <Route exact path='/' component={Landing} />
      </Container>
    )
  }
}

export default MainContainer
