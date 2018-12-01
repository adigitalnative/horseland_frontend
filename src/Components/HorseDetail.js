import React, {Fragment, Component} from 'react'
import {Item, Button, Icon, Divider} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import HorseFormModal from './HorseFormModal'

class HorseDetail extends Component {
  render() {
    let {horse, onClick, singleHorse, setHorseForSale, belongsToCurrentPlayer, purchaseHorse, updateHorse} = this.props
    return(
      <Fragment>
        <Divider horizontal>{horse.name}</Divider>
        <Item.Group>
          <Item>
            <Item.Image size="medium" src={horse.image_url} />
            <Item.Content>
              <Item.Header>{horse.name} {horse.gender === "female" ? <Icon name="venus" /> : <Icon name="mars" />}</Item.Header>
              <Item.Meta>Age: {horse.age}</Item.Meta>
              <Item.Description>{horse.name} is a {horse.color} {horse.breed} horse.</Item.Description>
              {horse.for_sale ? <Item.Description><Icon name="tag" />{horse.name} is currently for sale.</Item.Description> : null }
              {belongsToCurrentPlayer ? (
                <Button.Group size="tiny" fluid>
                  <Button as={Link} to="/">Back</Button>
                  <HorseFormModal horse={horse} updateHorse={updateHorse}/>
                  <Button onClick={() => setHorseForSale(horse)}>{horse.for_sale ? "Don't Sell" : "Sell"}</Button>
                </Button.Group>
              ) : (
                <Button.Group size="tiny" fluid>
                  <Button size="tiny" as={Link} to="/">Back</Button>
                  <Button size="tiny" onClick={() => purchaseHorse(horse)}>Purchase</Button>
                </Button.Group>
              )}

            </Item.Content>
          </Item>
        </Item.Group>
      </Fragment>
    )
  }
}

export default HorseDetail
