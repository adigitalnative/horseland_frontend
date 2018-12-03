import React, { Component, Fragment } from 'react';
import {Route, Switch, Redirect} from 'react-router-dom'
import {Container, Loader} from 'semantic-ui-react'
import PlayerProfile from "./Components/PlayerProfile"
import Nav from './Components/Nav'
import PlayerHorseList from './Containers/PlayerHorseList'
import HorseDetail from './Components/HorseDetail'


const URL = "http://localhost:3001/api/v1/"

class App extends Component {
  constructor() {
    super()
    this.state={
      name: null,
      email: null,
      horses: [],
      available_horses: [],
      playerId: null,
      balance: null,
      transactions: null
    }
  }

  // This needs to take into consideration a failed login!
  componentDidMount() {
    fetch(URL + "players/1")
      .then(response => response.json())
      .then(data => {
        if (data.message !== "Please log in") {
          this.setState({
            name: data.name,
            email: data.email,
            horses: data.horses,
            available_horses: data.available_horses,
            playerId: data.id,
            balance: data.bank_balance,
            transactions: data.transactions
          })
        }
      }
    )
  }

  setHorseForSale = horse => {
    fetch(URL + `players/1/horses/${horse.id}/toggle_for_sale`, {
      method: "PATCH",
      headers: {
        "Content-Type":"application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          horses: data,
        })
      })
  }

  purchaseHorse = horse => {
    fetch(URL + `purchase_horse`, {
      method: "PATCH",
      headers: {
        "Application-Content":"application/json"
      },
      body: JSON.stringify({
        playerId: this.state.playerId,
        horseId: horse.id
      })
    })
      .then(response => response.json())
      .then(data => this.setState({
        horses: data.horses,
        available_horses: data.available_horses,
        transactions: data.transactions,
        balance: data.bank_balance
      }))
  }

  updateHorse = horseParams => {
    fetch(URL + `horses/${horseParams.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(horseParams)
    }).then(response => response.json())
    .then(data => this.setState({
      horses: data
    }))
  }

  allHorses = () => {
    return [...this.state.horses, ...this.state.available_horses]
  }

  displayHorse = (horseId) => {
    if (this.state.horses.length > 0) {
      const horse = this.allHorses().find(horse => horse.id === parseInt(horseId))
      return <HorseDetail
        horse={horse}
        belongsToCurrentPlayer={this.state.playerId === horse.player_id}
        setHorseForSale={this.setHorseForSale}
        purchaseHorse={this.purchaseHorse}
        updateHorse={this.updateHorse}
      />
    } else {
      return (
        <Loader active inline> Loading </Loader>
      )
    }
  }

  render() {
    return(
      <Fragment>
      <Nav
        logged_in={!!this.state.currentUser}
        logout={this.logout}
        playerName={this.state.name}
        balance={this.state.balance}
      />
        <Container>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/profile" /> } />
            <Route exact path="/profile" render={() => (
              <PlayerProfile
                horses={this.state.horses}
                transactions={this.state.transactions}
              />
            )} />
            <Route exact path="/horses" render={() => <PlayerHorseList
              horses={this.state.horses}
              currentHorse={this.state.currentHorse}
              availableHorses={this.state.available_horses}
              setCurrentHorse={this.setCurrentHorse}
            />} />
            <Route exact path="/horses/:id" render={(event) => this.displayHorse(event.match.params.id)} />
          </Switch>
        </Container>
      </Fragment>
    )
  }

  // Will need to fix this!
  //


  // render() {
  //   return (
  //     <div>
  //       <Header
  //         name={this.state.name}
  //         balance={this.state.balance}/>
  //       <MainContainer
  //         horses={this.state.horses}
  //         setHorseForSale={this.setHorseForSale}
  //         available_horses={this.state.available_horses}
  //         allHorses={this.allHorses()}
  //         playerId={this.state.playerId}
  //         purchaseHorse = {this.purchaseHorse}
  //         transactions = {this.state.transactions}
  //         updateHorse = {this.updateHorse}
  //       />
  //     </div>
  //   );
  // }
}

export default App;
