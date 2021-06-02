import React from "react";

const BookCoverandInfo = ({ publisher, numOfCopies, subjects }) => {
    return (
        <div className="book-cover-info-side">
            <img src="https://via.placeholder.com/300x400" />
            <table id="bookinfo">
                <tr className="bookinfotr">
                    {/* <th className = "bookinfotr"> ISBN </th>
                    <td className = "bookinfotr"> 123-123456789</td> */}
                    <th className="bookinfotr"> Publisher: </th>
                    <th className="bookinfotr"> {publisher} </th>
                </tr>

                <tr className="bookinfotr">
                    {/* <th className = "bookinfotr"> ISBN </th>
                    <td className = "bookinfotr"> 123-123456789</td> */}
                    <th className="bookinfotr"> Number of copies: </th>
                    <th className="bookinfotr"> {numOfCopies} </th>
                </tr>

                <tr className="bookinfotr">
                    <th className="bookinfotr"> Subject(s) </th>
                    {subjects.map((item, key) => (
                        <div key={key}>{item}</div>
                    ))}
                    {/* <td className = "bookinfotr"> Agriculture</td> */}
                </tr>
            </table>
        </div>
    );
};

export default BookCoverandInfo;
