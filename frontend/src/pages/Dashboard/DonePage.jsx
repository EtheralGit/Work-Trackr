// import code file
import Sidebar from "../../components/Sidebar/Sidebar";
import Done from "../../components/Dashboard/Done";

const DonePages = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <Done />
    </div>
  );
};

export default DonePages;
