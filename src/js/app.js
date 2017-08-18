import React, {Component} from 'react';

export default class App extends Component {
  render() {
    return (
      <div>
        <h1>hacks</h1>
        <Search />
      </div>
    );
  }
};

const Search = () => {
  return (
      <form>
        <div className="form-group">
          <input type="text" className="form-control" id="exampleInputEmail1" placeholder="Hae"></input>
        </div>
      </form>
  );
};
