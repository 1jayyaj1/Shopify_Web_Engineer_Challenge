import React, { Component } from 'react';
import './search.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { Row, Col } from 'react-grid-system';
import searchIcon from'../../assets/search_icon.png';

import axios from 'axios';

class search extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      invalidSearch: null,
     }
  }

  handleSearchChange = () => {
    const searchQuery = this._search.value;
    if (searchQuery.length === 0) {
      this.props.clearSearch();
    }
  };

  enterPressed(event) {
    var code = event.keyCode || event.which;
    if(code === 13) {
        this.handleSubmit(event);
    } 
  }

  handleSubmit = event => {
    var searchQuery = this._search.value;
    if (searchQuery.length > 0) {
      this.setState({
        invalidSearch: null
      })
      event.preventDefault();
      const reactData = {"title": searchQuery};
      axios.post("/", reactData)
        .then(res => {
          for (var favouriteItem in this.props.favouritesListToSearch) {
            for (var item in res.data) {
              if(this.props.favouritesListToSearch[favouriteItem].title === res.data[item].title) {
                res.data[item].isFavourite = true;
              }
            }
          }
          this.props.onSearched(res.data, searchQuery);
        })
       .catch(err => console.log(err.data))
    }
    else {
      this.setState({
        invalidSearch: true
      })
    }
  }

  render() {
    return (
      <Row className="search-row">
        <Col sm={11} xs={9}>
          <FormGroup className="search-form">
            <Input required type="text" className="search-input" invalid={this.state.invalidSearch} placeholder="Search waste item by keyword..." innerRef={(node) => this._search = node} onKeyPress={this.enterPressed.bind(this)} onChange={this.handleSearchChange}/>
            <FormFeedback className="invalid-search-alert">You can't leave this empty.</FormFeedback>
          </FormGroup>
        </Col>
        <Col sm={1} xs={2}className="search-button-col">
          <Button className="search-button" onClick={this.handleSubmit}>
            <img src={searchIcon} className="search-button-icon"/>
          </Button>
        </Col>
      </Row>
    );
  }
}

export default search;