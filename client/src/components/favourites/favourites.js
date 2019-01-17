import React from 'react';
import './favourites.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Table, Label } from 'reactstrap';
import { Row, Col } from 'react-grid-system';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faStar);

var decode = require('decode-html');

class favourites extends React.Component {

  // Removes the item from the list and receives props from App.js to update the list of favourites.
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

  // Instructions for waste items are received from back-end in HTML format,
  // this function converts these instructions in a list of bullet points.
  createMarkup = (encodedHTML) => {
    return {__html: decode(encodedHTML)};
  };

  render() {
    return (
      <div>
        <Row className="favourites-header">
          <Col sm={2} className="favourites-header-text">
            <Label>Favourites</Label>
          </Col>
        </Row>
        <Row className="favourites-list-row">
          {/* Receives props from App.js to check if the favourites list is empty. */}
          {this.props.favouritesToTable.length === 0 &&
            <Label className="empty-list-alert-favourite">
              Star your favourite waste items
            </Label>
          }
          <Table borderless>
            <tbody>
              {/* Receives props from App.js and maps each element of the favourite items list to the "favourite" variable. */}
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
                            {/* Display the favourite item title. */}
                            <Label className="favourite-item-title">
                              {favourite.title}
                            </Label>
                        </Row>
                      </Col>
                      {/* Display the favourite item instructions. */}
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