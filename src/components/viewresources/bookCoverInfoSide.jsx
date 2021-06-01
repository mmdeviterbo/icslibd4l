import React from "react";

const BookCoverandInfo = ({ isbn, publisher, numOfCopies, subjects }) => {
    return (
        <div className="book-cover-info-side">
            <img src="https://via.placeholder.com/300x400" />
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
                        <div key={key}>{item.subject}</div>
                    ))}
                    {/* <td className = "book-info-tr"> Agriculture</td> */}
                </tr>
            </table>
        </div>
    );
};

export default BookCoverandInfo;
