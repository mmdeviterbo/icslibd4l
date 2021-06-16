import React from "react";
import dateFormat from "dateformat";

/****************************************************
 * Type: React Functional Component
 *
 * Summary:
 *  Shows the title, authors and publishing year of a
 *  specific SP/Thesis.
 *
 *  props:
 *    title = SP/Thesis title
 *    authorList = an array of authors
 *    year = publishing year
 *    item =
 ******************************************************/

const TitleContainer = ({ title, authorList, year, item }) => {
  return (
    <div className="title-author">
      {/* title in h1 */}
      <h1>{title}</h1>

      {/* author in h3 */}
      <h3>
        {authorList &&
          authorList.map((item, key) => (
            <div key={key}>{item.author_name}</div>
          ))}
      </h3>

      {item === "book" ? (
        <div className="date-and-view">
          {/* publish date in p */}
          <p>
            Date Published: {dateFormat(year, "mmmm yyyy")}
            {/* Published on January 04, 2021 */}
          </p>
        </div>
      ) : (
        <div className="date-and-view">
          {/* publish date in p */}
          <p>
            {year}
            {/* Published on January 04, 2021 */}
          </p>
        </div>
      )}

      <hr />
    </div>
  );
};

export default TitleContainer;
