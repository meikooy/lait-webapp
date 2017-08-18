import React, {Component} from 'react';
// import {search as searchFromAlgolia} from './services/algolia';
import {index} from './services/algolia';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      searchResult: []
    };

    this.search = this.search.bind(this);
  }

  search(e) {
    console.log(e.target.value);
    const self = this;
    index.search(e.target.value, (err, content) => {
      if (err) {
        console.warn(err);
      } else {
        this.setState({searchResult: content.hits});
        console.log(content);
      }
    });
  }

  render() {
    return (
      <div>
        <h1>hacks</h1>
        <Search search={this.search} />
      </div>
    );
  }
};

class Search extends Component {
  render() {
    return (
        <form>
          <div className="form-group">
            <input onChange={this.props.search} type="text" className="form-control" id="exampleInputEmail1" placeholder="Hae"></input>
          </div>
        </form>
      );
  }
};
