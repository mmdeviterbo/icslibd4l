import React from "react";
import { Link } from "react-router-dom";

/****************************************************
 * Type: React Functional Component
 *
 * Summary:
 *  Renders the button for adding SP/Thesis and redirects
 *  to the page for containg the form for adding SP/Thesis.
 *
 ******************************************************/

const AddNewSPT = () => {
  return (
    <div className="new-res-container">
      <Link to="/add-new-spt" className="new-res-button">
        <span className="res-btn-txt">Add SP / Thesis</span>
      </Link>
    </div>
  );
};

export default AddNewSPT;
