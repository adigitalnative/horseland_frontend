import React from 'react'
import { Card, Image} from 'semantic-ui-react'

class CompetitionHorseCard extends React.Component {
  handleCardClick = () => {
    this.props.toggleCompetition(this.props.horse, this.props.show, this.props.competition)
  }

  render() {
    return(
      <Card onClick={this.handleCardClick}>
        <Image src={this.props.horse.image_url} />
        <Card.Content>
          <Card.Description>
            {this.props.horse.name}
          </Card.Description>
          <Card.Meta>
            {this.props.horse.player_name}
          </Card.Meta>
        </Card.Content>
      </Card>
    )
  }
}

export default CompetitionHorseCard
