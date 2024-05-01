// import react
import { useNavigate } from "react-router-dom";
// import code file
import DoneCard from "../../components/Cards/DoneCard";
import useGetDoneSecondary from "../../hooks/DoneHook/useGetDoneSecondary";
// import react icons
import { IoMdArrowRoundBack } from "react-icons/io";

const PrimaryDone = () => {
  const navigate = useNavigate();
  const { secLoading, secondaryDone } = useGetDoneSecondary();

  const handleButton = () => {
    setTimeout(() => {
      navigate(-1);
    }, 1000);
  };

  return (
    <>
      <div className="bg-secondary min-h-screen p-12">
        <button className="inline-block" onClick={handleButton}>
          <IoMdArrowRoundBack className="text-primary text-6xl hover:scale-110 duration-300" />
        </button>
        <div className="flex flex-col items-center">
          <h1 className="text-primary text-4xl font-bold">
            Completed Secondary Tasks
          </h1>
          <div className="grid grid-cols-3 gap-6 mt-12">
            {secLoading ? (
              <span className="loading loading-dots loading-lg"></span>
            ) : (
              secondaryDone.map((item, index) => (
                <DoneCard key={index} item={item} />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PrimaryDone;
