import React, {Component} from 'react';

export default class SearchResults extends Component {
  render() {
    const {results, openUrl} = this.props;

    return (
      <div className="results">
        {results && results.map((r, index) => {
            return (
              <div onClick={_ => openUrl(r.url)} key={index} className="result clearfix">
                <h3 dangerouslySetInnerHTML={{__html: r._highlightResult.law.title.value}}></h3>
                <div dangerouslySetInnerHTML={{__html: r._highlightResult.content.value}}></div>

                <aside>
                  <span className="text-primary">{r.law.year}</span>
                  <span className="text-success">{r.title}</span>
                </aside>
              </div>
            );
          })}
      </div>
    );
  }
}
