// import react
import React from "react";
import { useNavigate } from "react-router-dom";
// import coding file
import useGetSecondary from "../../hooks/TaskHook/useGetSecondary";
// import react icons
import { IoMdArrowRoundBack } from "react-icons/io";
import HomeCard from "../../components/Cards/HomeCard";

const PrimaryTask = () => {
  const { secLoad, secondary } = useGetSecondary();
  const Navigate = useNavigate();

  const handleButton = () => {
    setTimeout(() => {
      Navigate("/dashboard");
    }, 1000);
  };

  // Fungsi untuk mengonversi tanggal ke objek Date
  const parseDate = (dateString) => new Date(dateString);

  // Fungsi untuk membandingkan dua objek berdasarkan tanggal
  const compareDates = (a, b) => parseDate(a.dueDate) - parseDate(b.dueDate);

  // Mengurutkan task berdasarkan tanggal tercepat untuk tiba
  const sortedSecondaryTasks = secLoad
    ? []
    : secondary.slice().sort(compareDates);

  return (
    <>
      <div className="bg-secondary min-h-screen 2xl:p-12 p-4">
        <button className="inline-block" onClick={handleButton}>
          <IoMdArrowRoundBack className="text-primary text-6xl hover:scale-110 duration-300" />
        </button>
        <div className="flex flex-col items-center">
          <h1 className="text-primary text-4xl font-bold">Secondary Tasks</h1>
          <div className="grid grid-cols-3 gap-6 mt-12">
            {secLoad ? (
              <span className="loading loading-dots loading-lg"></span>
            ) : (
              sortedSecondaryTasks.map((item, index) => (
                <HomeCard key={index} item={item} />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PrimaryTask;
