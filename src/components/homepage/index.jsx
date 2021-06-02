import React from 'react'

export default function Index(props) {
    return (
        <>
            {/* {props.files && props.files.map(file=><img src={`${file.filename}`} alt=""/>)} */}
            {props.files && props.files.map(file=>{
                file.isImage? <img src={`${file.filename}`} alt=""/> : <p>{file.filename}</p> 
            })}
        </>
    )
}