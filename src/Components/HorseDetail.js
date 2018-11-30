import React from 'react'
import {Item, Button, Icon} from 'semantic-ui-react'

const HorseDetail = ({horse, onClick, singleHorse}) => {
  return(
    <Item.Group>
      <Item>
        <Item.Image size="medium" src="https://via.placeholder.com/200" />
        <Item.Content>
          <Item.Header>{horse.name} {horse.gender === "female" ? <Icon name="venus" /> : <Icon name="mars" />}</Item.Header>
          <Item.Meta>Age: {horse.age}</Item.Meta>
          <Item.Description>{horse.name} is a {horse.color} {horse.breed} horse.</Item.Description>


          <Button fluid size="tiny" onClick={() => onClick(horse)}>
            Back
          </Button>
        </Item.Content>
      </Item>
    </Item.Group>
  )
}

export default HorseDetail
