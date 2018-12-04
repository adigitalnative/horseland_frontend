import React from 'react'
import { Button, Form, Segment} from "semantic-ui-react";

const URL = "http://localhost:3001/api/v1/"

class LoginForm extends React.Component {
  state = {
    email: "",
    password: "",
    name: "",
    newUser: false
  };

  handleChange = (e, {name, value }) => {
    this.setState({ [name] : value })
  }

  handleLoginSubmit = () => {
    fetch(URL + "login", {
      method: "POST",
      headers: {
        "Content-Type" : "application/json",
        "Accept" : "application/json"
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
      .then(response => response.json())
      .then(data => {
        if(data.error) {
          alert('incorrect username or password')
        } else {
          localStorage.setItem('token', data.token)
          this.props.updateCurrentPlayer(data.player)
        }
      })
  }

  valid = (player) => {
    return player.player.name && player.player.email && player.player.password ?  true :  false
  }

  handlePlayerCreateSubmit = () => {
    const player = {
      player: {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      }
    }
    if (this.valid(player)) {
      fetch(URL + "players", {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
            "accept" : 'application/json'
        },
        body: JSON.stringify({
          player: {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
          }
        })
      })
      .then(response => response.json())
      .then(data => {
        if(data.error) {
          alert('invalid username or password')
        } else {
          localStorage.setItem('token', data.token)
          this.props.updateCurrentPlayer(data.player)
        }
      })
    } else {
      alert("Not a valid player")
    }

  }

  toggleNewUser = () => {
    this.setState({
      newUser: !this.state.newUser,
      name: "",
      email: "",
      password: ""
    })
  }

  render() {
    return(
      <Segment>
        {this.state.newUser ? (
          <Form
            onSubmit={this.handlePlayerCreateSubmit}
          >
            <Form.Input
              label="Name"
              placeholder="name"
              name="name"
              onChange={this.handleChange}
              value={this.state.name}
            />
            <Form.Input
              label="Email"
              placeholder="email"
              name="email"
              onChange={this.handleChange}
              value={this.state.email}
            />
            <Form.Input
              type="password"
              label="Password"
              placeholder="password"
              name="password"
              onChange={this.handleChange}
              value={this.state.password}
            />
            <Button.Group >
              <Button type="button" onClick={this.toggleNewUser}>Already a Player</Button>
              <Button type="submit">Create Account</Button>
            </Button.Group>
          </Form>
        ) : (
          <Form
            onSubmit={this.handleLoginSubmit}
          >
            <Form.Input
              label="Email"
              placeholder="email"
              name="email"
              onChange={this.handleChange}
              value={this.state.email}
            />
            <Form.Input
              type="password"
              label="Password"
              placeholder="password"
              name="password"
              onChange={this.handleChange}
              value={this.state.password}
            />
            <Button.Group>
              <Button type="button" onClick={this.toggleNewUser}>Create a new Account</Button>
              <Button type="submit">Login</Button>
            </Button.Group>
          </Form >
        ) }

      </Segment>
    )
  }

}

export default LoginForm
