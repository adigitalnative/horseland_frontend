import React, { Component } from 'react'
import {Header, Image, Divider, Card, Item, Form, Button} from 'semantic-ui-react'
import HorseCard from './HorseCard'

class PlayerProfile extends Component {
  state = {
    description: this.props.description,
    showDescForm: false
  }

  toggleDescForm = () => {
    this.setState({
      showDescForm: !this.state.showDescForm
    })
  }

  displayDescHtml = () => {
    if(this.props.description) {
      /* 'description' input is santized server-side */
      return <div dangerouslySetInnerHTML={{__html: this.props.description }} onClick={this.toggleDescForm} />
    } else {
      return <Button type="button" onClick={this.toggleDescForm}>Set Description</Button>
    }
  }

  handleChange = (e, {name, value }) => {
    this.setState({ [name] : value })
  }

  handleDescUpdate = () => {
    this.props.updatePlayerDesc(this.state.description)
    this.toggleDescForm()
  }

  displayDescForm = () => {
    return (
      <Form onSubmit={this.handleDescUpdate}>
        <Form.TextArea label="Description" value={this.state.description} onChange={this.handleChange} name="description" type="text"/>
        <Button type="button" onClick={this.toggleDescForm}>Cancel</Button>
        <Button type="submit">Save</Button>
      </Form>
    )
  }

  render() {
    let {horses, transactions, description} = this.props
    return(
      <div>
        <Header as="h2" icon textAlign='center' >
          <Image src="http://s3.amazonaws.com/jq-actorsite-prod/photos/images/000/000/008/large/2011_headshot_henson1.jpg?1490066308" circular/>
          <Header.Content>Jacqueline</Header.Content>
        </Header>
        <Divider horizontal>About</Divider>
          {this.state.showDescForm ? this.displayDescForm() : this.displayDescHtml()}

        <Divider horizontal>Your Horses</Divider >
        {<Card.Group itemsPerRow={5}>
          {horses.map(horse => <HorseCard horse={horse} key={horse.id}/>)}
        </Card.Group>}
        <Divider horizontal>Your Transactions</Divider>
        <Item.Group divided>
          {transactions ? (
            transactions.map(transaction => (
              <Item key={transaction.id}>
                <Item.Content verticalAlign='middle'>
                  <Item.Header as="a">{transaction.description}</Item.Header>
                  <Item.Meta>{transaction.amount} {transaction.timestamp}</Item.Meta>
                </Item.Content>
              </Item>
            ))
          ) : null }
        </Item.Group>
      </div>
    )
  }
}

export default PlayerProfile
