import { BrowserRouter, Route, Routes } from "react-router-dom";
import Page404 from "./pages/Page404/Page404";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import AdminTemplate from "./template/AdminTemplate";
import UserManagement from "./pages/UserMagement/UserManagement";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<Page404 />} />
        <Route path="/admin" element={<AdminTemplate />}>
          <Route path="usermanager" element={<UserManagement />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
