import algoliasearch from 'algoliasearch';

export const index = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_API_KEY)
  .initIndex(process.env.ALGOLIA_SEARCH_INDEX);
