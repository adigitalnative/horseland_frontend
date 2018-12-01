import React, {Component} from 'react'
import {Modal, Button, Form, Image} from 'semantic-ui-react'

class HorseFormModal extends Component {
  constructor() {
    super()
    this.state={
      name: '',
      color: '',
      sale_price: 0,
      image_url: "",
    }
  }

  componentDidMount() {
    this.setState({
      name: this.props.horse.name,
      color: this.props.horse.color,
      sale_price: this.props.horse.sale_price,
      image_url: this.props.horse.image_url,
    })
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  }

  handleSubmit = () => {
    const horseParams = {
      name: this.state.name,
      color: this.state.color,
      sale_price: this.state.sale_price,
      imageUrl: this.state.image_url,
      id: this.props.horse.id
    }

    this.props.updateHorse(horseParams)
  }

  render() {
    let {horse} = this.props
    return (
      <Modal trigger={<Button>Edit</Button>} centered={false} dimmer='blurring' closeIcon>
        <Modal.Header>Edit {horse.name}</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form onSubmit={this.handleSubmit}>
              <Form.Input name="name" label="Name" type="text" value={this.state.name} onChange={this.handleChange}/>
              <Form.Input label="Color" name="color" type="text" value={this.state.color} onChange={this.handleChange}/>
              <Form.Input label="Photo" name="image_url" type="text" value={this.state.image_url} onChange={this.handleChange} />
              <Form.Input label="Sale Price" type="number" name="sale_price" value={this.state.sale_price} onChange={this.handleChange}/>
              <Form.Button type="submit" fluid>Save Changes</Form.Button>
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}

export default HorseFormModal

// <Modal trigger={<Button>Show Modal</Button>}>
//     <Modal.Header>Select a Photo</Modal.Header>
//     <Modal.Content image>
//       <Image wrapped size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' />
//       <Modal.Description>
//         <Header>Default Profile Image</Header>
//         <p>We've found the following gravatar image associated with your e-mail address.</p>
//         <p>Is it okay to use this photo?</p>
//       </Modal.Description>
//     </Modal.Content>
//   </Modal>
