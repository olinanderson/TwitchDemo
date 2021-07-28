import { SEARCH_CHANNEL, SEARCH_CHANNEL_FAIL } from "../actions/types";

const initialState = {
  channelsLoading: true,
  query: [],
};

const Search = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SEARCH_CHANNEL:
      return {
        ...state,
        query: payload,
        channelsLoading: false,
      };
    case SEARCH_CHANNEL_FAIL:
      return { ...state };

    default:
      return state;
  }
};

export default Search;
