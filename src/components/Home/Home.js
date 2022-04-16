import React from "react";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import Navigation from "../Navigation/Navigation";

const Home = () => {
  return (
    <>
      <div>
        <Navigation></Navigation>
      </div>
      <div>
        <Main></Main>
      </div>
      <div>
        <Footer></Footer>
      </div>
    </>
  );
};

export default Home;
