import React, { useEffect } from "react";
import resourceServices from "../../services/resourceService";

const BookCoverandInfo = ({ isbn, publisher, numOfCopies, subjects }) => {
  console.log(isbn);

  //   useEffect(() => {
  //     async function getBookCover() {
  //       try {
  //         const { data } = await resourceServices.getBookCover(isbn);
  //         console.log(data);
  //       } catch (err) {
  //         if (err.response && err.response.data) {
  //           alert(err.response.data.errorMessage); // some reason error message
  //         }
  //       }
  //     }
  //     getBookCover();
  //   }, []);

  const GetBookCover = async () => {
    try {
      const { data } = await resourceServices.getBookCover(isbn);
      console.log(data);
    } catch (err) {
      if (err.response && err.response.data) {
        alert(err.response.data.errorMessage); // some reason error message
      }
    }
  };

  //   GetBookCover();

  return (
    <div className="book-cover-info-side">
      {/* <GetBookCover /> */}
      <table id="bookinfo">
        <tr className="bookinfotr">
          {/* <th className = "bookinfotr"> ISBN </th>
                    <td className = "bookinfotr"> 123-123456789</td> */}
          <th className="bookinfotr"> ISBN: </th>
          <th className="bookinfotr"> {isbn} </th>
        </tr>
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
            <div key={key}>{item.subject}</div>
          ))}
          {/* <td className = "bookinfotr"> Agriculture</td> */}
        </tr>
      </table>
    </div>
  );
};

export default BookCoverandInfo;
