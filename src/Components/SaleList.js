import React from 'react'
import {Card} from 'semantic-ui-react'
import HorseCard from './HorseCard'

const SaleList = ({horses, purchaseHorse}) => {
  return(
    <div>
    <Card.Group itemsPerRow={3}>
      {horses.map(horse => <HorseCard horse={horse} key={horse.id} purchaseHorse={purchaseHorse}/>)}
    </Card.Group>
    </div>
  )
}

export default SaleList
