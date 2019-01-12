import React, { Component, input } from 'react';
import './App.css';
import { Button, Table } from 'reactstrap';
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
      name: '',
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

  handleSearchChange = () => {
    const searchQuery = this._search.value;
    if (searchQuery.length === 0) {
      this.setState({
        searchResults: []
      })
    }
  };

  enterPressed(event) {
    var code = event.keyCode || event.which;
    if(code === 13) {
        this.handleSubmit(event);
    } 
  }

  createMarkup = (encodedHTML) => {
    return {__html: decode(encodedHTML)};
  };



  handleSubmit = event => {
    event.preventDefault();
    const searchQuery = this._search.value
    const reactData = {"title": searchQuery};
    axios.post("/", reactData)
       .then(res => this.setState({ searchResults: res.data }))
       .catch(err => console.log(err.data))
  }

  render() {
    return (
      <div className="App">
          <Row className="mainHeader">
            <Col sm={12} className="textMainHeader">
              Toronto Waste Lookup
            </Col>
          </Row>
          <Row className="searchBoxParent">
            <Col sm={11}>
               <input type="text" name="name" className="searchBox" ref={input => this._search = input} onKeyPress={this.enterPressed.bind(this)} onChange={this.handleSearchChange}/>
            </Col>
            <Col sm={1}>
              <Button className="searchButton" onClick={this.handleSubmit}>
               <img src={searchIcon}/>
              </Button>
            </Col>
          </Row>
          <Row>
            <Table borderless>
              <tbody>
                {this.state.searchResults.map((searchResult, index) => 
                  <tr key={index}>
                    <td className="searchResultsRow">
                      <Row>
                        <Col sm={5}>
                          <Row>
                            <Col sm={1}>
                              {searchResult.isFavourite === false &&
                                <Button className="starButton" onClick={() => this.starClicked(searchResult, index)}>
                                      {searchResult.isFavourite === false &&
                                        <FontAwesomeIcon
                                          className="startIcon"
                                          icon="star"
                                          color="#aaaaaa"
                                          size="2x"
                                        />
                                      }
                                </Button>
                              }
                              {searchResult.isFavourite === true &&
                                <FontAwesomeIcon
                                  className="startIcon"
                                  icon="star"
                                  color="#22975e"
                                  size="2x"
                                />
                              }
                            </Col>
                            <Col sm={11} className="searchResultTitle">
                              {searchResult.title}
                            </Col>
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
            <Table borderless>
              <tbody>
                {this.state.favouritesList.map((favourite, index) => 
                  <tr key={index}>
                    <td className="searchResultsRow">
                      <Row>
                        <Col sm={5}>
                          <Row>
                            <Col sm={1}>
                              <Button className="starButton" onClick={() => this.unFavourite(favourite, index)}>
                                <FontAwesomeIcon
                                  className="startIcon"
                                  icon="star"
                                  color="#22975e"
                                  size="2x"
                                />
                              </Button>
                            </Col>
                            <Col sm={11} className="searchResultTitle">
                              {favourite.title}
                            </Col>
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
    );
  }
}

export default App;