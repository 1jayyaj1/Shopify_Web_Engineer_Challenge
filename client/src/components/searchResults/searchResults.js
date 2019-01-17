import React from 'react';
import './searchResults.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Table, Label } from 'reactstrap';
import { Row, Col } from 'react-grid-system';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faStar);

var decode = require('decode-html');

class searchResults extends React.Component {

  // Receives props from App.js to add a search result to the list of favourites.
  starClicked = (favouriteIncoming) => {
    this.props.onFavourited(favouriteIncoming);
  };

  // Instructions for waste items are received from back-end in HTML format,
  // this function converts these instructions in a list of bullet points.
  createMarkup = (encodedHTML) => {
    return {__html: decode(encodedHTML)};
  };

  render() {
    return (
      <Row className="test">
     
          {/* When there are no search results, it receives props from App.js to display an alert. (empty list or no search results) */}
          {this.props.searchResultsToTable.length === 0 &&
            <Label className="empty-list-alert-search">
              {this.props.searchResultAlertToTable}
            </Label>
          }
       
        <Table borderless className="waste-items-table">
          <tbody>
            {/* Receives props from App.js and maps each element of the search result list to the "searchResult" variable. */}
            {this.props.searchResultsToTable.map((searchResult, index) => 
              <tr key={index}>
                <td className="waste-items-row">
                  <Row>
                    <Col sm={5}>
                      <Row className="waste-item-title-row">
                        {/* If the item is not favourited, render a grey star button. */}
                        {searchResult.isFavourite === false &&
                          <Button className="star-button" onClick={() => this.starClicked(searchResult, index)}>
                                  <svg width="18" height="18">
                                    <FontAwesomeIcon
                                      icon="star"
                                      color="#aaaaaa"
                                      size="2x"
                                    />
                                  </svg>
                          </Button>
                        }
                        {/* If the item is favourited, render a green star icon. */}
                        {searchResult.isFavourite === true &&
                          <div className="green-star">
                            <svg width="18" height="18">
                              <FontAwesomeIcon
                                icon="star"
                                color="#22975e"
                                size="2x"
                              />
                            </svg>
                          </div>
                        }
                        {/* Display the search result title. */}
                        <Label className="waste-item-title">
                          {searchResult.title}
                        </Label>
                      </Row>
                    </Col>
                    {/* Display the search result instructions. */}
                    <Col sm={7} className="waste-item-instructions" dangerouslySetInnerHTML={this.createMarkup(searchResult.body)}>
                    </Col>
                  </Row> 
                </td>
              </tr> 
            )}
          </tbody>
        </Table>
      </Row>
    );
  }
}

export default searchResults;