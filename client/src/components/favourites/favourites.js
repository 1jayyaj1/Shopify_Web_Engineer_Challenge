import React, { Component } from 'react';
import './favourites.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Table, Form, FormGroup, Label, Input, FormFeedback, FormText } from 'reactstrap';
import { Container, Row, Col } from 'react-grid-system';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faStar);

var decode = require('decode-html');

class favourites extends React.Component {

  unFavourite = (favouriteOutgoing, index) => {
    this.props.searchResultsToTable.forEach(function(searchResult) {
      if (searchResult.title === favouriteOutgoing.title) {
        searchResult.isFavourite = false;
      }
    });
    favouriteOutgoing.isFavourite = false;
    const favouritesList = [...this.props.favouritesToTable];
    favouritesList.splice(index, 1);
    this.props.unFavouriteToApp(favouritesList);
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
      <div>
        <Row className="favouritesHeader">
          <Col sm={2} className="textFavouritesHeader">
            Favourites
          </Col>
        </Row>
        <Row className="favouritesList">
          <Table borderless className="resultTable">
            <tbody>
              {this.props.favouritesToTable.length === 0 &&
                <label className="emptyListAlert">Star your favourite waste items</label>
              }
              {this.props.favouritesToTable.map((favourite, index) => 
                <tr key={index}>
                  <td className="searchResultsRow">
                    <Row>
                      <Col sm={5}>
                        <Row className="resultTitle">
                            <Button className="starButton" onClick={() => this.unFavourite(favourite, index)}>
                              <svg width="18" height="18">
                                <FontAwesomeIcon
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
    );
  }
}

export default favourites;