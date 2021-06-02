import React, {useState,useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import ReactPaginate from "react-paginate";
import '../../styles/searchResultStyle/advancedSearch.css';
import FilterSidebar from './filterSidebar';
import ResultContainer from './resultContainer';
import ResourceService from '../../services/resourceService';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';

export default function AdvancedSearch({appRef}){
    var queryStore = `${useLocation().search}`.substring(`${useLocation().search}`.indexOf("search=")+7,);
    const [query, setQuery] = useState(queryStore);
    const [objFilter, setObjFilter] = useState({});
    const [urlRequest, setUrlRequest] = useState(`${useLocation().pathname}${useLocation().search}`);
    const history = useHistory();

    //filters
    const [searchFilterAuthor, setSearchFilterAuthor] = useState("");
    const [searchFilterAdviser, setSearchFilterAdviser] = useState(null);
    const [searchFilterPublisher, setSearchFilterPublisher] = useState("");
    const [course, setCourse] = useState("");
    // Date is set to Current Date extract year
    const [searchFilterYear, setSearchFilterYear] = useState(null);
    // use URL to change the resource type to be requested
    const [resourceType, setResourceType] = useState(`${useLocation().search}`.substring(`${useLocation().search}`.indexOf("=")+1,`${useLocation().search}`.indexOf("&")));

    const [keywords, setKeywords] = useState([]);

    // get results from db
    const [resultsFilterArr, setResultsFilterArr] = useState([]);

    // <field> : <value>
    // <field> = type | title | year | publisher | author | adviser | subject | keyword
    // <value> = <search string/number></value>

    //for pagination
    const [pageNumber,setPageNumber] = useState(0);
    const resultsPerPage = 10;
    const pagesVisited = pageNumber*resultsPerPage;

    // const [results, setResults] = useState([
    //     {title:'My Resource 1', author:['Name Surname','Name Surname','Name Surname'], adviser:['Name Surname','Name Surname','Name Surname'], linkTo:'/search', publishDate:"18 May 2021"},
    //     {title:'My Resource 2', author:['Name Surname','Name Surname','Name Surname'], adviser:['Name Surname'], linkTo:'/search', publishDate:"18 May 2021"},
    //     {title:'My Resource 3', author:['Name Surname','Name Surname','Name Surname'], adviser:['Name Surname','Name Surname','Name Surname'], linkTo:'/search', publishDate:"18 May 2021"},
    //     {title:'My Resource 4', author:['Name Surname'], adviser:['Name Surname','Name Surname','Name Surname'], linkTo:'/search', publishDate:"18 May 2021"},
    //     {title:'My Resource 5', author:['Name Surname'], adviser:['Name Surname'], linkTo:'/search', publishDate:"18 May 2021"},
    //     {title:'My Resource 6', author:['Name Surname'], adviser:['Name Surname'], linkTo:'/search', publishDate:"18 May 2021"},
    //     {title:'My Resource My Resource My Resource My Resource My Resource My Resource My Resource My Resource My Resource My Resource My Resource My Resource 7', author:['Name Surname'], adviser:['Name Surname'], linkTo:'/search', publishDate:"18 May 2021"},
    //     {title:'My Resource 8', author:['Name Surname'], adviser:['Name Surname'], linkTo:'/search', publishDate:"18 May 2021"},
    //     {title:'My Resource 9', author:['Name Surname'], adviser:['Name Surname'], linkTo:'/search', publishDate:"18 May 2021"},
    //     {title:'My Resource 10', author:['Name Surname'], adviser:['Name Surname'], linkTo:'/search', publishDate:"18 May 2021"},
    // ]);
    const pageCount = Math.ceil(resultsFilterArr.length / resultsPerPage);


    const displayresults = resultsFilterArr
    .slice(pagesVisited, pagesVisited + resultsPerPage)
    .map((result, index) => {
      return (
        <ResultContainer
        key={index}
        title={result.title}
        authors={result.authors||result.author} 
        // adviser={result.adviser}
        // linkTo={result.linkTo} 
        publishDate={result.year||result.datePublished}//publishDate
        />
      );
    });

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    //url manipulation
    let url = window.location.href;
    let urlFilter = '';
    let urlQuery = '';

    url = url.replace('http://localhost:3000/search?',''); 
    //edit before prod; url = url.replace(/\+/g,' '); or should i use split and have ? as a delimeter tho the search string can also contain '?'
    urlQuery = decodeURIComponent((url.split('&')[1]).replace('search=',''));
    urlFilter = (url.split('&')[0]).replace('type=','');
    // if(url.split('&').length > 1){
    //     urlQuery = decodeURIComponent((url.split('&')[0]).replace('q=',''));
    //     urlFilter = (url.split('&')[1]).replace('f=','');
    // }else
    //     urlQuery = decodeURIComponent((url.replace('q=','')));
    
    // console.log(searchFilterAdviser);
    // console.log(searchFilterYear);
    // console.log(resultsFilterArr);
    
    // http request
    async function fetchData() {
        try{
            //  objFilter store filters in an object <field>:<value>
            //  urlRequest string that contains the search query -> example: search?type=title
            console.log(objFilter); 
            console.log(urlRequest);
            const {data} = await ResourceService.searchSpThesis(objFilter,urlRequest);
            setResultsFilterArr(data);
            // console.log(resultsFilterArr)
        }catch (err){
            console.log(err);
        }
    }

    // get filtered results to backend
    useEffect(() => {        
        fetchData();
    }, [objFilter]);

    const handleForm=(e)=>{
        e.preventDefault();
        let tempStr = query.trim();
        // NEED TO CLEAN resourcetype specialproblem
        if(tempStr.length!==0  && (query.replace(/^\s+/, '').replace(/\s+$/, '')!=='')){
            history.push(`/search?type=any&search=${tempStr}`);
        }
        setUrlRequest(`/search?type=any&search=${tempStr}`);
        // call convert filter to object
        filterParser();   
    }

    // parse Filter array into object
    // combines 2 array into an object
    const filterParser = () =>{
        let obj = {};
        if(keywords.length !== 0){
            obj["keyword"] = keywords;
        }
        if(searchFilterAuthor !== ""){
            obj["author"] = searchFilterAuthor;
        }
        if(searchFilterAdviser !== null){
            obj["adviser"] = searchFilterAdviser;
        }
        if(searchFilterPublisher !== ""){
            obj["publisher"] = searchFilterPublisher;
        }
        if(searchFilterYear !== null){
            // Year must be set to NUll
            obj["year"] = searchFilterYear.getFullYear();
        }
        if(course !== ""){
            obj["subject"] = course;
            // if courses field was cleared
            if(obj.courses === null){
                delete obj.courses;
            }
        }
        setObjFilter(obj);
    }

    return (
        <form style={searchMainContainer} onSubmit={handleForm} className="searchMainContainer">
            <div style={topContainer} className="topContainer">
                <h4 className="textStyle">Search results for:</h4>
                <div style={searchBarContainer} className="resultsSearchbar">
                    <i className="fa fa-search fa-2x" style={searchIcon} onClick={handleForm}></i>
                    <input style={inputSearch} type="text" className="form-control removeOutline" defaultValue={urlQuery} onChange={e=>setQuery(e.target.value)} placeholder="Search for Books, Theses, and Special Problems" />
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
                    // filterArray={filterArray}
                    // setfilterArray={setfilterArray}
                    // fieldArray={fieldArray}
                    // setfieldArray={setfieldArray}
                    keywords={keywords}
                    setKeywords={setKeywords}
                    />

                    {/* Apply filters button */}
                    <button style={filterButton} onClick={handleForm}>
                        Apply Filters
                    </button>
                </div>

                <div style={resultsOuterContainer}>
                    <div style={resultTop}>{resultsFilterArr.length>0 ? 
                        <p className="textStyle">Showing results {((pageNumber+1)*resultsPerPage)-(resultsPerPage-1)}
                        -
                        {resultsFilterArr && 
                            ((pageNumber+1)*resultsPerPage)<resultsFilterArr.length 
                            ? 
                            ((pageNumber+1)*resultsPerPage) : resultsFilterArr.length} out of {resultsFilterArr && resultsFilterArr.length}
                        </p>
                        :
                        <p className="textStyle">No results</p>
                    }
                    </div>

                    <div style={resultBottom}>
                        {resultsFilterArr && displayresults}
                        {resultsFilterArr.length>0 ?
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
                            />
                            :
                            <div></div>
                        }
                    </div>
                </div>
            </div>
        </form>
    )
}

const searchMainContainer = {
    position:"relative",
    height:"auto",
    width:"100vw",
    padding:0,
    margin:"auto 2vw",
    display:"flex",
    alignItems:"flex-start",
    flexDirection:"column",
}

const topContainer = {
    position:"sticky",
    top:"10vh",
    width: "96vw",
    justifyContent:"center",
    alignItems:"center",
    padding:"5vh 5vw 1vh",
    background:"white",
    borderBottom:"2px solid gainsboro",
    zIndex:4
}

const searchBarContainer = {
    display:"flex"
}

const searchIcon = {
    paddingLeft:"1vw",
    marginTop:"1vh"

}

const inputSearch = {
    width:"100%",
    padding:"1.52vh 1.52vw",
    marginLeft:0,
    border:0,
    fontSize:"1.48em"
}

const bottomContainer = { 
    display:"flex",
    width: "96vw"
}

const filtersContainer = {
    background:"white",
    position:"sticky",
    overflowY:"overlay",
    top:"28vh",
    width:"20vw",
    height:"73vh"
}

const resultsOuterContainer = {
    width:"70vw"
}

const resultTop = {
    position:"sticky",
    top:"28vh",
    padding:"2.5vh 1vw",
    background:"white"
}

const resultBottom = {
    marginLeft:"5vw"
}

const filterButton = {
    position: "relative",
    height: "2em",
    width:"10em",
    top: "-2.5vh",
    left: "20%",
    border: "0.08em solid",
    borderRadius:"3px",
    backgroundColor: "#0067A1",
    color: "white",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Montserrat",
    textTransform: "capitalize",
}