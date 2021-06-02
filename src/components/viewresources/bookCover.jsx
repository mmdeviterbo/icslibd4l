import React from "react";
import resourceServices from "../../services/resourceService";

const BookCover = ({ id }) => {
  console.log(id);
  const handlePreview = async (e) => {
    e.preventDefault();
    try {
      const { data } = await resourceServices.getFiles(id);
      console.log(data);
    } catch (err) {
      if (err.response && err.response.data) {
        alert(err.response.data.errorMessage); // some reason error message
      }
    }
  };

  return <div className="book-cover">{handlePreview()}</div>;
};

export default BookCover;
