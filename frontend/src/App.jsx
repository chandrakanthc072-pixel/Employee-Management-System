import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
    Outlet
} from "react-router-dom";

import Sidebar from "./components/Sidebar";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import AddEmployees from "./pages/AddEmployees";
import EditEmployee from "./pages/EditEmployee";
import EmployeeDetails from "./pages/EmployeeDetails";


function ProtectedRoute() {

    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}

function AdminRoute() {
    if (localStorage.getItem("role") !== "ADMIN") {
        return <Navigate to="/employees" replace />;
    }

    return <Outlet />;
}


function Layout() {
    const username = localStorage.getItem("username") || "Account";
    const role = localStorage.getItem("role");

    return (
        <div className="app">

            <Sidebar />

            <main className="main">
                <header className="topbar">
                    <div className="workspace-title">
                        <span>WORKSPACE</span>
                        <strong>People operations</strong>
                    </div>

                    <div className="topbar-account">
                        <span className="user-avatar" aria-hidden="true">
                            {username.slice(0, 2).toUpperCase()}
                        </span>
                        <span className="account-copy">
                            <strong>{username}</strong>
                            <small>{role === "ADMIN" ? "Administrator" : "Team member"}</small>
                        </span>
                    </div>
                </header>

                <div className="page-content">
                    <Outlet />
                </div>
            </main>

        </div>
    );
}


function App() {

    return (
        <BrowserRouter>

            <Routes>

                {/* Login */}
                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/admin/login"
                    element={<Login role="ADMIN" />}
                />

                <Route
                    path="/user/login"
                    element={<Login role="USER" />}
                />

                <Route
                    path="/signup"
                    element={<Signup />}
                />

                <Route
                    path="/admin/signup"
                    element={<Signup role="ADMIN" />}
                />


                {/* Protected Routes */}
                <Route element={<ProtectedRoute />}>

                    <Route element={<Layout />}>

                        <Route
                            path="/"
                            element={<Dashboard />}
                        />

                        <Route
                            path="/employees"
                            element={<Employees />}
                        />

                        <Route element={<AdminRoute />}>
                            <Route
                                path="/employees/add"
                                element={<AddEmployees />}
                            />

                            <Route
                                path="/employees/edit/:id"
                                element={<EditEmployee />}
                            />
                        </Route>

                        <Route
                            path="/employees/:id"
                            element={<EmployeeDetails />}
                        />

                    </Route>

                </Route>


                {/* Unknown URL */}
                <Route
                    path="*"
                    element={<Navigate to="/" replace />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;