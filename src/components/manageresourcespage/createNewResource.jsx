import React from "react";
import { Link } from "react-router-dom";

// TODO: add documentation
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
