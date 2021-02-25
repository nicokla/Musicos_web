
// For the default version
import algoliasearch from 'algoliasearch';

// For the search only version
// import algoliasearch from 'algoliasearch/lite';

const client = algoliasearch('SKJIA8T5Z2', '5e2190935369d22de34d9ff049391343');
const indexUsers = client.initIndex('users');
const indexSongs = client.initIndex('songs');

export {client, indexUsers, indexSongs}
