// import from npm
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// import from file code
import { useAuthContext } from "../context/AuthContext";
import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import DonePages from "./pages/Dashboard/DonePage";
import NotesPage from "./pages/Dashboard/NotesPage";
import GoalsPage from "./pages/Dashboard/GoalsPage";
import NewTask from "./pages/Dashboard/NewTask";
import SecondaryTask from "./pages/Task/SecondaryTask";
import PrimaryTask from "./pages/Task/PrimaryTask";
import SelectedTask from "./pages/Task/SelectedTask";
import PrimaryDone from "./pages/DoneTask/PrimaryDone";
import SecondaryDone from "./pages/DoneTask/SecondaryDone";
import SelectedDone from "./pages/DoneTask/SelectedDone";
import CreateNote from "./pages/NotePage/CreateNote";
import EditNote from "./pages/NotePage/EditNote";
import CreateGoal from "./pages/GoalPage/CreateGoal";
import SelectedGoal from "./pages/GoalPage/SelectedGoal";

function App() {
  const { authUser } = useAuthContext();
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/dashboard" /> : <Signup />}
        />
        <Route
          path="/dashboard"
          element={authUser ? <Dashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/dashboard-done"
          element={authUser ? <DonePages /> : <Navigate to="/" />}
        />
        <Route
          path="/dashboard-notes"
          element={authUser ? <NotesPage /> : <Navigate to="/" />}
        />
        <Route
          path="/dashboard-goals"
          element={authUser ? <GoalsPage /> : <Navigate to="/" />}
        />
        <Route
          path="/dashboard-new"
          element={authUser ? <NewTask /> : <Navigate to="/" />}
        />
        <Route
          path="/primary-task"
          element={authUser ? <PrimaryTask /> : <Navigate to="/" />}
        />
        <Route
          path="/secondary-task"
          element={authUser ? <SecondaryTask /> : <Navigate to="/" />}
        />
        <Route
          path="/task/:id"
          element={authUser ? <SelectedTask /> : <Navigate to="/" />}
        />
        <Route
          path="/done/primary"
          element={authUser ? <PrimaryDone /> : <Navigate to="/" />}
        />
        <Route
          path="/done/secondary"
          element={authUser ? <SecondaryDone /> : <Navigate to="/" />}
        />
        <Route
          path="/done/:id"
          element={authUser ? <SelectedDone /> : <Navigate to="/" />}
        />
        <Route
          path="/done/:id"
          element={authUser ? <SelectedDone /> : <Navigate to="/" />}
        />
        <Route
          path="/new-note"
          element={authUser ? <CreateNote /> : <Navigate to="/" />}
        />
        <Route
          path="/edit-note/:id"
          element={authUser ? <EditNote /> : <Navigate to="/" />}
        />
        <Route
          path="/goal-create"
          element={authUser ? <CreateGoal /> : <Navigate to="/" />}
        />
        <Route
          path="/goal/:id"
          element={authUser ? <SelectedGoal /> : <Navigate to="/" />}
        />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
