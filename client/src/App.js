import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Search from './components/search/search.js'
import Header from './components/header/header.js'
import { Button, Table, Form, FormGroup, Label, Input, FormFeedback, FormText } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Container, Row, Col } from 'react-grid-system';
import searchIcon from'./assets/search_icon.png';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

library.add(faStar);

var decode = require('decode-html');

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      starColor: "#aaaaaa",
      searchResults: [],
      favouritesList: [],
      searchResultAlert: "Get started by searching waste items"
     }
  }

  starClicked = (favouriteIncoming) => {
    if (favouriteIncoming.isFavourite === false) {
      const favourite = {
        id: this.state.favouritesList.length,
        title: favouriteIncoming.title,
        body: favouriteIncoming.body,
        isFavourite: !favouriteIncoming.isFavourite
      };
      favouriteIncoming.isFavourite = true;
      this.setState({
        favouritesList: [...this.state.favouritesList, favourite]
      })
    }
  };

  unFavourite = (favouriteOutgoing, index) => {
    this.state.searchResults.forEach(function(searchResult) {
      if (searchResult.title === favouriteOutgoing.title) {
        searchResult.isFavourite = false;
      }
    });
    favouriteOutgoing.isFavourite = false;
    const favouritesList = [...this.state.favouritesList]
    favouritesList.splice(index, 1)
    this.setState({ favouritesList })
  };

  clearSearchResults = () => {
      this.setState({
        searchResults: [],
        searchResultAlert: "Get started by searching waste items",
      })
  };

  createMarkup = (encodedHTML) => {
    return {__html: decode(encodedHTML)};
  };

  searchKeyword = (resultList, searchQuery) => {
    this.setState({ searchResults: resultList });
    if (resultList.length === 0) {
      this.setState({
        searchResultAlert: "Your search \"" + searchQuery + "\" did not match any waste items"
      })
    }
  };

  render() {
    return (
      <div className="App">
          <Row className="mainHeader">
            <Col sm={12} className="textMainHeader">
              Toronto Waste Lookup
            </Col>
          </Row>
          <div className="mainBody">
            <Search onSearched={this.searchKeyword} clearSearch={this.clearSearchResults} favouritesListToSearch={this.state.favouritesList}/>
            <Row>
              <Table borderless className="resultTable">
                <tbody>
                  {this.state.searchResults.length === 0 &&
                    <label className="emptyListAlert">{this.state.searchResultAlert}</label>
                  }
                  {this.state.searchResults.map((searchResult, index) => 
                    <tr key={index}>
                      <td className="searchResultsRow">
                        <Row>
                          <Col sm={5}>
                            <Row className="resultTitle">
                                {searchResult.isFavourite === false &&
                                  <Button className="starButton" onClick={() => this.starClicked(searchResult, index)}>
                                          <svg width="18" height="18">
                                            <FontAwesomeIcon
                                              className="startIcon"
                                              icon="star"
                                              color="#aaaaaa"
                                              size="2x"
                                            />
                                          </svg>
                                  </Button>
                                }
                                {searchResult.isFavourite === true &&
                                  <div className="greenStar">
                                    <svg width="18" height="18">
                                      <FontAwesomeIcon
                                        className="startIcon"
                                        icon="star"
                                        color="#22975e"
                                        size="2x"
                                      />
                                    </svg>
                                  </div>
                                }
                                <label className="searchResultTitle">
                                  {searchResult.title}
                                </label>
                            </Row>
                          </Col>
                          <Col sm={7} className="instructionList" dangerouslySetInnerHTML={this.createMarkup(searchResult.body)}>
                          </Col>
                        </Row> 
                      </td>
                    </tr> 
                  )}
                </tbody>
              </Table>
            </Row>
            <Row className="favouritesHeader">
              <Col sm={2} className="textFavouritesHeader">
                Favourites
              </Col>
            </Row>
            <Row className="favouritesList">
              <Table borderless className="resultTable">
                <tbody>
                  {this.state.favouritesList.length === 0 &&
                    <label className="emptyListAlert">Star your favourite waste items</label>
                  }
                  {this.state.favouritesList.map((favourite, index) => 
                    <tr key={index}>
                      <td className="searchResultsRow">
                        <Row>
                          <Col sm={5}>
                            <Row className="resultTitle">
                                <Button className="starButton" onClick={() => this.unFavourite(favourite, index)}>
                                  <svg width="18" height="18">
                                    <FontAwesomeIcon
                                      className="startIcon"
                                      icon="star"
                                      color="#22975e"
                                      size="2x"
                                    />
                                  </svg>
                                </Button>
                                <label className="searchResultTitle">
                                  {favourite.title}
                                </label>
                            </Row>
                          </Col>
                            <Col sm={7} className="instructionList" dangerouslySetInnerHTML={this.createMarkup(favourite.body)}>
                          </Col>
                        </Row> 
                      </td>
                    </tr> 
                  )}
                </tbody>
              </Table>
            </Row>
          </div>
      </div>
    );
  }
}

export default App;