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
      playerId: null
    }
  }

  componentDidMount() {
    fetch(URL + "players/1")
      .then(response => response.json())
      .then(data => {
        this.setState({
          name: data.name,
          email: data.email,
          horses: data.horses,
          available_horses: data.available_horses,
          allHorses: [...data.horses, ...data.available_horses],
          playerId: data.id
        })
      })
  }

  setHorseForSale = horse => {
    fetch(URL + `players/1/horses/${horse.id}/toggle_for_sale`, {
      method: "PATCH",
      headers: {
        "Application-Content":"application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          horses: data,
          allHorses: [...data, ...this.state.available_horses]
        })
      })
  }

  render() {
    return (
      <div>
        <Header name={this.state.name}/>
        <MainContainer
          horses={this.state.horses}
          setHorseForSale={this.setHorseForSale}
          available_horses={this.state.available_horses}
          allHorses={this.state.allHorses}
          playerId={this.state.playerId}
        />
      </div>
    );
  }
}

export default App;
