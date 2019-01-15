import React, { Component } from 'react';
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

  starClicked = (favouriteIncoming) => {
    this.props.onFavourited(favouriteIncoming);
  };

  createMarkup = (encodedHTML) => {
    return {__html: decode(encodedHTML)};
  };

  render() {
    return (
      <Row>
        <Table borderless className="waste-items-table">
          <tbody>
            {this.props.searchResultsToTable.length === 0 &&
              <Label className="empty-list-alert">{this.props.searchResultAlertToTable}</Label>
            }
            {this.props.searchResultsToTable.map((searchResult, index) => 
              <tr key={index}>
                <td className="waste-items-row">
                  <Row>
                    <Col sm={5}>
                      <Row className="waste-item-title-row">
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
                          <Label className="waste-item-title">
                            {searchResult.title}
                          </Label>
                      </Row>
                    </Col>
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