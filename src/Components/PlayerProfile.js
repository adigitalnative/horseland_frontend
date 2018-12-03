import React from 'react'
import {Header, Image, Divider, Card, Item} from 'semantic-ui-react'
import HorseCard from './HorseCard'

const PlayerProfile = ({horses, transactions, description}) => {
  return(
    <div>
      <Header as="h2" icon textAlign='center' >
        <Image src="http://s3.amazonaws.com/jq-actorsite-prod/photos/images/000/000/008/large/2011_headshot_henson1.jpg?1490066308" circular/>
        <Header.Content>Jacqueline</Header.Content>
      </Header>
      <Divider></Divider>
      <Header as="h3" textAlign="center">
        <div dangerouslySetInnerHTML={{__html: description }} />
      </Header>
      <Divider horizontal>Your Horses</Divider >
      {<Card.Group itemsPerRow={5}>
        {horses.map(horse => <HorseCard horse={horse} key={horse.id}/>)}
      </Card.Group>}
      <Divider horizontal>Your Transactions</Divider>
      <Item.Group divided>
        {transactions ? (
          transactions.map(transaction => (
            <Item key={transaction.id}>
              <Item.Content verticalAlign='middle'>
                <Item.Header as="a">{transaction.description}</Item.Header>
                <Item.Meta>{transaction.amount} {transaction.timestamp}</Item.Meta>
              </Item.Content>
            </Item>
          ))
        ) : null }
      </Item.Group>
    </div>
  )
}

export default PlayerProfile
