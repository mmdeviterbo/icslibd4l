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
      <table id="bookinfo">
        <tr className="book-info-tr">
          {/* <th className = "book-info-tr"> ISBN </th>
                    <td className = "book-info-tr"> 123-123456789</td> */}
          <th className="book-info-tr"> ISBN: </th>
          <th className="book-info-tr"> {isbn} </th>
        </tr>
        <tr className="book-info-tr">
          {/* <th className = "book-info-tr"> ISBN </th>
                    <td className = "book-info-tr"> 123-123456789</td> */}
          <th className="book-info-tr"> Publisher: </th>
          <th className="book-info-tr"> {publisher} </th>
        </tr>

        <tr className="book-info-tr">
          {/* <th className = "book-info-tr"> ISBN </th>
                    <td className = "book-info-tr"> 123-123456789</td> */}
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
          {/* <td className = "book-info-tr"> Agriculture</td> */}
        </tr>
      </table>
      <div className="physical-description">
        <p className="physical-text">{physicalDesc}</p>
      </div>
    </div>
  );
};

export default BookCoverandInfo;
