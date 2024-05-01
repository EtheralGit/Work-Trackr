// import react
import { useNavigate } from "react-router-dom";

const NoteCard = ({ item }) => {
  const navigate = useNavigate();

  const sliceDescription = (description) => {
    let sliceLength;
    if (window.innerWidth >= 1536) {
      sliceLength = 200;
    } else if (window.innerWidth >= 1280) {
      sliceLength = 80;
    } else {
      sliceLength = 46;
    }
    if (description.length < sliceLength) return description;
    return description.slice(0, sliceLength) + "...";
  };
  const handleSeeMore = () => {
    setTimeout(() => {
      navigate(`/edit-note/${item._id}`);
    }, 600);
  };

  return (
    <div
      className="card 2xl:w-[22rem] xl:w-[18rem] 2xl:h-[18rem]  h-[15rem] bg-[#FFFBF5] text-primary-content
       hover:scale-105 duration-300 cursor-pointer 
      shadow-lg rounded-sm "
      onClick={handleSeeMore}
    >
      <div className="card-body">
        <h1 className="font-medium xl:text-md text-sm">
          {formatDate(item.createdAt)}
        </h1>
        <h2 className="card-title overflow-hidden xl:text-xl text-md">
          {item.title}
        </h2>
        <p>{sliceDescription(item.description)}</p>
      </div>
    </div>
  );
};

export default NoteCard;

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
