// import react
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

// import code file
import SidebarProfile from "../../components/Sidebar/SidebarProfile";
import useLogout from "../../hooks/authHook/useLogout";

// react icons
import { BsThreeDotsVertical } from "react-icons/bs";
import { CgNotes } from "react-icons/cg";
import { PiNewspaperLight } from "react-icons/pi";
import { MdTaskAlt } from "react-icons/md";
import { PiTargetBold } from "react-icons/pi";
import { TbLogout2 } from "react-icons/tb";

const Sidebar = () => {
  const { loading, logout } = useLogout();
  const Navigate = useNavigate();
  const Location = useLocation();

  const isActive = (path) => {
    return Location.pathname === path
      ? "bg-secondary text-primary"
      : "text-white";
  };

  return (
    <div className="2xl:min-w-[25vh] min-w-[22vh] min-h-screen bg-primary">
      <div className="relative h-[100vh] 2xl:min-w-[25vh] min-w-[22vh] bg-primary flex flex-col items-center pr-2">
        <div className=" h-1/4 flex justify-center mt-8">
          <SidebarProfile />
        </div>

        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Hello!</h3>
            <p className="py-4">
              Press ESC key or click the button below to close
            </p>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
        <div className="w-full flex flex-col">
          <button
            className={` ${isActive(
              "/dashboard"
            )} flex gap-2 2xl:p-8 p-4 hover:scale-110 rounded-r-full outline-none duration-300
          `}
            onClick={() => {
              setTimeout(() => {
                Navigate("/dashboard");
              }, 600);
            }}
          >
            <PiNewspaperLight className="text-4xl 2xl:ml-5 ml-2" />
            <span className="2xl:text-2xl text-lg font-semibold ">Home</span>
          </button>
          <button
            className={` ${isActive(
              "/dashboard-done"
            )} flex gap-2 2xl:p-8 p-4  hover:scale-110 rounded-r-full outline-none duration-300
          `}
            onClick={() => {
              setTimeout(() => {
                Navigate("/dashboard-done");
              }, 600);
            }}
          >
            <MdTaskAlt className="text-4xl 2xl:ml-5 ml-2" />
            <span className="2xl:text-2xl text-lg font-semibold">Done</span>
          </button>
          <button
            className={` ${isActive(
              "/dashboard-notes"
            )} flex gap-2 2xl:p-8 p-4 hover:scale-110 rounded-r-full outline-none duration-300
          `}
            onClick={() => {
              setTimeout(() => {
                Navigate("/dashboard-notes");
              }, 600);
            }}
          >
            <CgNotes className="text-4xl 2xl:ml-5 ml-2" />
            <span className="2xl:text-2xl text-lg font-semibold ">Notes</span>
          </button>
          <button
            className={` ${isActive(
              "/dashboard-goals"
            )} flex gap-2 2xl:p-8 p-4 hover:scale-110 rounded-r-full outline-none duration-300
          `}
            onClick={() => {
              setTimeout(() => {
                Navigate("/dashboard-goals");
              }, 600);
            }}
          >
            <PiTargetBold className="text-4xl 2xl:ml-5 ml-2" />
            <span className="2xl:text-2xl text-lg font-semibold">Goals</span>
          </button>
        </div>
        <button onClick={logout}>
          {loading ? (
            <span className="loading loading-dots"></span>
          ) : (
            <TbLogout2 className="text-white text-4xl absolute bottom-5 left-5 hover:scale-110 duration-300" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
