import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";

// Other components=
import Spinner from "./Spinner";
import Navbar from "./Navbar";

const User = ({ user, searchQuery }) => {
  var { userLoading, userResults, followers, userIndex } = user;

  // If channels are loading return spinner
  if (userLoading || !followers) {
    return <Spinner />;
  }

  // Function determining if the user is verified
  const checkVer = () => {
    if (userResults.broadcaster_type == "partner") {
      return (
        <svg
          type="color-fill-current"
          width="20px"
          height="20px"
          version="1.1"
          viewBox="0 0 20 20"
          x="0px"
          y="0px"
          className="verifiedIcon"
        >
          <path
            fill="#6441a4"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10 2l6 2 2 6-2 6-6 2-6-2-2-6 2-6 6-2zM8.889 13.636l5.43-5.429-1.415-1.414-4.015 4.015-2.015-2.015-1.414 1.414 3.429 3.43z"
          ></path>
        </svg>
      );
    }
  };

  function abbreviateNumber(value) {
    let newValue = value;
    const suffixes = ["", "K", "M", "B", "T"];
    let suffixNum = 0;
    while (newValue >= 1000) {
      newValue /= 1000;
      suffixNum++;
    }

    newValue = newValue.toPrecision(3);

    newValue += suffixes[suffixNum];
    return newValue;
  }

  // Merging the two objects so that it displays as much information about the streamer as possible
  var userObject = Object.assign(searchQuery[userIndex], userResults);

  console.log(userObject);

  return (
    <Fragment>
      <Navbar />
      <div className="profileDescription">
        <img src={userObject.profile_image_url} />

        <div className="rightProfile">
          <h3>
            {userObject.display_name} {checkVer()}
          </h3>
          <h5>{userObject.title}</h5>
          <p className="italic">
            Account created{" "}
            <Moment date={userObject.created_at} durationFromNow /> ago
          </p>
          <p>Followers: {abbreviateNumber(followers)}</p>
          <p>Live: {userObject.is_live.toString()}</p>

          <p className="game">{userObject.game_name}</p>
        </div>
      </div>

      <div className="aboutSection">
        <p>
          About{" "}
          <strong>
            {userObject.display_name}
            {checkVer()}:
          </strong>
        </p>
        <br />
        <p>{userObject.description}</p>
      </div>
    </Fragment>
  );
};

User.propTypes = {
  user: PropTypes.object.isRequired,
  searchQuery: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  //   userLoading: state.user.userLoading,
  //   userResults: state.user.userResults,
  //   followers: state.user.followers,
  user: state.user,
  searchQuery: state.search.query,
});

export default connect(mapStateToProps, {})(User);
