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
      <table id="bookinfo">
        <tbody>
          <tr className="book-info-tr">
            <th className="book-info-tr"> ISBN: </th>
            <th className="book-info-tr"> {isbn} </th>
          </tr>
          <tr className="book-info-tr">
            <th className="book-info-tr"> Publisher: </th>
            <th className="book-info-tr"> {publisher} </th>
          </tr>

          <tr className="book-info-tr">
            <th className="book-info-tr"> Number of copies: </th>
            <th className="book-info-tr"> {numOfCopies} </th>
          </tr>

          <tr className="book-info-tr">
            <th className="book-info-tr"> Subject(s) </th>
            {subjects.map((item, key) => (
              <div className="book-info-multi" key={key}>
                {item.subject}
              </div>
            ))}
          </tr>
        </tbody>
      </table>
      <div className="physical-description">
        <p className="physical-text">{physicalDesc}</p>
      </div>
    </div>
  );
};

export default BookCoverandInfo;
