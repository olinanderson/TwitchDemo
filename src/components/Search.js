import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "./Spinner";

import { search } from "../actions/search";

const Search = ({ search }) => {
  const [formData, setFormData] = useState({
    searchQuery: "",
  });

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    search(formData);
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <Fragment>
      <form onSubmit={(e) => onSubmit(e)}>
        <h1>Search for Twitch Channels</h1>
        <div className="searchInput">
          <input
            type="text"
            name="searchQuery"
            placeholder="Search for channels..."
            id="searchQuery"
            onChange={(e) => onChange(e)}
          />
        </div>
      </form>
    </Fragment>
  );
};

Search.propTypes = {
  isLoading: PropTypes.bool,
  search: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { search })(Search);
