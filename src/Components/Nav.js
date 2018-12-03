import React from 'react'
import {Menu, Icon, Divider} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

const Nav = (props) => {
  console.log(props)
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
            props.playerName ? (
                <Menu.Item position="right" as={Link} to="/profile">
                  <Icon name="user outline"/> {props.playerName}
                  <Divider vertical />

                  <Icon name="dollar sign" /> {props.balance}
                  <button onClick={props.logout}>Logout</button>
                </Menu.Item>
            ) : null
          }

      </Menu>
    </div>
  )
}

export default Nav
