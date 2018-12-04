import React, {Component, Fragment} from 'react'
import {Divider, Item, Button, Modal, Card} from 'semantic-ui-react'
import CompetitionHorseCard from '../Components/CompetitionHorseCard'


const URL = "http://localhost:3001/api/v1/"

// BIG CAVEAT!!!
//
// This state should really live higher up, so that when you enter a horse, the
// state of the app is changed with the new transaction which is then displayed
// to the user. BUT as this is an intentionally pre-redux project, I'm going to
// leave it as-is for now and try to bring Redux in in the future.

class ShowList extends Component {
  constructor() {
    super()
    this.state={
      shows: []
    }
  }

  myToken = () => localStorage.getItem('token')

  componentDidMount() {
    const token = this.myToken()
    if(token) {
      fetch(URL + "shows", {
        method: "GET",
        headers: {
          "Authorization" : `Bearer ${token}`
        }
      })
      .then(response => response.json())
      .then(data => this.setState({shows: data}))
    }
  }

  enterInCompetition = (horse, show, competition) => {
    fetch(URL + `shows/${show.id}/competition/${competition.id}/enter`, {
      method: "POST",
      headers: {
        "Authorization" : `Bearer ${this.myToken()}`,
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        entry: {
          horse_id: horse.id,
        }
      })
    })
    .then(response => response.json())
    .then(data => {
      if (!data.error) {
        this.setState({ shows: data })
      }
    })
  }

  withdrawFromCompetition = (horse, show, competition) => {
    fetch(URL + `shows/${show.id}/competition/${competition.id}/withdraw`, {
      method: "DELETE",
      headers: {
        "Authorization" : `Bearer ${this.myToken()}`,
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        entry: {
          horse_id: horse.id
        }
      })
    })
    .then(response => response.json())
    .then(data => {
      if(!data.error) {
        this.setState({ shows: data })
      }
    })
  }

  availableForCompetition = (competition, horses) => {
    const competitionIds = competition.horses.map(comp => comp.id)
    return horses.filter(horse => !competitionIds.includes(horse.id))
  }

  render() {
    return(
      <Fragment>
        <Divider horizontal>Shows</Divider>
        <Item.Group divided>
          {this.state.shows.map(show => (
            <Item key={show.id}>
              <Item.Content>
                <Item.Header>
                  {show.name}
                </Item.Header>
                <Item.Extra>
                  {show.competitions.map(competition => (
                    <Modal trigger={<Button key={competition.id} size="tiny">{competition.name}</Button>} key={competition.id}>
                    <Modal.Header>{show.name}: {competition.name}</Modal.Header>
                      <Modal.Content>
                        <Modal.Description>
                          {competition.description ? <p>{competition.description}</p> : null }
                          <h3>Entered Horses</h3>
                          <Card.Group itemsPerRow={6}>
                            {competition.horses.map(horse => (
                              <CompetitionHorseCard horse={horse} toggleCompetition={this.withdrawFromCompetition} competition={competition} show={show} key={competition.id}/>
                            ))}
                          </Card.Group>

                          <h3>Available to Enter</h3>
                          <Card.Group itemsPerRow={6}>
                            {this.availableForCompetition(competition, this.props.playerHorses).map(horse => (
                              <CompetitionHorseCard horse={horse} toggleCompetition={this.enterInCompetition} competition={competition} show={show}  key={competition.id}/>
                            ))}
                          </Card.Group>
                        </Modal.Description>
                      </Modal.Content>
                    </Modal>
                  ))}
                </Item.Extra>
              </Item.Content>
            </Item>
          ))}
        </Item.Group>
      </Fragment>
    )
  }
}

export default ShowList
