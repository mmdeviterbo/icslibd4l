import React from "react";

/****************************************************
 * Type: React Functional Component
 *
 * Summary:
 *  Renders the physical description of the book
 *
 *  props
 *    physicalDesc - physical description of the book
 *
 ******************************************************/

const BookPhysDescription = ({ physicalDesc }) => {
  return (
    <div className="physdescdiv">
      <p>{physicalDesc}</p>
    </div>
  );
};

export default BookPhysDescription;
