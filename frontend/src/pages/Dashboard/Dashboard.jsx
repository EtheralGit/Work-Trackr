// import code file
import Sidebar from "../../components/Sidebar/Sidebar";
import Home from "../../components/Dashboard/Home";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <Home />
    </div>
  );
};

export default Dashboard;
