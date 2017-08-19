import React, {Component} from 'react';
import {FormGroup, FormControl} from 'react-bootstrap';

export default class Search extends Component {
  render() {
    const {search} = this.props;

    return (
      <div className="search-wrapper">
          <form>
            <div className="form-group">
              <FormGroup>
                <FormControl
                  type='text'
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

