// import code file
import Sidebar from "../../components/Sidebar/Sidebar";
import Goals from "../../components/Dashboard/Goals";

const GoalsPage = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <Goals />
    </div>
  );
};

export default GoalsPage;
