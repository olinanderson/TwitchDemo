import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

// Other Components
import Spinner from "./Spinner";

// Actions
import { search } from "../actions/search";

const Search = ({ search }) => {
  const [formData, setFormData] = useState({
    searchQuery: "",
  });

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const [channelLoading, setChannelLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const onSubmit = async (e) => {
    setChannelLoading(true);
    setRedirect(true);
    e.preventDefault();
    search(formData);
  };

  if (redirect) {
    return <Redirect to="/results" />;
  }

  return channelLoading ? (
    <Spinner />
  ) : (
    <Fragment>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="searchBackground">
          <input
            autocomplete="off"
            type="text"
            name="searchQuery"
            placeholder="Search for channels..."
            id="searchQuery"
            onChange={(e) => onChange(e)}
          />
          <button>
            <i class="fas fa-search"></i>
          </button>
        </div>
      </form>
    </Fragment>
  );
};

Search.propTypes = {
  search: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { search })(Search);
