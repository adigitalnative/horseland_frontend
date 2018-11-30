import React from 'react'
import {Item, Button, Icon} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

const HorseDetail = ({horse, onClick, singleHorse, setHorseForSale}) => {
  return(
    <Item.Group>
      <Item>
        <Item.Image size="medium" src="https://via.placeholder.com/200" />
        <Item.Content>
          <Item.Header>{horse.name} {horse.gender === "female" ? <Icon name="venus" /> : <Icon name="mars" />}</Item.Header>
          <Item.Meta>Age: {horse.age}</Item.Meta>
          <Item.Description>{horse.name} is a {horse.color} {horse.breed} horse.</Item.Description>
          {horse.for_sale ? <Item.Description><Icon name="tag" />{horse.name} is currently for sale.</Item.Description> : null }
            <Link to="/horses" >
              <Button size="tiny">Back</Button>
            </Link>
            <Button size="tiny" onClick={() => setHorseForSale(horse)}>{horse.for_sale ? "Don't Sell" : "Sell"}</Button>
        </Item.Content>
      </Item>
    </Item.Group>
  )
}

export default HorseDetail
