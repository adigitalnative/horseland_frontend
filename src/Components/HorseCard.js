import React from 'react'
import {Card, Image, Button, Icon} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

const HorseCard = ({horse, onClick, singleHorse}) => {
  return(
    <Card>
      <Image src="https://via.placeholder.com/200" />
      <Card.Content>
        <Card.Header>
          {horse.name}
          {horse.gender === "female" ? <Icon name="venus" /> : <Icon name="mars" />}
          {horse.for_sale ? <Icon name="tag" /> : null }
        </Card.Header>
        <Card.Meta>Age: {horse.age}</Card.Meta>
      </Card.Content>
      <Card.Content extra>
        <Link to={`/horses/${horse.id}`}>
          <Button fluid size="tiny">Details</Button>
        </Link>
      </Card.Content>
    </Card>
  )
}

export default HorseCard
