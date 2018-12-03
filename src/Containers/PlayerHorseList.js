import React from 'react'
import HorseCard from '../Components/HorseCard'
import {Card, Divider} from 'semantic-ui-react'

const PlayerHorseList = ({
                            horses,
                            availableHorses,
                          }) => {
  return(
    <div>
      <Divider horizontal>Your Horses</Divider>

      <Card.Group itemsPerRow={3}>
        {horses.map(horse => <HorseCard horse={horse} key={horse.id}/>)}
      </Card.Group>
      <Divider horizontal>Available for Purchase</Divider>
      <Card.Group itemsPerRow={5}>
        {availableHorses.map(horse => <HorseCard horse={horse} key={horse.id}/>)}
      </Card.Group>
    </div>
  )
}

export default PlayerHorseList
