import React from "react";

/****************************************************
 * Type: React Functional Component
 *
 * Summary:
 *  Renders the book attributes.
 *
 *  props:
 *    {isbn, publisher, numOfCopies, subjects,
 *    physical Desc } = book attributes
 ******************************************************/

const BookCoverandInfo = ({
  isbn,
  publisher,
  numOfCopies,
  subjects,
  physicalDesc,
}) => {

  return (
    <div className="book-cover-info-side">

        <div className="info-group">
            <h3 className= "info-head">ISBN:</h3>
            <h3 className = "info-value">{isbn}</h3>
            
        </div>
        <hr/>

        <div className = "info-group">
            <h3 className= "info-head">Publisher:</h3>
            <h3 className = "info-value">{publisher}</h3>
            
        </div>
        <hr/>

        <div className = "info-group">
            <h3 className= "info-head">No. of copies available:</h3>
            <h3 className = "info-value">{numOfCopies}</h3>
           
        </div>
        <hr/>

        <div className = "info-group">
            <h3 className= "info-head">Subject(s):</h3>
            {subjects.map((item, key) => (
              <h3 className="info-value" key={key}>
                {item.subject}<br/>
              </h3>
            ))}
            
        </div>
        <hr/>

        <div className = "info-group">
            <h3 className= "info-head">Physical Description:</h3>
            <p className = "info-value-pd">{physicalDesc}</p>
           
        </div>
        <hr/>


    </div>
  );
};

export default BookCoverandInfo;
