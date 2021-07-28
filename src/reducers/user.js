import {
  SEARCH_USER,
  SEARCH_USER_FAIL,
  SEARCH_USER_FOLLOWERS,
  SEARCH_USER_FOLLOWERS_FAIL,
} from "../actions/types";

const initialState = {
  userLoading: true,
  userResults: {},
};

const User = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SEARCH_USER:
      return {
        ...state,
        userResults: payload,
        userLoading: false,
      };
    case SEARCH_USER_FAIL:
      return { ...state };
    case SEARCH_USER_FOLLOWERS:
      return {
        ...state,
        followers: payload.followers,
        userIndex: payload.userIndex,
      };
    case SEARCH_USER_FOLLOWERS_FAIL:
      return { ...state };
    default:
      return state;
  }
};

export default User;
