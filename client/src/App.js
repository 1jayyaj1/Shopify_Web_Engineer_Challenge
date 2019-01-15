import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Search from './components/search/search.js'
import Header from './components/header/header.js'
import SearchResults from './components/searchResults/searchResults.js'
import Favourites from './components/favourites/favourites.js'


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

  componentDidMount(){
    document.title = "Waste Lookup"
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

  clearSearchState = () => {
      this.setState({
        searchResults: [],
        searchResultAlert: "Get started by searching waste items",
      })
  };

  unFavouriteState = (favouritesList) => {
      this.setState({ favouritesList })
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
          <Header/>
          <div className="main-body">
            <Search onSearched={this.searchKeyword} clearSearch={this.clearSearchState} favouritesListToSearch={this.state.favouritesList}/>
            <SearchResults onFavourited={this.starClicked} searchResultsToTable={this.state.searchResults} searchResultAlertToTable={this.state.searchResultAlert}/>
            <Favourites unFavouriteToApp={this.unFavouriteState} searchResultsToTable={this.state.searchResults} favouritesToTable={this.state.favouritesList}/>
          </div>
      </div>
    );
  }
}

export default App;