import React from 'react'
import {Menu, Container, Icon} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

const Header = ({name}) => {
  return(
    <div>
      <Menu inverted>
          <Menu.Item as={Link} to="/" header>
            Horseland
          </Menu.Item>
          <Menu.Item as={Link} to="/horses">
            Your Horses
          </Menu.Item>
          <Menu.Item as='a'>
            Horses for Sale
          </Menu.Item>
          {
            name ? (
              <Menu.Item position="right">
                <Icon name="user outline"/> {name}
              </Menu.Item>
            ) : null
          }

      </Menu>
    </div>
  )
}

export default Header
