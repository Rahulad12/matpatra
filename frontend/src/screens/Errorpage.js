import React from "react";
import { useRouteError } from "react-router-dom";
import "../style/errorpage.css"


const Error = () => {
  const error = useRouteError();
  console.log(error);

  return (
    <div className="error-route">
    
      <iframe src="https://giphy.com/embed/xTiN0L7EW5trfOvEk0" width="480" height="480"  class="giphy-embed" allowFullScreen></iframe>

      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
};

export default Error;
