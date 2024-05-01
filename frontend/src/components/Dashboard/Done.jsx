// import react
import { useNavigate } from "react-router-dom";

// import code file
import useGetDonePrimary from "../../hooks/DoneHook/useGetDonePrimary";
import DoneCard from "../Cards/DoneCard";

// import react icons
import { MdArrowOutward } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import { LuCopyX } from "react-icons/lu";
import useGetDoneSecondary from "../../hooks/DoneHook/useGetDoneSecondary";

const Home = () => {
  const Navigate = useNavigate();
  const { loading, primaryDone } = useGetDonePrimary();
  const { secLoading, secondaryDone } = useGetDoneSecondary();

  const handlePrimary = () => {
    setTimeout(() => {
      Navigate("/done/primary");
    }, 1000);
  };

  const handleSecondary = () => {
    setTimeout(() => {
      Navigate("/done/secondary");
    }, 1000);
  };

  return (
    <div className="w-full bg-secondary flex flex-col 2xl:p-8 p-4 pl-8">
      <div className="flex justify-between items-center">
        <h1 className="text-primary 2xl:text-4xl xl:text-2xl text-2xl font-semibold">
          Done
        </h1>
      </div>
      <span className="block border border-1 border-primary 2xl:mb-8 mt-4"></span>
      {primaryDone.length < 1 && secondaryDone.length < 1 ? (
        <div className="w-full h-[80%] flex flex-col justify-center items-center">
          <LuCopyX className="text-primary 2xl:text-[12rem] xl:text-[10rem] text-[8rem] mb-4" />
          <h1 className="text-primary 2xl:text-4xl xl:text-3xl text-2xl font-bold">
            No Task Completed Yet
          </h1>
          <p className="text-primary opacity-75 text-xl flex justify-center items-center">
            Currently, there are no completed tasks in the list
          </p>
        </div>
      ) : (
        <div>
          <div className="">
            <h1 className="text-black 2xl:text-3xl xl:text-2xl text-xl font-semibold mb-4 mt-2">
              Primary Task
            </h1>
            <div className="flex items-center gap-4 ">
              {primaryDone.map((item, index) =>
                index < 3 ? (
                  <DoneCard key={item._id} item={item} />
                ) : index === 3 ? (
                  <button
                    className="2xl:ml-12 outline-none "
                    onClick={handlePrimary}
                  >
                    <FaArrowRight className="2xl:w-16 2xl:h-16 xl:w-12 xl:h-12 w-8 h-8 text-primary hover:scale-125 duration-300" />
                  </button>
                ) : null
              )}
            </div>
            {primaryDone.length === 0 && (
              <div className="flex flex-col justify-center items-center w-full 2xl:h-64 h-56">
                <h1 className="text-primary 2xl:text-4xl text-3xl font-bold">
                  No Primary Task Completed Yet
                </h1>
                <p className="text-primary opacity-75 text-xl flex justify-center items-center">
                  Let's organize your important task
                  <MdArrowOutward className="opacity-100 w-8 h-8" />
                </p>
              </div>
            )}
          </div>
          <div className="mt-8">
            <h1 className="text-black 2xl:text-3xl xl:text-2xl text-xl font-semibold mb-4 mt-2">
              Secondary Task
            </h1>
            <div className="flex items-center gap-4">
              {secondaryDone.map((item, index) =>
                index < 3 ? (
                  <DoneCard key={item._id} item={item} />
                ) : index === 3 ? (
                  <button
                    className="2xl:ml-12 outline-none"
                    onClick={handleSecondary}
                  >
                    <FaArrowRight className="2xl:w-16 2xl:h-16 xl:w-12 xl:h-12 w-8 h-8 text-primary hover:scale-125 duration-300" />
                  </button>
                ) : null
              )}
            </div>
            {secondaryDone.length === 0 && (
              <div className="flex flex-col justify-center items-center w-full 2xl:h-64 h-56">
                <h1 className="text-primary 2xl:text-4xl text-3xl font-bold">
                  No Secondary Task Completed Yet
                </h1>
                <p className="text-primary opacity-75 text-xl flex justify-center items-center">
                  Let's organize your additional task
                  <MdArrowOutward className="opacity-100 w-8 h-8" />
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
