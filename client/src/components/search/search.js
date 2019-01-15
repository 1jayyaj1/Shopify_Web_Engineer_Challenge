import React, { Component } from 'react';
import './search.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Table, Form, FormGroup, Label, Input, FormFeedback, FormText } from 'reactstrap';
import { Container, Row, Col } from 'react-grid-system';
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
          console.log(res.data)
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
      console.log("lol")
      this.setState({
        invalidSearch: true
      })
    }
  }

  render() {
    return (
      <Row className="searchRow">
        <Col sm={11}>
          <FormGroup className="searchBoxParent">
            <Input required type="text" className="searchBox" invalid={this.state.invalidSearch} placeholder="Search waste items by keyword..." innerRef={(node) => this._search = node} onKeyPress={this.enterPressed.bind(this)} onChange={this.handleSearchChange}/>
            <FormFeedback className="invalidSearchAlert">You can't leave this empty.</FormFeedback>
          </FormGroup>
        </Col>
        <Col sm={1} className="searchButtonParent">
          <Button className="searchButton" onClick={this.handleSubmit}>
            <img src={searchIcon} className="searchButtonIcon"/>
          </Button>
        </Col>
      </Row>
    );
  }
}

export default search;