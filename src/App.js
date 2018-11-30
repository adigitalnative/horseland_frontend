import React, { Component } from 'react';
import './App.css';
import Header from './Containers/Header'
import MainContainer from './Containers/MainContainer'

URL = "http://localhost:3001/api/v1/"

class App extends Component {
  constructor() {
    super()
    this.state={
      name: null,
      email: null,
      horses: []
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
  render() {
    return (
      <div>
        <Header name={this.state.name}/>
        <MainContainer horses={this.state.horses}/>
      </div>
    );
  }
}

export default App;
