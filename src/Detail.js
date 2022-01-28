import React, { useContext, useEffect, useState } from 'react';
import { Navbar, Container, Nav, NavDropdown, Modal } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import './Detail.scss';
import { stockContext } from './App.js';
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';

let 박스 = styled.div`
  padding: 20px;
`;

let 제목 = styled.h4`
  font-size: 25px;
  color: ${props => props.색상};
`;

function Detail(props) {
  let [turn, turnChange] = useState(true);
  let [input, inputChange] = useState('');
  let [clickTap, clickTapChange] = useState(0);
  let [swich, swichChange] = useState(false);

  let stock = useContext(stockContext);

  useEffect(() => {
    let timer = setTimeout(() => {
      turnChange(false);
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  let { id } = useParams();
  let history = useHistory();
  let findPd = props.shoes.find(pd => pd.id == id);
  console.log(findPd);
  return (
    <div className='container'>
      <박스>
        <제목 className='red'>Detail</제목>
      </박스>
      {input}
      <input
        onChange={e => {
          inputChange(e.target.value);
        }}
      />
      {turn == true ? (
        <div className='my-alert my-alert2'>
          <p>재고가 얼마 남지 않았습니다.</p>
        </div>
      ) : null}
      <div className='row'>
        <div className='col-md-6'>
          <img
            src={
              'https://codingapple1.github.io/shop/shoes' +
              (findPd.id + 1) +
              '.jpg'
            }
            width='100%'
            alt=''
          />
        </div>
        <div className='col-md-6 mt-4'>
          <h4 className='pt-5'>{findPd.title}</h4>
          <p>{findPd.content}</p>
          <p>{findPd.price}원</p>
          <stockContext.Provider value={stock}>
            <Info />
          </stockContext.Provider>
          <button
            className='btn btn-danger'
            onClick={() => {
              props.dispatch({
                type: '항목추가',
                payload: { id: findPd.id, name: findPd.title, quan: 1 },
              });
              history.push('/cart');
            }}
          >
            주문하기
          </button>
          <button
            className='btn btn-danger'
            onClick={() => {
              history.goBack();
            }}
          >
            뒤로가기
          </button>
        </div>
      </div>

      <Nav className='mt-5' variant='tabs' defaultActiveKey='link-0'>
        <Nav.Item>
          <Nav.Link
            eventKey='link-0'
            onClick={() => {
              clickTapChange(0);
              swichChange(false);
            }}
          >
            Active
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey='link-1'
            onClick={() => {
              clickTapChange(1);
              swichChange(false);
            }}
          >
            Option 2
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <CSSTransition in={swich} classNames='wow' timeout={500}>
        <TabContent clickTap={clickTap} swichChange={swichChange} />
      </CSSTransition>
    </div>
  );
}

function TabContent(props) {
  useEffect(() => {
    props.swichChange(true);
  });

  if (props.clickTap === 0) {
    return <div>0번쨰 내용입니다.</div>;
  } else if (props.clickTap === 1) {
    return <div>1번쨰 내용입니다.</div>;
  } else if (props.clickTap === 2) {
    return <div>2번쨰 내용입니다.</div>;
  }
}

function Info(props) {
  let stock = useContext(stockContext);
  return <p>재고 :{stock[0]} </p>;
}

function state를props화(state) {
  console.log(state);
  return {
    state: state.reducer,
    alertOpen: state.reducer2,
  };
}
export default connect(state를props화)(Detail);
//export default Detail;
