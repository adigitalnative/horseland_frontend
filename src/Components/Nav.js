import React from 'react'
import {Menu, Icon, Divider} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

const Nav = (props) => {
  return(
    <div>
      <Menu inverted>
          <Menu.Item as={Link} to="/" header>
            Horseland
          </Menu.Item>
          <Menu.Item as={Link} to="/horses">
            Horses
          </Menu.Item>
          {
            props.name ? (
                <Menu.Item position="right" as={Link} to="/profile">
                  <Icon name="user outline"/> {props.name}
                  <Divider vertical />

                  <Icon name="dollar sign" /> {props.balance}

                </Menu.Item>
            ) : null
          }

      </Menu>
    </div>
  )
}

export default Nav
