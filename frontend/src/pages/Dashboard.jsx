import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import teamIllustration from "../assets/team-illustration.svg";
import employeeService from "../services/employeeService";


function Dashboard() {

    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const isAdmin = localStorage.getItem("role") === "ADMIN";

    useEffect(() => {

        const loadEmployees = async () => {

            try {
                const data = await employeeService.getAllEmployees();
                setEmployees(data);

            } catch (error) {
                console.error(error);

            } finally {
                setLoading(false);
            }
        };

        loadEmployees();

    }, []);


    const totalEmployees = employees.length;

    const activeEmployees = employees.filter(
        employee => employee.status === "Active"
    ).length;

    const inactiveEmployees = employees.filter(
        employee => employee.status === "Inactive"
    ).length;

    const departments = new Set(
        employees.map(employee => employee.department)
    ).size;


    if (loading) {
        return <h2>Loading dashboard...</h2>;
    }


    return (
        <div>

            <div className="page-title dashboard-title">

                <div>
                    <span className="page-eyebrow">YOUR TEAM AT A GLANCE</span>
                    <h1>Dashboard</h1>
                    <p>
                        {isAdmin
                            ? "Overview of your employee management system"
                            : "Employee directory overview"}
                    </p>
                </div>

                {isAdmin && (
                    <Link
                        to="/employees/add"
                        className="primary-btn"
                    >
                        <span aria-hidden="true">＋</span> Add Employee
                    </Link>
                )}

            </div>


           <div className="cards">

    <div className="card">
        <span className="card-icon total-icon" aria-hidden="true">♙</span>
        <span>Total employees</span>
        <h2>{totalEmployees}</h2>
        <small>People in your directory</small>
    </div>

    <div className="card">
        <span className="card-icon active-icon" aria-hidden="true">✓</span>
        <span>Active employees</span>
        <h2>{activeEmployees}</h2>
        <small>Currently active</small>
    </div>

    <div className="card">
        <span className="card-icon inactive-icon" aria-hidden="true">Ⅱ</span>
        <span>Inactive employees</span>
        <h2>{inactiveEmployees}</h2>
        <small>Not currently active</small>
    </div>

    <div className="card">
        <span className="card-icon department-icon" aria-hidden="true">◇</span>
        <span>Departments</span>
        <h2>{departments}</h2>
        <small>Across your organization</small>
    </div>

</div>

            <div className="dashboard-bottom-grid">
            <div className="section">

                <div className="section-header">

                    <div>
                        <span className="section-kicker">LATEST PEOPLE</span>
                        <h2>Recent employees</h2>
                    </div>

                    <Link to="/employees">
                        View All
                    </Link>

                </div>


                <table>

                    <thead>

                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Designation</th>
                        <th>Status</th>
                    </tr>

                    </thead>


                    <tbody>

                    {employees.slice(-5).reverse().map(employee => (

                        <tr key={employee.id}>

                            <td>{employee.id}</td>

                            <td>{employee.name}</td>

                            <td>{employee.department}</td>

                            <td>{employee.designation}</td>

                            <td>
                                <span
                                    className={`status ${employee.status.toLowerCase()}`}
                                >
                                    {employee.status}
                                </span>
                            </td>

                        </tr>

                    ))}

                    </tbody>

                </table>


                {employees.length === 0 && (
                    <p className="empty-state">
                        No employees yet. Add your first team member to get started.
                    </p>
                )}

            </div>

                {isAdmin && (
                    <aside className="team-promo">
                        <span className="page-eyebrow">GROW TOGETHER</span>
                        <h2>Great teams start here.</h2>
                        <p>Bring your people together and keep your team moving forward.</p>
                        <img
                            src={teamIllustration}
                            alt="Coworkers collaborating around a laptop"
                        />
                        <Link to="/employees/add" className="primary-btn">
                            <span aria-hidden="true">＋</span> Add Employee
                        </Link>
                    </aside>
                )}
            </div>

        </div>
    );
}

export default Dashboard;