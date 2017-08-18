import algoliasearch from 'algoliasearch';

export const index = algoliasearch('7TTO1VGWCS', 'dd2a32c4c900fe02301cc8f563986e0c').initIndex('sections');

// export const search = (params) => {
//   return index.search(params, (err, content) => {
//     if (err) {
//       console.warn(err);
//     } else {
//       console.log(content);
//       return content.hits;
//     }
//   });
// };

