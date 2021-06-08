import React, { useState } from "react";

// THIS IS A TEMPORARY SEARCH BAR
// THIS WILL BE DELETED ONCE A SEPARATE SEARCH FUNCTIONALITY HAS BEEN CREATED

const SearchResources = () => {
  const [title, setTitle] = useState();
  // title, type, year
  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const urlRequest = `/search-id?id=${resourceID}`;
  //       const { data } = await ResourceService.searchByID(urlRequest, type);
  //       // setResourceData(data && data[0]);
  //       console.log(data);
  //       setLoading(false);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  // }, []);

  return (
    <div className="staff-search-bar-container">
      <input
        className="search-bar-temp"
        placeholder={"Search for a resource title"}
        onChange={(e) => setTitle(e.target.value)}
      />
      {/* temporary search bar */}
      <div className="input-group-append">
        <button className="btn btn-secondary" type="button">
          <i className="fa fa-search"></i>
        </button>
      </div>
    </div>
  );
};

export default SearchResources;
