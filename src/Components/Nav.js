import React, {Fragment} from 'react'
import {Menu, Button} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

const Nav = (props) => {
  return(
    <div>
      <Menu inverted>
          <Menu.Item as={Link} to="/" header>
            The Horseland Game
          </Menu.Item>
          {
            props.playerName ? (
                <Fragment>
                  <Menu.Item as={Link} to="/horses">
                    Horses
                  </Menu.Item>
                  <Menu.Item as={Link} to="/shows">
                    Shows
                  </Menu.Item>
                  <Menu.Menu position="right">
                    <Menu.Item as={Link} to="/profile">
                      <Button
                         content={props.playerName}
                         icon='user outline'
                         label={{ basic: true, content: props.balance }}
                         labelPosition='right'
                         color="violet"
                         inverted
                       />

                    </Menu.Item>
                    <Menu.Item>
                      <Button inverted color="violet" onClick={props.logout}>Logout</Button>
                    </Menu.Item>
                  </Menu.Menu>
                </Fragment>
            ) : null
          }

      </Menu>
    </div>
  )
}

export default Nav
