import React from "react";
import { toast } from "react-toastify";
import {Link} from 'react-router-dom';
import resourceService from '../../services/resourceService';
/****************************************************
 * Type: React Functional Component
 *
 * Summary:
 *  Shows the SP/Thesis details. Poster, journal, source
 *  code and manuscript can only be viewed if a user is
 *  and admin or faculty/staff. The buttons for redirecting
 *  to the resources is not visible to guests and students.
 *
 *  props:
 *    user = checks the user type for user privileges
 *    resourceData = object that will be rendered into
 *           the component
 ******************************************************/

const InfoSidebar = ({ user, resourceData, type, resId }) => {
  const [sourceInfo, setSourceInfo] = React.useState();
  
  
  React.useEffect(()=>{
    async function fetchResources(){
      try{
        const books = await resourceService.browseResources({
          type: "book",
      });
      const spThesis = await resourceService.browseResources({
          type: "thesis",
      });
      let arr = books.data && books.data.concat(spThesis.data);
      setSourceInfo(arr);
      }catch(err){}
    }
    fetchResources();
  },[])

  const handleRedirect = (redirectHere) => {
    // window.location.href = redirectHere;
    if (redirectHere === "" || redirectHere === null) {
      toast.info("Unavailable", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      window.open(redirectHere, "_blank") ||
        window.location.replace(redirectHere);
      // window.open(redirectHere, "_blank");
    }
  };
  return (
    <div className="info-sidebar">
      <div className="info-group">
            <h3>Type:</h3>
            <h3 className = "info-value">{resourceData && resourceData.type}</h3>
        </div>
        <hr/>

        <div className = "info-group">
            <h3 style={{marginRight:"2%"}}>Adviser(s):</h3>
            <div>
            {resourceData &&
              resourceData.advisers.map((item, key) => (
                <h3 className="info-value" key={key}>
                  {item.adviser_name}
                </h3>
              ))}
            </div>
        </div>
        <hr/>

        <div className = "info-group">
            <h3>Keywords:</h3>
            <div>
            {resourceData &&
                resourceData.keywords.map((item, key) => (
                  <h3 className="info-value" key={key}>
                    {item.sp_thesis_keyword}
                  </h3>
                ))}
            {(!resourceData || (resourceData && resourceData.keywords.length===0))
            &&
            <p style={{fontStyle:"italic"}}>No keyword</p>
            }
            </div>
        </div>
        <hr/>

      {user && (
        <div className="spt-view-buttons">
          <button
            id="viewposter"
            value={resourceData && resourceData.poster}
            onClick={(e) => handleRedirect(e.target.value)}
          >
            <i className="fa fa-file-pdf-o mr-3" aria-hidden="true"/>
            View Poster
          </button>
          {/* if guest/book -> display: none */}

          <button
            id="downloadjournal"
            value={resourceData && resourceData.journal}
            onClick={(e) => handleRedirect(e.target.value)}
          >
            <i className="fa fa-file-pdf-o mr-3" aria-hidden="true"/>
            View Journal
          </button>
          {user && user.userType !== 4 && (
            <>
              <button
                id="downloadsourcecode"
                value={resourceData && resourceData.source_code}
                onClick={(e) => handleRedirect(e.target.value)}
              >
                <i className="fa fa-code mr-3" aria-hidden="true"/>
                View Source Code
              </button>
              <button
                id="downloadmanuscript"
                value={resourceData && resourceData.manuscript}
                onClick={(e) => handleRedirect(e.target.value)}>
                <i className="fa fa-file-pdf-o mr-3" aria-hidden="true"/>
                View Manuscript
            </button>
              <br />
              <br />
            </>
          )}

          {user && user.userType===1 &&
              <Link to={{
                  pathname: `/edit-spt/${resId}`,
                  state: { sourceInfo, id:{id:resId}},
              }}>
                <i className = "fa fa-pencil"/>
                &nbsp; {`Edit ${type}`}
              </Link>
          }
        </div>
      )}
    </div>
  );
};

export default InfoSidebar;
