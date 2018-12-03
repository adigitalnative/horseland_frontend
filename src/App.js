import React, { Component } from 'react';
import Header from './Containers/Header'
import MainContainer from './Containers/MainContainer'

const URL = "http://localhost:3001/api/v1/"

class App extends Component {
  constructor() {
    super()
    this.state={
      name: null,
      email: null,
      horses: [],
      available_horses: [],
      allHorses: [],
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

  render() {
    return (
      <div>
        <Header
          name={this.state.name}
          balance={this.state.balance}/>
        <MainContainer
          horses={this.state.horses}
          setHorseForSale={this.setHorseForSale}
          available_horses={this.state.available_horses}
          allHorses={this.allHorses()}
          playerId={this.state.playerId}
          purchaseHorse = {this.purchaseHorse}
          transactions = {this.state.transactions}
          updateHorse = {this.updateHorse}
        />
      </div>
    );
  }
}

export default App;
