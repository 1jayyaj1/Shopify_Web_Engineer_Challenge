import React from 'react';
import './search.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, FormGroup, Input, FormFeedback } from 'reactstrap';
import { Row, Col } from 'react-grid-system';
import searchIcon from'../../assets/search_icon.png';
import axios from 'axios';

class search extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      invalidSearch: null,  // This state variable is used to detect if the input field is empty.
     }
  };

  // Checks whether the input field is empty.
  // If it is the case, it receives props from App.js to clear the search results.
  handleSearchChange = () => {
    const searchQuery = this._search.value;
    if (searchQuery.length === 0) {
      this.props.clearSearch();
    }
  };

  // Checks if the "enter" key is pressed. (code 13)
  // If so, calls the submit function to perform the search.
  enterPressed(event) {
    var code = event.keyCode || event.which;
    if(code === 13) {
        this.handleSubmit(event);
    } 
  };

  // Sends searched keyword to back-end in order to find matching waste items.
  handleSubmit = event => {
    var searchQuery = this._search.value; // Keyword searched by the user.
    if (searchQuery.length > 0) { // Makes sure that the searched keyword has at least one character.
      this.setState({
        invalidSearch: null
      })
      event.preventDefault();
      const reactData = {"title": searchQuery};
      axios.post("/", reactData)
        .then(res => {
          for (var favouriteItem in this.props.favouritesListToSearch) {  // Checks if some of the search results were favourited by the user.
            for (var item in res.data) {
              if(this.props.favouritesListToSearch[favouriteItem].title === res.data[item].title) { // If so, set the search result to favourite.
                res.data[item].isFavourite = true;
              }
            }
          }
          this.props.onSearched(res.data, searchQuery); // Receives props from App.js to fill the list of search results and display them.
        })
       .catch(err => console.log(err.data))
    }
    else {
      this.setState({
        invalidSearch: true
      })
    }
  };

  render() {
    return (
      <Row className="search-row">
        <Col sm={11} xs={9}>
          <FormGroup className="search-form">
            <Input required type="text" className="search-input" invalid={this.state.invalidSearch} placeholder="Search by keyword..." innerRef={(node) => this._search = node} onKeyPress={this.enterPressed.bind(this)} onChange={this.handleSearchChange}/>
            <FormFeedback className="invalid-search-alert">You can't leave this empty.</FormFeedback>
          </FormGroup>
        </Col>
        <Col sm={1} xs={3}className="search-button-col">
          <Button className="search-button" onClick={this.handleSubmit}>
            <img src={searchIcon} className="search-button-icon" alt="Search_icon"/>
          </Button>
        </Col>
      </Row>
    );
  }
}

export default search;