import algoliasearch from 'algoliasearch';

const index = algoliasearch('app_id', 'apiKey').initIndex('lakipykäläd');

export const Search = (params) => {
  return index.search(params, (err, content) => {
    if (err) {
      console.warn(err);
    } else {
      console.log(content);
      return content;
    }
  });
};

