import { Navbar, Container, Nav, NavDropdown, Modal } from 'react-bootstrap';
import './App.css';
import React, { useState, useContext, lazy, Suspense } from 'react';
import Data from './data.js';
// import Detail from './Detail.js';
import Cart from './Cart.js';
import axios from 'axios';
import { Link, Route, Switch, useHistory } from 'react-router-dom';

let Detail = lazy(() => import('./Detail.js'));
export let stockContext = React.createContext();

function App() {
  let [shoes, shoesChange] = useState(Data);
  let [loding, lodingChange] = useState(false);
  let [stock, stockChange] = useState([10, 11, 12]);

  return (
    <div className='App'>
      <Navbar bg='light' expand='lg'>
        <Container>
          <Navbar.Brand href='#home'>ShoeShop</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'>
              <Nav.Link as={Link} to='/'>
                Home
              </Nav.Link>
              <Nav.Link as={Link} to='/detail/0'>
                detail
              </Nav.Link>
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

      <Switch>
        <Route exact path='/'>
          <div className='jumbotron'>
            <div className='box'></div>
            <h1 className='jumbotron-title'>20% Season Off</h1>
            <br />
            <span className='jumbotron-word'>
              this is a simple hero unit, a simple jumbotron-style component{' '}
              <br />
              for calling extra attention to featured content or information.
            </span>
            <br />
            <button className='jumbotron-btn'>Learn more</button>
          </div>
          <div className='container'>
            <stockContext.Provider value={stock}>
              <div className='row'>
                {shoes.map((item, idx) => {
                  return <Product key={idx} shoes={shoes[idx]} idx={idx} />;
                })}
              </div>
            </stockContext.Provider>
            {loding == true ? <div>????????? ????????? ~</div> : null}
            <button
              className='btn btn-primary'
              onClick={() => {
                lodingChange(true);

                axios
                  .get('https://codingapple1.github.io/shop/data2.json')
                  .then(result => {
                    lodingChange(false);
                    shoesChange([...shoes, ...result.data]);
                  })
                  .catch(() => {
                    lodingChange(false);
                    console.log('???????????????');
                  });
              }}
            >
              ?????????
            </button>
          </div>
        </Route>

        <Route path='/detail/:id'>
          <stockContext.Provider value={stock}>
            <Suspense fallback={<div>??????????????????</div>}>
              <Detail shoes={shoes} stock={stock} stockChange={stockChange} />
            </Suspense>
          </stockContext.Provider>
        </Route>

        <Route path='/cart'>
          <Cart></Cart>
        </Route>

        <Route path='/:id'>
          <div>???????????? ???????????? ?????? ????????????</div>
        </Route>
      </Switch>
    </div>
  );
}

function Product(props) {
  let stock = useContext(stockContext);
  let history = useHistory();

  return (
    <div
      className='col-md-4'
      onClick={() => {
        history.push('/detail/' + props.shoes.id);
      }}
    >
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
        <Test></Test>
      </p>
    </div>
  );
}
function Test() {
  let stock = useContext(stockContext);

  return <p>??????: {stock[0]}</p>;
}
export default App;
