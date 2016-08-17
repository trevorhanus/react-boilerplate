import state from '../state';

export default function updateQuery(payload) {
  const {query} = payload;

  state.searchQuery = query;
}
