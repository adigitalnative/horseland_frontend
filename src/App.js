import React, { Component, Fragment } from 'react';
import {Route, Switch, Redirect} from 'react-router-dom'
import {Container, Loader} from 'semantic-ui-react'
import PlayerProfile from "./Components/PlayerProfile"
import Nav from './Components/Nav'
import PlayerHorseList from './Containers/PlayerHorseList'
import HorseDetail from './Components/HorseDetail'
import LoginForm from './Components/LoginForm'
import NotFound from './Components/NotFound'


const URL = "http://localhost:3001/api/v1/"

class App extends Component {
  constructor() {
    super()
    this.state={
      currentUser: null,
      name: null,
      email: null,
      horses: [],
      available_horses: [],
      playerId: null,
      balance: null,
      transactions: null
    }
  }

  updateCurrentPlayer = (player) => {
    this.setState({
      currentUser: true,
      name: player.name,
      email: player.email,
      horses: player.horses,
      available_horses: player.available_horses,
      playerId: player.id,
      balance: player.bank_balance,
      transactions: player.transactions
    })
  }



  // This needs to take into consideration a failed login!
  componentDidMount() {
    let token = localStorage.getItem('token')
    if(token) {
      fetch(URL + "player", {
        method: "GET",
        header: {
          "Authentication" : `Bearer ${token}`
        }
      }).then(res => res.json())
      .then(data => {
        console.log(data)
        // Set the data apropriately
      })
    } else {
      console.log("No Token")
    }

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

  redirectToLogin = () => {
    return <Redirect to="/login" />
  }

  redirectToProfile = () => {
    return <Redirect to="/profile" />
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
            <Route exact path="/" render={() => this.redirectToProfile() } />
            <Route exact path="/profile" render={() => this.state.currentUser ? (
              <PlayerProfile
                horses={this.state.horses}
                transactions={this.state.transactions}
              />
            ) : this.redirectToLogin() } />
            <Route exact path="/login" render={() => this.state.currentUser ?
              this.redirectToProfile() :
              <LoginForm updateCurrentPlayer={this.updateCurrentPlayer} />}
            />
            <Route exact path="/horses" render={() => this.state.currentUser ? (<PlayerHorseList
              horses={this.state.horses}
              currentHorse={this.state.currentHorse}
              availableHorses={this.state.available_horses}
              setCurrentHorse={this.setCurrentHorse}
            />) : this.redirectToLogin() } />
            <Route exact path="/horses/:id" render={(event) => this.state.currentUser ? this.displayHorse(event.match.params.id) : this.redirectToLogin()} />
            <Route component={NotFound} />
          </Switch>
        </Container>
      </Fragment>
    )
  }
}

export default App;
