import axios from "axios";

import { SEARCH_CHANNEL, SEARCH_CHANNEL_FAIL } from "./types";

// Search for channel
export const search =
  ({ searchQuery }) =>
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
        "https://api.twitch.tv/helix/search/channels?query=" +
          searchQuery.replaceAll(" ", "%20"),

        config
      );

      dispatch({
        type: SEARCH_CHANNEL,
        payload: res.data.data,
      });
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        console.log(errors.msg);
      }

      dispatch({
        type: SEARCH_CHANNEL_FAIL,
      });
    }
  };
