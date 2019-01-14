import React, { Component } from 'react';
import './header.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Table, Form, FormGroup, Label, Input, FormFeedback, FormText } from 'reactstrap';
import { Container, Row, Col } from 'react-grid-system';

class header extends React.Component {

  render() {
    return (
      <Row className="mainHeader">
        <Col sm={12} className="textMainHeader">
          Toronto Waste Lookup
        </Col>
      </Row>
    );
  }
}

export default header;