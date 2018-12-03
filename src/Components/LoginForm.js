import React from 'react'
import { Button, Form, Segment, Message } from "semantic-ui-react";

const URL = "http://localhost:3001/api/v1/"

class LoginForm extends React.Component {
  state = {
    email: "",
    password: ""
  };

  handleChange = (e, {name, value }) => {
    this.setState({ [name] : value })
  }

  handleLoginSubmit = () => {
    console.log("Trying to log in")
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

  render() {
    return(
      <Segment>
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
          <Button type="submit">Login</Button>
        </Form >
      </Segment>
    )
  }

}

export default LoginForm
