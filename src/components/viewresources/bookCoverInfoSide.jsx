import React from "react";

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
            <h3>ISBN:</h3>
            <h3 className = "info-value">{isbn}</h3>
            
        </div>
        <hr/>

        <div className = "info-group">
            <h3>Publisher:</h3>
            <h3 className = "info-value">{publisher}</h3>
            
        </div>
        <hr/>

        <div className = "info-group">
            <h3>Number of copies available:</h3>
            <h3 className = "info-value">{numOfCopies}</h3>
           
        </div>
        <hr/>

        <div className = "info-group">
            <h3>Subject(s):</h3>
            {subjects.map((item, key) => (
              <h3 className="info-value" key={key}>
                {item.subject}
              </h3>
            ))}
            
        </div>
        <hr/>

        <div className = "info-group">
            <h3>Physical Description:</h3>
            <p className = "info-value">{physicalDesc}</p>
           
        </div>
        <hr/>


    </div>
  );
};

export default BookCoverandInfo;
