import "./App.css";
import "./css/style.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./component/layout/Sidebar";
import Navbar from "./component/layout/Navbar";
import Home from "./pages/Home";
import Students from "./pages/Students";
import Attendance from "./pages/Attendance";
import Teachers from "./pages/Teachers";
import Classes from "./pages/Classes";
import Calendar from "./pages/Calendar";
import Report from "./pages/Report";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddAccount from "./pages/AddAccount";
import { loadClasses, loadStudents, loadTeachers,loadEvents, loadAttendances, loadDepenses} from "./contexts/Store";
import Settings from "./pages/Settings";
import PrivateRoute from "./component/PrivateRoute";
import GlobalFonts from "./css/styled"
import { useStore } from "./contexts/Store";
import Depenses from "./pages/Depenses";
import Membership from './pages/Membership';
import MembershipList from "./pages/MembershipList";
loadClasses();
loadStudents();
loadTeachers();
loadAttendances();
loadDepenses();
loadEvents();


const App = () => {
  const theme = useStore((state) => state.theme);
  return (
    <div className={`flex ${theme.main} ${theme.text} transition-colors  duration-300`}>
      <HashRouter>
        <GlobalFonts />
        <Sidebar />
        <div className="flex-1">
          <Navbar />

          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Report />} />
              <Route path="/report" element={<Report />} />
              <Route path="/students" element={<Students />} />
              <Route path="/membership" element={<Membership />} />
              <Route path="/membershiplist" element={<MembershipList />} />
              <Route path="/attendances" element={<Attendance />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/teachers" element={<Teachers />} />
              <Route path="/classes" element={<Classes />} />
              <Route path="/depense" element={<Depenses />} />
              <Route path="/add" element={<AddAccount />} />
              <Route path="/settings/*" element={<Settings />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </HashRouter>
    </div>
  );
};

export default App;
