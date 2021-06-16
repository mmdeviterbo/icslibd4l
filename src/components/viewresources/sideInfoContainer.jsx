import React from "react";
import { toast } from "react-toastify";

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

const InfoSidebar = ({ user, resourceData }) => {
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
            <h3>Adviser(s):</h3>
            {resourceData &&
              resourceData.advisers.map((item, key) => (
                <h3 className="info-value" key={key}>
                  {item.adviser_name}
                </h3>
              ))}
            
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
            <i className="fas fa-file-image"></i>
            View Poster
          </button>
          {/* if guest/book -> display: none */}

          <button
            id="downloadjournal"
            value={resourceData && resourceData.journal}
            onClick={(e) => handleRedirect(e.target.value)}
          >
            View Journal
          </button>
          {user && user.userType !== 4 && (
            <>
              <button
                id="downloadsourcecode"
                value={resourceData && resourceData.source_code}
                onClick={(e) => handleRedirect(e.target.value)}
              >
                View Source Code
              </button>
              <br />
              <br />
              <a target="_blank" href={resourceData && resourceData.manuscript}>
                {/* <i class = "fas fa-book-open"></i> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-book"
                  viewBox="0 0 16 16"
                >
                  <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
                </svg>
                &nbsp; View Manuscript
              </a>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default InfoSidebar;
