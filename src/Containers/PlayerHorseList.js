import React from 'react'
import HorseCard from '../Components/HorseCard'
import {Card} from 'semantic-ui-react'

const PlayerHorseList = ({horses}) => {
  return(
    <div>
      <Card.Group itemsPerRow={3}>
        {horses.map(horse => <HorseCard horse={horse} key={horse.id}/>)}
      </Card.Group>
    </div>
  )
}

export default PlayerHorseList
