import React from 'react'
import {Card} from 'semantic-ui-react'
import HorseCard from './HorseCard'

const SaleList = ({horses}) => {
  return(
    <div>
    <Card.Group itemsPerRow={3}>
      {horses.map(horse => <HorseCard horse={horse} key={horse.id}/>)}
    </Card.Group>
    </div>
  )
}

export default SaleList
