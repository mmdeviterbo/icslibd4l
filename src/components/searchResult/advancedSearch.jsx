import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import ReactPaginate from "react-paginate";
import '../../styles/searchResultStyle/advancedSearch.css';
import FilterSidebar from './filterSidebar';
import ResultContainer from './resultContainer';

export default function AdvancedSearch({appRef}){
    const [query, setQuery] = useState("");
    const history = useHistory();

    //filters
    const [searchFilterAuthor, setSearchFilterAuthor] = useState("");
    const [searchFilterAdviser, setSearchFilterAdviser] = useState("");
    const [filterTag, setFilterTag] = useState("");

    //for pagination
    const [pageNumber,setPageNumber] = useState(0);
    const resultsPerPage = 3;
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
    .map((result) => {
      return (
        <ResultContainer
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
    let urlFilter = 'any';
    let urlQuery = '';

    url = url.replace('http://localhost:3000/search?',''); 
    //edit before prod; url = url.replace(/\+/g,' '); or should i use split and have ? as a delimeter tho the search string can also contain '?'

    if(url.split('&').length > 1){
        urlQuery = decodeURIComponent((url.split('&')[0]).replace('q=',''));
        urlFilter = (url.split('&')[1]).replace('f=','');
    }else
        urlQuery = decodeURIComponent((url.replace('q=','')));

    const handleForm=(e)=>{
        e.preventDefault();
        let tempStr = query.trim();
    
        if(tempStr.length!==0  && (query.replace(/^\s+/, '').replace(/\s+$/, '')!=='')){
            history.push(`/search?q=${tempStr}`);
        }
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
                    filterTag={filterTag}
                    setFilterTag={setFilterTag}
                    />
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