import React from 'react' 

const TitleAuthorHere = ({title, authorList, year}) => {
    return(
        <div className = "TitleAuthor">

            {/* title in h1 */}
            <h1>
                {title}
            </h1>

            {/* author in h3 */}
            <h3>
                {authorList.map((item, key) =>
                    <div key={key}>
                        {item}
                    </div>
                )}
            </h3>   

            <div className = "dateandview">
                {/* publish date in p */}
                <p>
                    {year}
                    {/* Published on January 04, 2021 */}
                </p>
            </div>

            <hr/>

        </div>
    )
}

export default TitleAuthorHere