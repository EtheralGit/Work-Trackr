// import react
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import code file
import useGetSelectedTask from "../../hooks/TaskHook/useGetSelectedTask";
import { useMoveDone } from "../../hooks/DoneHook/useMoveDone";

const SelectedTask = () => {
  const [load, setLoad] = useState(false);
  const { id } = useParams();

  const Navigate = useNavigate();

  const { loading, selectedTask } = useGetSelectedTask(id);
  const { moveLoading, moveDone } = useMoveDone();

  const handleBack = () => {
    setTimeout(() => {
      setLoad(false);
      Navigate(-1);
    }, 1000);
  };

  const handleMove = async () => {
    await moveDone(id);
  };

  return (
    <div className="min-h-screen bg-secondary 2xl:p-12 flex justify-center">
      {loading ? (
        <span className="loading loading-dots loading-lg"></span>
      ) : selectedTask && Object.keys(selectedTask).length > 0 ? (
        <div className="flex flex-col items-center p-8 rounded-lg w-3/5 gap-2">
          <div className="flex gap-2 w-full ">
            <h1
              id="title"
              className="text-primary rounded-md w-full flex gap-2 items-center xl:mr-0 "
            >
              <span className="2xl:text-2xl xl:text-xl text-lg font-medium">
                Created At :
              </span>
              <h1 className="2xl:text-2xl xl:text-lg text-md ">
                {formatDate(selectedTask.createdAt)}
              </h1>
            </h1>
            <h1
              id="title"
              className="text-primary rounded-md w-full p-4 flex gap-2 items-center"
            >
              <span className="2xl:text-2xl xl:text-xl text-lg font-medium">
                Deadline :
              </span>
              <h1 className="2xl:text-2xl xl:text-lg text-md ">
                {formatOnlyDate(selectedTask.dueDate)}
              </h1>
            </h1>
          </div>
          <h1
            id="title"
            className="text-primary border border-1 border-solid border-primary border-opacity-55 
          rounded-md w-full p-4 flex gap-2 items-center"
          >
            <span className="2xl:text-2xl text-xl font-medium">Title :</span>
            <h1 className="2xl:text-2xl text-lg">{selectedTask.title}</h1>
          </h1>
          <p
            className="text-primary 2xl:text-xl text-md border border-1 border-solid border-primary border-opacity-55 
          rounded-md w-full 2xl:h-[28rem] h-[23rem] p-4 flex-col overflow-auto"
          >
            <span className="2xl:text-2xl text-xl font-medium w-full">
              Description :
            </span>
            <p className="mt-6">{selectedTask.description}</p>
          </p>
          <h1
            id="title"
            className="text-primary text-xl rounded-md w-full flex gap-2 items-center mt-2 mb-4"
          >
            <span className="2xl:text-2xl xl:text-xl font-medium">
              Category :
            </span>
            <h1>{selectedTask.category}</h1>
          </h1>
          <div className="flex justify-between items-center w-full">
            <button
              className="2xl:w-28 w-24 2xl:text-xl text-lg text-secondary bg-primary rounded-md 2xl:py-4 py-3 hover:opacity-80"
              onClick={() => {
                setLoad(true);
                handleBack();
              }}
            >
              {load ? <span className="loading loading-dots"></span> : "Back"}
            </button>
            <button
              className="2xl:w-28 w-24 2xl:text-xl text-lg text-secondary bg-primary rounded-md 2xl:py-4 py-3 hover:opacity-80"
              onClick={handleMove}
            >
              {moveLoading ? (
                <span className="loading loading-dots"></span>
              ) : (
                "Done"
              )}
            </button>
          </div>
        </div>
      ) : (
        <h1 className="text-primary text-4xl font-medium">Task not found</h1>
      )}
    </div>
  );
};

export default SelectedTask;

function formatDate(dateString) {
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
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

  // Waktu
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const hourFormat = hours % 12 || 12;
  const paddedHours = hourFormat < 10 ? "0" + hourFormat : hourFormat;
  const paddedMinutes = minutes < 10 ? "0" + minutes : minutes;

  return `${paddedDay} ${monthName} ${year} | ${paddedHours}:${paddedMinutes} ${ampm}`;
}

function formatOnlyDate(dateString) {
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
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
