import React, { Component } from 'react';
import './favourites.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Table, Label } from 'reactstrap';
import { Row, Col } from 'react-grid-system';
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
        <Row className="favourites-header">
          <Col sm={2} className="favourites-header-text">
            <Label>
              Favourites
            </Label>
          </Col>
        </Row>
        <Row className="favourites-list-row">
          <Table borderless className="favourite-items-table">
            <tbody>
              {this.props.favouritesToTable.length === 0 &&
                <Label className="empty-list-alert">Star your favourite waste items</Label>
              }
              {this.props.favouritesToTable.map((favourite, index) => 
                <tr key={index}>
                  <td className="favourite-item-row">
                    <Row>
                      <Col sm={5}>
                        <Row className="favourite-title-row">
                            <Button className="star-button" onClick={() => this.unFavourite(favourite, index)}>
                              <svg width="18" height="18">
                                <FontAwesomeIcon
                                  icon="star"
                                  color="#22975e"
                                  size="2x"
                                />
                              </svg>
                            </Button>
                            <Label className="favourite-item-title">
                              {favourite.title}
                            </Label>
                        </Row>
                      </Col>
                        <Col sm={7} className="favourite-item-instructions" dangerouslySetInnerHTML={this.createMarkup(favourite.body)}>
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