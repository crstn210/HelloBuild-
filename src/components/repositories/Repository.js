import React from "react";

function Repository({nameWithOwner, descriptionHTML, url}) {
    
    return ( 
        <div>
            <h3>
                <a href={url}>{nameWithOwner}</a>
            </h3>
            <p style={{ width: "75%" }} dangerouslySetInnerHTML={{ __html: descriptionHTML }}
            />
        </div>   
       
    );
  }

export default Repository;