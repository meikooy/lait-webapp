import React, {Component} from 'react';
import {index} from './services/algolia';

import SearchInput from './components/search/search-input';
import SearchResults from './components/search/search-results';

var track;

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      searchResults: [],
      loading: false
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.openUrl = this.openUrl.bind(this);
    this.searchFromAlgolia = this.searchFromAlgolia.bind(this);
    this.getUrlParams = this.getUrlParams.bind(this);
  }

  componentDidMount() {
    const searchParam = this.getUrlParams('q');
    if (searchParam && searchParam.length) {
      this.searchFromAlgolia(searchParam);
      const inputField = document.getElementById('search-input-field');
      if (inputField) inputField.value = searchParam;
    }
  }

  onInputChange(e) {
    e.preventDefault();
    let searchWord = e.target.value;

    if (searchWord && searchWord.length) {
      this.setState({loading: true});
      this.searchFromAlgolia(e.target.value);
    } else {
      this.setState({searchResults: []});
    }
  }

  searchFromAlgolia(searchWord) {
    // Track analytics
    if (window.ga) {
      if (track) clearTimeout(track);
      track = setTimeout(function() {
        ga('send', 'pageview', '/?q=' + searchWord);
      }, 2000);
    }

    return index.search(searchWord, (err, content) => {
      if (err) {
        console.warn(err);
        this.setState({loading: false});
      } else {
        this.setState({searchResults: content.hits, loading: false});
      }
      });
  }

  getUrlParams(prop) {
    var params = {};
    var search = decodeURIComponent( window.location.href.slice( window.location.href.indexOf( '?' ) + 1 ) );
    var definitions = search.split('&');

    definitions.forEach( function( val, key ) {
        var parts = val.split( '=', 2 );
        params[ parts[ 0 ] ] = parts[ 1 ];
    } );

    return (prop && prop in params ) ? params[ prop ] : params;
}

  openUrl(url) {
    window.open(url);
  }

  render() {
    return (
      <div>
          <SearchInput search={this.onInputChange}/>
          <SearchResults openUrl={this.openUrl} results={this.state.searchResults} />
      </div>
    );
  }
};
