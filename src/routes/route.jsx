import { useContext } from "react";
import { AuthContext } from "../context/userContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./protected";
import { Home } from "../pages/home/home";
import { SignUp } from "../pages/signup/signup";
import { Login } from "../pages/login/login";
import Layout from "../pages/layouts/layout";
import { UserDash } from "../pages/user_dashboard/userDash";
import { ReservationDash } from "../pages/reservation_dashboard/reservationDash";
import { TableDash } from "../pages/table_dashboard/tableDash";
import DashLayout from "../pages/layouts/dashLayout/dashLayout";
import { NotFound } from "../pages/notFound/notFound";
import { Unauthorized } from "../pages/unauthorized/unauthorized";

const Router = () => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </Route>
          <Route
            element={
              <ProtectedRoute
                isAllowed={user && user.role === "Admin"}
                redirectPath="/unauthorized"
              />
            }
          >
            <Route element={<DashLayout />}>
              <Route path="/dash/users" element={<UserDash />} />
              <Route path="/dash/tables" element={<TableDash />} />
              <Route path="/dash/reservations" element={<ReservationDash />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Router;
