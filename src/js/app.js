import React, {Component} from 'react';
import {index} from './services/algolia';
import {Row} from 'react-bootstrap';

import SearchInput from './components/search/search-input';
import SearchResults from './components/search/search-results';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      searchResults: [],
      loading: false
    };

    this.search = this.search.bind(this);
    this.openUrl = this.openUrl.bind(this);
  }

  search(e) {
    e.preventDefault();
    let searchWord = e.target.value;

    if (searchWord && searchWord.length) {

      this.setState({loading: true});

      index.search(e.target.value, (err, content) => {
        if (err) {
          console.warn(err);
          this.setState({loading: false});
        } else {
          this.setState({searchResults: content.hits, loading: false});
          console.log(content);
        }
      });
    } else {
      this.setState({searchResults: []});
    }
  }

  openUrl(url) {
    window.open(url);
  }

  render() {
    return (
      <div>
          <SearchInput search={this.search}/>
          <SearchResults openUrl={this.openUrl} isLoading={this.state.loading} results={this.state.searchResults} />
      </div>
    );
  }
};
