// import react
import React from "react";

const SidebarProfile = () => {
  const userData = localStorage.getItem("user");
  const userProfile = JSON.parse(userData);

  return (
    <div className="bg-primary flex flex-col items-center ">
      <div className="avatar">
        <div className="2xl:w-24 w-16 rounded-full hover:scale-105 duration-300">
          <img src={userProfile.profilePic} />
        </div>
      </div>
      <h1 className="text-white text-2xl mt-2">{userProfile.username}</h1>
    </div>
  );
};

export default SidebarProfile;
