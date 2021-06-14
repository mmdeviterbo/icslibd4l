import React from "react";
import { Link } from "react-router-dom";

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
