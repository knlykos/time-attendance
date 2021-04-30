import React from "react";
import { Link } from "react-router-dom";
function Home() {
  return (
    <div>
      <h3>
        <Link to={"/login"}>Go to Login</Link>
      </h3>
    </div>
  );
}

export default Home;
