import React from 'react'
import HorseCard from '../Components/HorseCard'
import {Card} from 'semantic-ui-react'

const PlayerHorseList = ({horses, currentHorse, setCurrentHorse, clearCurrentHorse}) => {
  return(
    <div>
      {currentHorse ? (
        <HorseCard horse={currentHorse} singleHorse={true} onClick={clearCurrentHorse} />
      ) : (
        <Card.Group itemsPerRow={3}>
          {horses.map(horse => <HorseCard horse={horse} key={horse.id} onClick={setCurrentHorse}/>)}
        </Card.Group>
      )}

    </div>
  )
}

export default PlayerHorseList
