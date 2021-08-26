import React from 'react';
import {Container} from 'semantic-ui-react';
import Header from './Header';

const Layout = (props) => {
  return (
    <Container style={{marginTop: '20px'}}>
      <Header />
      {props.children}
    </Container>
  );
}

export default Layout;
