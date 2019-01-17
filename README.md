# Web Engineer Intern Challenge for Shopify


## Hosted Version

Hello Hello Hello! Heres the link for the hosted version of this website: https://evening-forest-19899.herokuapp.com/


## Table of contents
1. [ Installation ](#install)
2. [ Usage ](#usage)
3. [ Technologies ](#tech)
4. [ Future Improvements ](#improv)


<a name="install"></a>
## Installation

*Node.js* is our friend here, so make sure to download and install it from this link: https://nodejs.org/en/. Then, navigate to the project's folder, and run these commands.

```
npm install   //Installs missing dependencies.
cd client
npm install   //Installs missing dependencies for the client folder.
cd ..
npm run dev   //Starts both the front-end and the back-end.
```


<a name="usage"></a>
## Usage

All of the required features for this challenge are successfully implemented. I took the opportunity to add a couple of minor improvements to make the experience more enjoyable!

### 1. Field validation

If the user tries to search for waste items while the input field is empty, they get alerted of the error, and the API call is not performed.

### 2. Searched keyword converted to lower-case

In the data JSON file, keywords are all in lower-case characters. Therefore, I made sure that my back-end converts the searched keyword to lower-case characters before finding matching results in the data JSON file.

### 3. Responsive UI using Bootstrap for ReactJS

The UI of this website was made responsive using a ReactJS version of Bootstrap called Reactstrap. The website is tested to be responsive on laptops, tablets, and mobile phones.

### 4. No search results message

A message is displayed to the user when there are no results associated with a searched keyword. This way, the user has a way to know that the search operation was not completed.


<a name="tech"></a>
## Technologies

Can you think of a better duo than peanut butter and jelly? Yeah, it's called using ReactJS for the front-end and Express.js for the back-end. Thanks to Heroku, this project is deployed online for testing purposes. (link to the hosted version is above)

<a name="improv"></a>
## Future Improvements

I didn't want to alter the proposed UI in the provided screenshot by adding extra features. However, I did think of creative future improvements for this project.

### 1. Pages for search results

Some keyword searches might return too many results to fit in a single page. It would, therefore, be great to split these results into pages that could be viewed by the user without scrolling.

### 2. Similar keywords when a search has no matching results

When a user enters a keyword with a spelling mistake, it would be favorable to use a library that searches for similar words to return potential keywords to the user. This way, the user will not have to type their keyword everytime they mess it up.

### 3. Clear all favourites button

Currently, users remove items from their favourites list by selecting each item individually. Implementing a button that would clear the entire favourites list would improve the UX as the list grows larger.
