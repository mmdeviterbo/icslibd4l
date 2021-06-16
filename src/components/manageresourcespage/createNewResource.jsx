import React from "react";
import { Link } from "react-router-dom";

/****************************************************
 * Type: React Functional Component
 *
 * Summary:
 *  Renders the button for adding book and redirects
 *  to the page for adding book.
 *
 ******************************************************/

const AddNewResource = () => {
  return (
    <div className="new-res-container">
      <Link to="/add-new-book" className="new-res-button">
        <span className="res-btn-txt">Add Book</span>
      </Link>
    </div>
  );
};

export default AddNewResource;
