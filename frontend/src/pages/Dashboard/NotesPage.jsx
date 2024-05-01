// import code file
import Sidebar from "../../components/Sidebar/Sidebar";
import Notes from "../../components/Dashboard/Note";

const NotesPage = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <Notes />
    </div>
  );
};

export default NotesPage;
