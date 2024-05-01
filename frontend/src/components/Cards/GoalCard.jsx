// impoort react icons
import { FaArrowRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const GoalCard = ({ item }) => {
  const navigate = useNavigate();

  console.log("goalcard ", item);

  const handleClick = () => {
    setTimeout(() => {
      navigate(`/goal/${item._id}`);
    }, 1000);
  };

  const sliceDescription = (description) => {
    let sliceLength;
    if (window.innerWidth >= 1536) {
      sliceLength = 120;
    } else if (window.innerWidth >= 1280) {
      sliceLength = 80;
    } else {
      sliceLength = 66;
    }
    if (description.length < sliceLength) return description;
    return description.slice(0, sliceLength) + "...";
  };

  return (
    <div className="relative h-36 w-full bg-tertiary shadow-xl flex justify-between xl:p-8 p-6 rounded-r-full">
      <div className="w-[80%]">
        <div
          className="flex items-center gap-2 border-b-4 border-opacity-80 border-primary 2
        2xl:w-[15%] w-[30%] mb-1"
        >
          <h2 className="text-primary text-lg">Until: </h2>
          <span className="text-primary text-md font-bold">
            {item.completedAt}
          </span>
        </div>
        <h1 className="text-primary 2xl:text-2xl text-xl font-semibold">
          {item.title}
        </h1>
        <p className="text-primary text-md">{sliceDescription(item.text)}</p>
      </div>
      <button className="absolute top-0 bottom-0 right-8" onClick={handleClick}>
        <FaArrowRight className="w-12 h-12 text-primary hover:scale-110 duration-300 cursor-pointer" />
      </button>
    </div>
  );
};

export default GoalCard;
