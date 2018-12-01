import React, {Fragment} from 'react'
import {Menu, Icon, Divider} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

const Header = ({name, balance}) => {
  return(
    <div>
      <Menu inverted>
          <Menu.Item as={Link} to="/" header>
            Horseland
          </Menu.Item>
          <Menu.Item as={Link} to="/">
            Horses
          </Menu.Item>
          {
            name ? (
                <Menu.Item position="right" as={Link} to="/profile">
                  <Icon name="user outline"/> {name}
                  <Divider vertical />

                  <Icon name="dollar sign" /> {balance}

                </Menu.Item>
            ) : null
          }

      </Menu>
    </div>
  )
}

export default Header
