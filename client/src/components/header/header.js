import React, { Component } from 'react';
import './header.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Label } from 'reactstrap';
import { Row, Col } from 'react-grid-system';

class header extends React.Component {

  render() {
    return (
      <Row className="main-header">
        <Col sm={12} className="main-header-col">
        	<Label className="main-header-text">
          		Toronto Waste Lookup
          	</Label>
        </Col>
      </Row>
    );
  }
}

export default header;