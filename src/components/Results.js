import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Other components=
import Spinner from "./Spinner";
import Navbar from "./Navbar";

// Actions
import { getUser, getFollowers } from "../actions/user";
import { Redirect } from "react-router-dom";

const Results = ({ channelsLoading, searchResults, getUser, getFollowers }) => {
  const [redirect, setRedirect] = useState(false);

  // Reload to the users page
  if (redirect) {
    return <Redirect to="/user" />;
  }

  // If channels are loading return spinner
  if (channelsLoading) {
    return <Spinner />;
  }

  // If search results are empty return response
  if (!searchResults.length) {
    return (
      <Fragment>
        <h1>Sorry, we couldn't find any channels with that name :(</h1>
      </Fragment>
    );
  }

  const onClick = async (e) => {
    e.preventDefault();

    const userIndex = e.currentTarget.getAttribute("data-index");

    // Getting the current indice of the item that was clicked on, and finding the users ID from that which is stored in the state
    const userId = searchResults[userIndex].id;

    getUser({ userId, userIndex });
    getFollowers({ userId, userIndex });

    setRedirect(true);
  };

  const displayChannels = (channels) => {
    return channels.map((value, index) => {
      return (
        <table
          className="profileTable"
          data-index={index}
          key={index}
          onClick={(e) => onClick(e)}
        >
          <tbody>
            <tr>
              <th className="leftBanner"></th>
              <th className="profileCard">
                <img src={value.thumbnail_url} />
                <div className="contents">
                  <h3>{value.display_name}</h3>
                  <p className="game">{value.game_name}</p>
                  <p className="title">{value.title}</p>
                </div>
              </th>
            </tr>
          </tbody>
        </table>
      );
    });
  };

  return (
    <Fragment>
      <Navbar />
      <div className="container">
        {/* <h3 className="results">Search Results...</h3> */}
        {displayChannels(searchResults)}
      </div>
    </Fragment>
  );
};

Results.propTypes = {
  channelsLoading: PropTypes.bool.isRequired,
  searchResults: PropTypes.array.isRequired,
  getUser: PropTypes.func.isRequired,
  getFollowers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  channelsLoading: state.search.channelsLoading,
  searchResults: state.search.query,
});

export default connect(mapStateToProps, { getUser, getFollowers })(Results);
