import React, { useContext } from "react";
import SideMain from "../component/SideMain";
import BodyMain from "../component/BodyMain";
import SuggestMain from "../component/SuggestMain";
import CurrentPost from "../component/CurrentPost";
import UserContext from "../Context/UserContext";
import Explore from "../component/Explore";
import Message from "./Message";

const Homepage = () => {
  const {showPost,showExplore, showMessage}= useContext(UserContext)
  return (
    <div className="relative">
        <SideMain />
      {showPost && <CurrentPost className="w-[100vw] h-[100vh]"/>}
      {showExplore && <div> <Explore/> </div>}
      {showMessage && <div> <Message/> </div>}
      {!showExplore && !showMessage &&!( showPost) && <div className="flex">
        <BodyMain />
        <SuggestMain />
      </div>}
    </div>
  );
};

export default Homepage;