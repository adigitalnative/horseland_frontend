import React from 'react'
import {Card, Image, Button, Icon} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

const HorseCard = ({horse, onClick, singleHorse}) => {
  return(
    <Card>
      <Image src={horse.image_url} />
      <Card.Content>
        <Card.Header>
          {horse.name}
          {horse.gender === "female" ? <Icon name="venus" /> : <Icon name="mars" />}
          {horse.for_sale ? <Icon name="tag" /> : null }
        </Card.Header>
        <Card.Meta>Age: {horse.age}</Card.Meta>
        {horse.for_sale ? (
          <Card.Description>Sale Price: ${horse.sale_price}</Card.Description>
        ) : null }
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
