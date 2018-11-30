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
      available_horses: []
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
          available_horses: data.available_horses
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
          horses: data
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
        />
      </div>
    );
  }
}

export default App;
