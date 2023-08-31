import { BrowserRouter, Route, Routes } from "react-router-dom";
import Page404 from "./pages/Page404/Page404";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import AdminTemplate from "./template/AdminTemplate";
import UserManagement from "./pages/UserMagement/UserManagement";
import PageInformation from "./pages/PageInformation/PagaInformation";
import ProjectManagement from "./pages/ProjectMangement/ProjectManagement";
import ProjectDetail from "./Components/ProjectManagement/ProjectDetail/ProjectDetail";
import TaskDetail from "./Components/ProjectManagement/TaskDetail.jsx/TaskDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<Page404 />} />
        <Route path="/" element={<AdminTemplate />}>
          <Route path="usermanager" element={<UserManagement />} />
          <Route path="information" element={<PageInformation />} />
          <Route path="projectmanager" element={<ProjectManagement />} />
          <Route path="projectDetail/:id" element={<ProjectDetail />} />
        </Route>
        <Route path="/taskdetail" element={<TaskDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
