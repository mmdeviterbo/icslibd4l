import React, {useState,useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import ReactPaginate from "react-paginate";
import '../../styles/searchResultStyle/advancedSearch.css';
import FilterSidebar from './filterSidebar';
import ResultContainer from './resultContainer';
import ResourceService from '../../services/resourceService';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';

export default function AdvancedSearch({appRef}){
    const [query, setQuery] = useState("");
    const [objFilter, setObjFilter] = useState({});
    const [urlRequest, setUrlRequest] = useState(`${useLocation().pathname}${useLocation().search}`);
    const history = useHistory();

    //filters
    const [searchFilterAuthor, setSearchFilterAuthor] = useState("");
    const [searchFilterAdviser, setSearchFilterAdviser] = useState("");
    const [searchFilterTitle, setSearchFilterTitle] = useState("");
    const [searchFilterYear, setSearchFilterYear] = useState("");

    // test for multifiltering
    const [fieldArray, setfieldArray] = useState([]);
    const [filterArray, setfilterArray] = useState([]);

    // get results from db
    const [resultsFilterArr, setResultsFilterArr] = useState([]);

    // <field> : <value>
    // <field> = type | title | year | publisher | author | adviser | subject | keyword
    // <value> = <search string/number></value>

    //for pagination
    const [pageNumber,setPageNumber] = useState(0);
    const resultsPerPage = 10;
    const pagesVisited = pageNumber*resultsPerPage;

    const [results, setResults] = useState([
        {title:'My Resource 1', author:['Name Surname','Name Surname','Name Surname'], adviser:['Name Surname','Name Surname','Name Surname'], linkTo:'/search', publishDate:"18 May 2021"},
        {title:'My Resource 2', author:['Name Surname','Name Surname','Name Surname'], adviser:['Name Surname'], linkTo:'/search', publishDate:"18 May 2021"},
        {title:'My Resource 3', author:['Name Surname','Name Surname','Name Surname'], adviser:['Name Surname','Name Surname','Name Surname'], linkTo:'/search', publishDate:"18 May 2021"},
        {title:'My Resource 4', author:['Name Surname'], adviser:['Name Surname','Name Surname','Name Surname'], linkTo:'/search', publishDate:"18 May 2021"},
        {title:'My Resource 5', author:['Name Surname'], adviser:['Name Surname'], linkTo:'/search', publishDate:"18 May 2021"},
        {title:'My Resource 6', author:['Name Surname'], adviser:['Name Surname'], linkTo:'/search', publishDate:"18 May 2021"},
        {title:'My Resource My Resource My Resource My Resource My Resource My Resource My Resource My Resource My Resource My Resource My Resource My Resource 7', author:['Name Surname'], adviser:['Name Surname'], linkTo:'/search', publishDate:"18 May 2021"},
        {title:'My Resource 8', author:['Name Surname'], adviser:['Name Surname'], linkTo:'/search', publishDate:"18 May 2021"},
        {title:'My Resource 9', author:['Name Surname'], adviser:['Name Surname'], linkTo:'/search', publishDate:"18 May 2021"},
        {title:'My Resource 10', author:['Name Surname'], adviser:['Name Surname'], linkTo:'/search', publishDate:"18 May 2021"},
    ]);
    const pageCount = Math.ceil(results.length / resultsPerPage);


    const displayresults = results
    .slice(pagesVisited, pagesVisited + resultsPerPage)
    .map((result, index) => {
      return (
        <ResultContainer
        key={index}
        title={result.title}
        author={result.author} 
        adviser={result.adviser}
        linkTo={result.linkTo} 
        publishDate={result.publishDate}
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


    // console.log(filterArray);
    // console.log(fieldArray);
    // console.log("results:"+resultsFilterArr);
    // console.log(urlRequest);
    console.log(resultsFilterArr)

    // http request
    async function fetchData() {
        try{
            //  objFilter store filters in an object <field>:<value>
            //  urlRequest string that contains the search query -> example: search?type=title
            const response = await ResourceService.searchSpThesis(objFilter,urlRequest,);
            setResultsFilterArr(response);
            console.log(resultsFilterArr)
        }catch (err){
            console.log(err);
        }
    }

    // get filtered results to backend
    useEffect(() => {        
        fetchData();
        console.log(objFilter);
    }, [objFilter]);

    const handleForm=(e)=>{
        e.preventDefault();
        let tempStr = query.trim();
        console.log(tempStr);
        if(tempStr.length!==0  && (query.replace(/^\s+/, '').replace(/\s+$/, '')!=='')){
            history.push(`/search?search=${tempStr}`);
        }
        // call convert filter to object
        filterParser();    
    }

    // parse Filter array into object
    // combines 2 array into an object
    const filterParser = () =>{
        let obj = {};
        obj["keyword"] = [];
        for (var i = 0; i < fieldArray.length; i++){
            if( fieldArray[i] === "Adviser" || 
                fieldArray[i] === "Author" ||
                fieldArray[i] === "Title" ||
                fieldArray[i] === "Year"
            ){
                continue;
            }
            if(fieldArray[i].toLowerCase() === "subject" || fieldArray[i].toLowerCase() === "topic"){
                obj["keyword"].push(filterArray[i]) ;
            }
        }
        if(searchFilterAuthor !== ""){
            obj["author"] = searchFilterAuthor;
        }
        if(searchFilterAdviser !== ""){
            obj["adviser"] = searchFilterAdviser;
        }
        if(searchFilterTitle !== ""){
            obj["title"] = searchFilterTitle;
        }
        if(searchFilterYear !== ""){
            obj["year"] = parseInt(searchFilterYear);
        }
        // update later from search dropdown
        console.log(fieldArray);
        if(fieldArray.indexOf("Type") !== -1){
            obj.type = filterArray[fieldArray.indexOf("Type")];
        }else{
            obj.type = urlFilter;
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
                    searchFilterTitle={searchFilterTitle}
                    setSearchFilterTitle={setSearchFilterTitle}
                    searchFilterYear={searchFilterYear}
                    setSearchFilterYear={setSearchFilterYear} 
                    filterArray={filterArray}
                    setfilterArray={setfilterArray}
                    fieldArray={fieldArray}
                    setfieldArray={setfieldArray}
                    />

                    {/* Apply filters button */}
                    <button style={filterButton} onClick={handleForm}>
                        Apply Filters
                    </button>
                </div>

                <div style={resultsOuterContainer}>
                    <div style={resultTop}>{results.length>0 ? 
                        <p className="textStyle">Showing results {((pageNumber+1)*resultsPerPage)-(resultsPerPage-1)}
                        -
                        {results && 
                            ((pageNumber+1)*resultsPerPage)<results.length 
                            ? 
                            ((pageNumber+1)*resultsPerPage) : results.length} out of {results && results.length}
                        </p>
                        :
                        <p className="textStyle">No results</p>
                    }
                    </div>

                    <div style={resultBottom}>
                        {displayresults}
                        {results.length>0 ?
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
    width:"26vw",
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
    width:"8em",
    top: "-5%",
    left: "47%",
    border:"none",
    // border: "0.08em solid",
    borderRadius:"10px",
    backgroundColor: "#0067A1",
    color: "white",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Montserrat",
    textTransform: "capitalize",
}