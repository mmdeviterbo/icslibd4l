import React from 'react'

const BookCoverandInfo = () => {
    return(
        <div className = "book-cover-info-side">
            <img src = "https://via.placeholder.com/300x400"/>
            <table id = "bookinfo">
                <tr className = "bookinfotr">
                    <th className = "bookinfotr"> ISBN </th>
                    <td className = "bookinfotr"> 123-123456789</td>
                </tr>

                <tr className = "bookinfotr">
                    <th className = "bookinfotr"> Subject(s) </th>
                    <td className = "bookinfotr"> Agriculture</td>
                </tr>
            </table>
        </div>
    );
}

export default BookCoverandInfo