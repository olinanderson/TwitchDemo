import axios from "axios";

import {
  SEARCH_USER,
  SEARCH_USER_FAIL,
  SEARCH_USER_FOLLOWERS,
  SEARCH_USER_FOLLOWERS_FAIL,
} from "./types";

// Search for user by Id
export const getUser =
  ({ userId }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Client-ID": "y1c2ar47095x8bq9ubg5zhr0zx3ch2",
        Accept: "application/vnd.twitchtv.v5+json",
        Authorization: "Bearer h6ihcddxtoi7i0ryqwp2ei4qunrfav",
      },
    };

    try {
      const res = await axios.get(
        "https://api.twitch.tv/helix/users?id=" + userId,
        config
      );

      dispatch({
        type: SEARCH_USER,
        payload: res.data.data[0],
      });
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        console.log(errors.msg);
      }

      dispatch({
        type: SEARCH_USER_FAIL,
      });
    }
  };

export const getFollowers =
  ({ userId, userIndex }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Client-ID": "y1c2ar47095x8bq9ubg5zhr0zx3ch2",
        Accept: "application/vnd.twitchtv.v5+json",
        Authorization: "Bearer h6ihcddxtoi7i0ryqwp2ei4qunrfav",
      },
    };

    try {
      const res = await axios.get(
        "https://api.twitch.tv/helix/users/follows?to_id=" + userId,
        config
      );

      dispatch({
        type: SEARCH_USER_FOLLOWERS,
        payload: { followers: res.data.total, userIndex: userIndex },
      });
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        console.log(errors.msg);
      }

      dispatch({
        type: SEARCH_USER_FOLLOWERS_FAIL,
      });
    }
  };
