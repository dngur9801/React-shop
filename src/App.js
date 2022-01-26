import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import './App.css';
import React, { useState } from 'react';
import Data from './data.js';

function App() {
  let [shoes, shoesChange] = useState(Data);
  return (
    <div className='App'>
      <Navbar bg='light' expand='lg'>
        <Container>
          <Navbar.Brand href='#home'>ShoeShop</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'>
              <Nav.Link href='#home'>Home</Nav.Link>
              <Nav.Link href='#link'>Link</Nav.Link>
              <NavDropdown title='Dropdown' id='basic-nav-dropdown'>
                <NavDropdown.Item href='#action/3.1'>Action</NavDropdown.Item>
                <NavDropdown.Item href='#action/3.2'>
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href='#action/3.3'>
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href='#action/3.4'>
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className='jumbotron'>
        <h1 className='jumbotron-title'>20% Season Off</h1>
        <br />
        <span className='jumbotron-word'>
          this is a simple hero unit, a simple jumbotron-style component <br />
          for calling extra attention to featured content or information.
        </span>
        <br />
        <button className='jumbotron-btn'>Learn more</button>
      </div>

      <div className='container'>
        <div className='row'>
          {shoes.map((item, idx) => {
            return <Product key={idx} shoes={shoes[idx]} idx={idx} />;
          })}
        </div>
      </div>
    </div>
  );
}

function Product(props) {
  return (
    <div className='col-md-4'>
      <img
        src={
          'https://codingapple1.github.io/shop/shoes' + (props.idx + 1) + '.jpg'
        }
        alt=''
        width='100%'
      />
      <h4>{props.shoes.title}</h4>
      <p>
        {props.shoes.content} & {props.shoes.price}
      </p>
    </div>
  );
}

export default App;
