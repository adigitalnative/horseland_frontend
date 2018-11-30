import React, { Component } from 'react';
import './App.css';
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
    }
  }

  componentDidMount() {
    fetch(URL + "players/1")
      .then(response => response.json())
      .then(data => {
        this.setState({
          name: data.name,
          email: data.email,
          horses: data.horses
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
        />
      </div>
    );
  }
}

export default App;
