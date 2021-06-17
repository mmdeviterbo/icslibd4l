import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ReactPaginate from "react-paginate";
import FilterSidebar from "./filterSidebar";
import ResultContainer from "./resultContainer";
import ResourceService from "../../services/resourceService";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import PropagateLoader from "react-spinners/PropagateLoader";
import "../../styles/searchResultStyle/advancedSearch.css";

export default function AdvancedSearch() {
  const parseSymbols = (str) => {
    str = str.replace(/%20/g, " ");
    str = str.replace(/%22/g, '"');
    return str.replace(/%27/g, "'");
  };

  //decla ng queryStore
  var queryStore = `${window.location.href.replace(
    "http://localhost:3000/search",
    ""
  )}`.substring(
    `${window.location.href.replace(
      "http://localhost:3000/search",
      ""
    )}`.indexOf("search=") + 7
  );

  const [query, setQuery] = useState(parseSymbols(queryStore));
  const [isValidQuery, setIsValidQuery] = useState(true);
  const [objFilter, setObjFilter] = useState({});
  const [urlRequest, setUrlRequest] = useState(
    `${useLocation().pathname}${useLocation().search}`
  );
  const history = useHistory();
  const urlValidator = /^\?type=(?:any|book|sp|thesis)&search=[\w\s:'"]*$/g;

  //filters
  const [searchFilterAuthor, setSearchFilterAuthor] = useState("");
  const [searchFilterAdviser, setSearchFilterAdviser] = useState(null);
  const [searchFilterPublisher, setSearchFilterPublisher] = useState("");
  const [course, setCourse] = useState("");
  // Date is set to Current Date extract year
  const [searchFilterYear, setSearchFilterYear] = useState(null);
  // use URL to change the resource type to be requested
  const [resourceType, setResourceType] = useState(
    `${useLocation().search}`.substring(
      `${useLocation().search}`.indexOf("=") + 1,
      `${useLocation().search}`.indexOf("&")
    )
  );
  const [keywords, setKeywords] = useState([]);

  // get results from db
  const [resultsFilterArr, setResultsFilterArr] = useState([]);

  // <field> : <value>
  // <field> = type | title | year | publisher | author | adviser | subject | keyword
  // <value> = <search string/number></value>

  //for pagination
  const [pageNumber, setPageNumber] = useState(0);
  const resultsPerPage = 10;
  const pagesVisited = pageNumber * resultsPerPage;
  const pageCount = Math.ceil(resultsFilterArr.length / resultsPerPage);
  const [loader, setLoader] = useState(true);

  //url manipulation
  let url = window.location.href;
  let urlFilter = "";
  let urlQuery = "";

  url = parseSymbols(url.replace("http://localhost:3000/search", ""));

  function returnCloserResourceType() {
    if (url.includes("sp")) return "sp";
    else if (url.includes("thesis")) return "thesis";
    else if (url.includes("book")) return "book";
    else return "any";
  }

  function onMountResourceType() {
    if (!url.match(urlValidator)) return returnCloserResourceType();
    return `${url}`.substring(`${url}`.indexOf("=") + 1, `${url}`.indexOf("&"));
  }
  useEffect(() => {
    setResourceType(onMountResourceType());
  }, []);

  const displayresults = resultsFilterArr
    .slice(pagesVisited, pagesVisited + resultsPerPage)
    .map((result, index) => {
      return (
        <ResultContainer
          key={index}
          title={result.title}
          authors={result.authors || result.author}
          id={result.bookId || result.sp_thesis_id}
          publishDate={result.year || result.datePublished}
        />
      );
    });

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  // http request
  async function fetchData(newUrl) {
    setLoader(true);
    if (!url.match(urlValidator)) setIsValidQuery(false);
    else {
      //edit before prod; or should i use split and have ? as a delimeter tho the search string can also contain '?'
      if (url.length > 0) {
        url = url.slice(1, url.length);
        urlQuery = decodeURIComponent(
          parseSymbols(url.split("&")[1].replace("search=", ""))
        );
        urlFilter = url.split("&")[0].replace("type=", "");
      }
      if (isValidQuery) {
        setPageNumber(0);
        try {
          //  objFilter store filters in an object <field>:<value>
          //  newUrl string that contains the search query -> example: search?type=title
          const { data } = await ResourceService.searchSpThesis(
            objFilter,
            newUrl // changed to get the updated request from the current url
          );
          setResultsFilterArr(data);
          setLoader(false);
        } catch (err) {
          console.log(err);
        }
      }
    }
  }
  // get filtered results to backend
  useEffect(() => {
    window.scrollTo(0, 0);
    // previouse bug: results page does not change the current results
    // current change: Made the string in the searchbox change depending on the current url
    setQuery(queryStore);

    //previous bug: When the type in the url changes, the value in the sideBar does not change
    //current change: first, the query from the url is extracted. then on the resulting string, split is used with delimeter '&'
    //next, we extract the substring based on the index of "type=" + the length of "type=" which is 5
    setResourceType(
      `${window.location.href.replace("http://localhost:3000/search", "")}`
        .split("&")[0]
        .substring(
          `${window.location.href.replace(
            "http://localhost:3000/search",
            ""
          )}`.indexOf("type=") + 5
        )
    );

    // previous bug: url seen in the website changes but not the urlRequest sent to backend
    // current change: gets the updated request from the current url and pass as props to fetchData()
    const newUrl = parseSymbols(
      `${window.location.href.replace("http://localhost:3000", "")}`
    );
    fetchData(newUrl);
  }, [objFilter, url]);

  const handleForm = (e) => {
    e.preventDefault();
    let tempStr = query.trim();

    // NEED TO CLEAN resourcetype specialproblem
    if (isValidQuery) {
      if (
        tempStr.length !== 0 &&
        query.replace(/^\s+/, "").replace(/\s+$/, "") !== ""
      ) {
        history.push(`/search?type=${resourceType}&search=${tempStr}`);
      }
      setUrlRequest(`/search?type=${resourceType}&search=${tempStr}`);

      // call convert filter to object
      filterParser();
    } else {
      return (window.location = `/search?type=${onMountResourceType()}&search=${tempStr}`);
    }
  };

  // parse Filter array into object
  // combines 2 array into an object
  const filterParser = () => {
    let obj = {};
    if (keywords.length !== 0) {
      obj["keyword"] = keywords;
    }
    if (searchFilterAuthor !== "") {
      obj["author"] = searchFilterAuthor;
    }
    if (searchFilterAdviser !== null) {
      obj["adviser"] = searchFilterAdviser;
    }
    if (searchFilterPublisher !== "") {
      obj["publisher"] = searchFilterPublisher;
    }
    if (searchFilterYear !== null) {
      // Year must be set to NUll
      obj["year"] = searchFilterYear.getFullYear();
    }
    if (course !== "") {
      obj["subject"] = course;
      // if courses field was cleared
      if (obj.courses === null) {
        delete obj.courses;
      }
    }
    setObjFilter(obj);
  };

  return (
    <form
      style={searchMainContainer}
      onSubmit={handleForm}
      className="searchMainContainer"
    >
      <div style={topContainer} className="topContainer">
        <h4 className="textStyle">Search results for:</h4>
        <div style={searchBarContainer} className="resultsSearchbar">
          <i
            className="fa fa-search fa-2x iconMagnifyingGlass"
            style={searchIcon}
            onClick={handleForm}
          ></i>
          <input
            style={inputSearch}
            type="text"
            className="form-control removeOutline"
            value={query} // changed from defaultValue={query || urlQuery}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              query || "Search for Books, Theses, and Special Problems"
            }
          />
        </div>
      </div>

      <div style={bottomContainer}>
        <div style={filtersContainer}>
          <FilterSidebar
            searchFilterAuthor={searchFilterAuthor}
            setSearchFilterAuthor={setSearchFilterAuthor}
            searchFilterAdviser={searchFilterAdviser}
            setSearchFilterAdviser={setSearchFilterAdviser}
            resourceType={resourceType}
            setResourceType={setResourceType}
            searchFilterYear={searchFilterYear}
            setSearchFilterYear={setSearchFilterYear}
            searchFilterPublisher={searchFilterPublisher}
            setSearchFilterPublisher={setSearchFilterPublisher}
            course={course}
            setCourse={setCourse}
            keywords={keywords}
            setKeywords={setKeywords}
          />

          {/* Apply filters button */}
          <button
            style={filterButton}
            className="btnApplyFilter"
            onClick={handleForm}
          >
            Apply Filters
          </button>
        </div>

        <div style={resultsOuterContainer}>
          {loader && isValidQuery ? (
            <div style={resultTop}>
              <p className="textStyle">Getting results...</p>
            </div>
          ) : (
            <div style={resultTop}>
              {resultsFilterArr.length > 0 ? (
                <p className="textStyle">
                  Showing results{" "}
                  {(pageNumber + 1) * resultsPerPage - (resultsPerPage - 1)}-
                  {resultsFilterArr &&
                  (pageNumber + 1) * resultsPerPage < resultsFilterArr.length
                    ? (pageNumber + 1) * resultsPerPage
                    : resultsFilterArr.length}{" "}
                  out of {resultsFilterArr && resultsFilterArr.length}
                </p>
              ) : (
                <>{isValidQuery && <p className="textStyle">No results</p>}</>
              )}
            </div>
          )}
          <div style={loader ? displayLoader : resultBottom}>
            {!isValidQuery && loader && (
              <div
                className="invalidSearchClass"
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <i className="fa mr-3 fa-4x fa-times" />
                <p style={{ fontSize: "calc(20px + 0.5vh)" }}>Invalid search</p>
              </div>
            )}
            {isValidQuery && loader ? (
              <PropagateLoader
                color={"#0067a1"}
                speedMultiplier={2}
                loading={loader}
                size={20}
              />
            ) : (
              <div>
                {resultsFilterArr && displayresults}
                {resultsFilterArr.length > 0 ? (
                  <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={"paginationBttns"}
                    previousLinkClassName={"previousBttn"}
                    nextLinkClassName={"nextBttn"}
                    disabledClassName={"paginationDisabled"}
                    activeClassName={"paginationActive"}
                    activeLinkClassName={"paginationActiveText"}
                    pageLinkClassName={"paginationText"}
                  />
                ) : (
                  <div></div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}

const searchMainContainer = {
  position: "relative",
  height: "auto",
  width: "100vw",
  padding: 0,
  margin: "auto 2vw",
  display: "flex",
  alignItems: "flex-start",
  flexDirection: "column",
};

const topContainer = {
  position: "sticky",
  top: "60px",
  width: "96vw",
  height: "17vh",
  justifyContent: "center",
  alignItems: "center",
  padding: "5vh 5vw 1vh",
  background: "white",
  borderBottom: "2px solid gainsboro",
  zIndex: 4,
};

const searchBarContainer = {
  display: "flex",
};

const searchIcon = {
  paddingLeft: "1vw",
  marginTop: "1vh",
  cursor: "pointer",
  transition: "0.2s",
};

const inputSearch = {
  width: "100%",
  padding: "1.52vh 1.52vw",
  marginLeft: 0,
  border: 0,
  fontSize: "1.48em",
};

const bottomContainer = {
  display: "flex",
  width: "96vw",
};

const filtersContainer = {
  background: "white",
  position: "sticky",
  overflowY: "overlay",
  overflowX: "hidden",
  top: "27.1vh",
  width: "20vw",
  height: "73vh",
};

const resultsOuterContainer = {
  width: "70vw",
};

const resultTop = {
  position: "sticky",
  top: "calc(60px + 17vh)",
  padding: "2.5vh 1vw",
  background: "white",
  zIndex: 1000,
};

const resultBottom = {
  marginLeft: "5vw",
};

const filterButton = {
  position: "relative",
  top: "-2.5vh",
  left: "20%",
  border: "1px solid #0067A1",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "inherit",
  transform: "scale(1)",
  //   transition: "0.2s",
  //   transition: "100ms ease, box-shadow 125ms ease",
  //   transform: "scale(1.025)",
  marginTop: "1rem",
  height: "2.5rem",
  borderRadius: "0.5rem",
  borderStyle: "solid",
  borderColor: "#0067a1",
  color: "white",
  backgroundColor: "#0067a1",
  width: "50%",
  boxShadow: "0.3rem 0.3rem 0.7rem #cfcfcf",
};

const displayLoader = {
  display: "grid",
  placeItems: "center",
  height: "80vh",
};
