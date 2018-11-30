import React from 'react'
import {Card, Image, Button, Icon} from 'semantic-ui-react'

const HorseCard = ({horse, onClick, singleHorse}) => {
  return(
    <Card>
      <Image src="https://via.placeholder.com/200" />
      <Card.Content>
        <Card.Header>
          {horse.name}
          {horse.gender === "female" ? <Icon name="venus" /> : <Icon name="mars" />}

        </Card.Header>
        <Card.Meta>Age: {horse.age}</Card.Meta>
        <Card.Description>{horse.name} is a {horse.color} {horse.breed} horse.</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button fluid size="tiny" onClick={() => onClick(horse)}>Details</Button>
      </Card.Content>
    </Card>
  )
}

export default HorseCard
