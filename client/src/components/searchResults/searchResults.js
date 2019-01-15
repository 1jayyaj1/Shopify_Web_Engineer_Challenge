import React, { Component } from 'react';
import './searchResults.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Table, Form, FormGroup, Label, Input, FormFeedback, FormText } from 'reactstrap';
import { Container, Row, Col } from 'react-grid-system';
import searchIcon from'../../assets/search_icon.png';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

library.add(faStar);

var decode = require('decode-html');

class App extends React.Component {

  starClicked = (favouriteIncoming) => {
    this.props.onFavourited(favouriteIncoming);
  };

  createMarkup = (encodedHTML) => {
    return {__html: decode(encodedHTML)};
  };

  render() {
    return (
      <Row>
        <Table borderless className="resultTable">
          <tbody>
            {this.props.searchResultsToTable.length === 0 &&
              <label className="emptyListAlert">{this.props.searchResultAlertToTable}</label>
            }
            {this.props.searchResultsToTable.map((searchResult, index) => 
              <tr key={index}>
                <td className="searchResultsRow">
                  <Row>
                    <Col sm={5}>
                      <Row className="resultTitle">
                          {searchResult.isFavourite === false &&
                            <Button className="starButton" onClick={() => this.starClicked(searchResult, index)}>
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
                            <div className="greenStar">
                              <svg width="18" height="18">
                                <FontAwesomeIcon
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
    );
  }
}

export default App;