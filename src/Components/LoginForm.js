import React from 'react'
import { Button, Form, Segment, Message } from "semantic-ui-react";

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

  handlePlayerCreateSubmit = () => {
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
  }

  toggleNewUser = () => {
    this.setState({newUser: !this.state.newUser})
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
              <Button onClick={this.toggleNewUser}>Already a Player</Button>
              <Button type="submit">Create Account</Button>
            </Button.Group>
          </Form>
        ) : (
          <Form
            onSubmit={this.handleLoginSubmit}
            size="mini"
            key="mini"
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
              <Button onClick={this.toggleNewUser}>Create a new Account</Button>
              <Button type="submit">Login</Button>
            </Button.Group>
          </Form >
        ) }

      </Segment>
    )
  }

}

export default LoginForm
