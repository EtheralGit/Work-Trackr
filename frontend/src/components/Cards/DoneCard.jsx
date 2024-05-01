// import react
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const DoneCard = ({ item }) => {
  const navigate = useNavigate();
  const [sliceLength, setSliceLength] = useState(
    window.innerWidth >= 1280 ? 200 : 16
  );

  const sliceDescription = (description) => {
    let sliceLength;
    if (window.innerWidth >= 1536) {
      sliceLength = 200;
    } else if (window.innerWidth >= 1280) {
      sliceLength = 55;
    } else {
      sliceLength = 36;
    }
    if (description.length < sliceLength) return description;
    return description.slice(0, sliceLength) + "...";
  };

  useEffect(() => {
    const handleResize = () => {
      setSliceLength(window.innerWidth >= 1280 ? 200 : 16);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const sliceTitle = (title) => {
    if (title.length < sliceLength) return title;
    return title.slice(0, sliceLength) + "...";
  };

  const handleSeeMore = () => {
    setTimeout(() => {
      navigate(`/done/${item._id}`);
    }, 600);
  };

  return (
    <div className="card 2xl:w-[28rem] 2xl:h-[18rem] xl:w-[22rem] xl:h-[15rem] w-[18rem] h-[15rem] bg-tertiary text-primary-content shadow-lg">
      <div className="card-body">
        <h2 className="card-title">{sliceTitle(item.title)}</h2>
        <p>{sliceDescription(item.description)}</p>
        <div className="card-actions flex justify-between items-end">
          <h1 className="font-medium text-md">
            Completed at {formatDate(item.completedAt)}
          </h1>
          <button
            className="btn bg-primary hover:opacity-75 text-secondary"
            onClick={handleSeeMore}
          >
            See More
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoneCard;

function formatDate(dateString) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const date = new Date(dateString);

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  // Padding untuk hari jika kurang dari 10
  const paddedDay = day < 10 ? "0" + day : day;

  // Mendapatkan nama bulan sesuai indeks
  const monthName = months[monthIndex];

  return `${paddedDay} ${monthName} ${year}`;
}
