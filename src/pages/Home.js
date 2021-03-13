import React from "react";
import { Link } from "react-router-dom";
function Home() {
  return (
    <div>
      <h3>
        <Link to={"/Login"}>Go to Login</Link>
      </h3>
    </div>
  );
}

export default Home;
