# Web Engineer Intern Challenge for Shopify


## Table of contents
1. [ Installation ](#install)
2. [ Usage ](#usage)
3. [ Technologies ](#tech)
4. [ Future Improvements ](#improv)


<a name="install"></a>
## Installation

*Node.js* is our friend here, so make sure to download and install it from this link: https://nodejs.org/en/. Then, navigate to the project's folder, and run these commands.

```
npm install   //Installs missing dependencies
npm run dev   //Starts both the front-end and the back-end
```


<a name="usage"></a>
## Usage

All of the required features for this challenge are successfully implemented. I took the opportunity to add a couple of minor improvements to make the experience more enjoyable!

### 1. Field validation

If the user tries to search for waste items while the input field is empty, they get alerted of the error, and the API call is not performed.

### 2. Empty list messages

When the favorite waste items list, and/or the search results list are empty, the user gets prompted on how to get started.

### 3. No search results message

The user gets prompted when there are no results associated with a searched keyword.


<a name="tech"></a>
## Technologies

Can you think of a better duo than peanut butter and jelly? Yeah, it's called using ReactJS for the front-end and Express.js for the back-end. Thanks to Heroku, this project is deployed online for testing purposes.


<a name="improv"></a>
## Future Improvements

Although I didn't want to alter the proposed UI in the provided screenshot by adding extra features, I did think of creative future improvements for this project.

### 1. Pages for search results

Some keyword searches might return too many results to fit in a single page. It would, therefore, be great to split these results into pages that could be viewed by the user without scrolling.

### 2. Clear all favorites button

Currently, users remove items from their favorites list by selecting each item individually. Implementing a button that would clear the entire favorites list would improve the user experience as the list grows larger.

### 3. Similar keywords when a search has no matching results

When a user enters a keyword with a spelling mistake, it would be favorable to use a library that searches for similar words to return potential keywords to the user. This way, the user will not have to type their keyword everytime they mess it up.
