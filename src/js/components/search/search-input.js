import React, {Component} from 'react';
import {FormGroup, FormControl} from 'react-bootstrap';

export default class Search extends Component {
  render() {
    const {search} = this.props;

    return (
      <div className="search-wrapper">
          <form onSubmit={e => e.preventDefault()}>
            <div className="form-group">
              <FormGroup>
                <FormControl
                  type='text'
                  id='search-input-field'
                  placeholder='Hae'
                  onChange={search}>
                </FormControl>
              </FormGroup>
            </div>
          </form>
      </div>
      );
  }
};

