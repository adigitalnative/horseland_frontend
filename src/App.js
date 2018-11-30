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
      horses: [],
      currentHorse: null
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

  setCurrentHorse = (horse) => {
    this.setState({ currentHorse: horse })
  }

  clearCurrentHorse = () => {
    this.setState({ currentHorse: null })
  }

  render() {
    return (
      <div>
        <Header name={this.state.name}/>
        <MainContainer
          horses={this.state.horses}
          currentHorse={this.state.currentHorse}
          setCurrentHorse={this.setCurrentHorse}
          clearCurrentHorse={this.clearCurrentHorse}
        />
      </div>
    );
  }
}

export default App;
