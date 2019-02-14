import React from 'react';
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
      searchResults: [],  // List that contains the results of a searched keyword.
      favouritesList: [], // List that contains the elements that were favourited.
      searchResultAlert: "Get started by searching waste items" // Default message when no keywords are searched.
     }
  }

  // Creates a JS object in the same format as the one got from the JSON file.
  // Adds this JS object to the list of favourites.
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

  // Using props, we trigger this function from search.js.
  clearSearchState = () => {
    this.setState({
      searchResults: [],
      searchResultAlert: "Get started by searching waste items",
    })
  };

  // Using props, we trigger this function from favourites.js
  unFavouriteState = (favouritesList) => {
      this.setState({ favouritesList })
  };

  // Using props, we trigger this function from search.js
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