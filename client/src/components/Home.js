import React from "react";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";

let Home = ({ isAuthed, dispatch, history, userInfo }) => {
  if (isAuthed) {
    return (
          <p>Hello!!!!</p>
    )
  }
  else {
    return (
      <p>Please login</p>
    )
  }
}

const mapStateToProps = state => {
  return state;
};

Home = connect(mapStateToProps, null)(Home);

export default withRouter(Home);
