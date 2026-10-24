import { NavLink, useNavigate } from "react-router-dom";
import authService from "../services/authService";


function Sidebar() {

    const navigate = useNavigate();
    const username = localStorage.getItem("username") || "Account";
    const isAdmin = localStorage.getItem("role") === "ADMIN";

    const handleLogout = () => {
        authService.logout();
        navigate("/login");
    };

    return (
        <aside className="sidebar">

            <div className="logo">
                <span className="brand-mark" aria-hidden="true">E</span>
                <span className="brand-name">Employee<span>Hub</span></span>
            </div>

            <div className="sidebar-role">
                <span className="role-dot" />
                {isAdmin ? "Administrator" : "Employee viewer"}
            </div>

            <nav>
                <NavLink to="/" end>
                    <span className="nav-icon" aria-hidden="true">⌂</span>
                    <span className="nav-label">Dashboard</span>
                </NavLink>

                <NavLink to="/employees">
                    <span className="nav-icon" aria-hidden="true">♙</span>
                    <span className="nav-label">Employees</span>
                </NavLink>

                {isAdmin && (
                    <NavLink to="/employees/add">
                        <span className="nav-icon" aria-hidden="true">＋</span>
                        <span className="nav-label">Add Employee</span>
                    </NavLink>
                )}
            </nav>

            <div className="sidebar-footer">
                <div className="sidebar-account">
                    <span className="user-avatar" aria-hidden="true">
                        {username.slice(0, 2).toUpperCase()}
                    </span>
                    <span className="account-copy">
                        <strong>{username}</strong>
                        <small>{isAdmin ? "Administrator" : "Team member"}</small>
                    </span>
                </div>
                <button className="logout-btn" onClick={handleLogout}>
                    <span aria-hidden="true">↗</span>
                    <span className="nav-label">Sign out</span>
                </button>
            </div>

        </aside>
    );
}

export default Sidebar;