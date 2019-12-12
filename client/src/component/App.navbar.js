import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from 'reactstrap';
import RegisterModal from './auth/RegisterModal';

const AppNavbar = () => {

  const [ navExpand, toogle ] = useState(false)

  return(
    <div>
      <Navbar color="dark" dark expand="sm" className="mb-5">
        <Container>
          <NavbarBrand href="/">Shopping List</NavbarBrand>
          <NavbarToggler onClick={() => toogle(navExpand ? false : true)} />
          <Collapse isOpen={navExpand} navbar >
            <Nav className="ml-auto" navbar >
              <NavItem>
                <RegisterModal/>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default AppNavbar;