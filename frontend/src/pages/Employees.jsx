import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import employeeService from "../services/employeeService";

function Employees() {

    const [search, setSearch] = useState("");
    const [department, setDepartment] = useState("");
    const [status, setStatus] = useState("");

    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [accessDenied, setAccessDenied] = useState(false);
    const isAdmin = localStorage.getItem("role") === "ADMIN";
    const hasFilters = search !== "" || department !== "" || status !== "";


    // Get employees from backend
    useEffect(() => {

        const loadEmployees = async () => {

            try {

                const data = await employeeService.getAllEmployees();

                setEmployees(data);

            } catch (error) {

                console.error(error);

                const status = error.response?.status;

                if (status === 401 || status === 403) {
                    setAccessDenied(true);
                    setError(
                        `The server denied access (HTTP ${status}). Sign in again or check your account permissions.`
                    );
                } else if (status) {
                    setError(`Unable to load employees (HTTP ${status}).`);
                } else {
                    setError(
                        "Unable to connect to the employee server. Make sure the backend is running."
                    );
                }

            } finally {

                setLoading(false);
            }
        };

        loadEmployees();

    }, []);


    // Delete employee
    const deleteEmployee = async (id) => {

        if (window.confirm("Are you sure you want to delete this employee?")) {

            try {

                await employeeService.deleteEmployee(id);

                setEmployees(
                    employees.filter(employee => employee.id !== id)
                );

            } catch (error) {

                console.error(error);

                alert("Unable to delete employee");
            }
        }
    };


    // Search + Department + Status filter
    const filteredEmployees = employees.filter(employee => {

        const matchesSearch =
            employee.name.toLowerCase().includes(search.toLowerCase()) ||
            employee.email.toLowerCase().includes(search.toLowerCase());

        const matchesDepartment =
            department === "" ||
            employee.department === department;

        const matchesStatus =
            status === "" ||
            employee.status === status;

        return (
            matchesSearch &&
            matchesDepartment &&
            matchesStatus
        );
    });


    if (loading) {
        return <h2>Loading employees...</h2>;
    }


    if (error) {
        return (
            <div role="alert">
                <h2>Unable to load employees</h2>
                <p>{error}</p>
                {accessDenied && (
                    <Link to="/login" className="primary-btn">
                        Sign in
                    </Link>
                )}
            </div>
        );
    }


    return (
        <div>

            <div className="page-title">

                <div>
                    <span className="page-eyebrow">PEOPLE DIRECTORY</span>
                    <h1>Employees</h1>
                    <p>{isAdmin ? "Manage all employees" : "View employee information"}</p>
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


            <div className="toolbar">

                <input
                    type="text"
                    aria-label="Search employees"
                    placeholder="Search by name or email..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <select
                    aria-label="Filter by department"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                >
                    <option value="">All Departments</option>
                    <option value="IT">IT</option>
                    <option value="HR">HR</option>
                    <option value="Finance">Finance</option>
                    <option value="Marketing">Marketing</option>
                </select>


                <select
                    aria-label="Filter by status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>

                {hasFilters && (
                    <button
                        type="button"
                        className="clear-filters"
                        onClick={() => {
                            setSearch("");
                            setDepartment("");
                            setStatus("");
                        }}
                    >
                        Clear filters
                    </button>
                )}

            </div>

            <div className="directory-summary" aria-live="polite">
                <span><strong>{filteredEmployees.length}</strong> of {employees.length} employees</span>
                {hasFilters && <span>Filtered results</span>}
            </div>

            <div className="section">

                <table>

                    <thead>

                    <tr>
                        <th>ID</th>
                        <th>Employee</th>
                        <th>Email</th>
                        <th>Department</th>
                        <th>Designation</th>
                        <th>Salary</th>
                        <th>Status</th>
                        {isAdmin && <th>Actions</th>}
                    </tr>

                    </thead>


                    <tbody>

                    {filteredEmployees.map(employee => (

                        <tr key={employee.id}>

                            <td>
                                {employee.id}
                            </td>


                            <td>

                              <Link to={`/employees/${employee.id}`}>
    <strong>
        {employee.name}
    </strong>
</Link>

                            </td>

                            <td>{employee.email}</td>


                            <td>
                                {employee.department}
                            </td>


                            <td>
                                {employee.designation}
                            </td>


                            <td>
                                ₹{Number(employee.salary).toLocaleString()}
                            </td>


                            <td>

                                <span
                                    className={`status ${employee.status.toLowerCase()}`}
                                >
                                    {employee.status}
                                </span>

                            </td>


                            {isAdmin && (
                                <td className="actions">
                                    <Link to={`/employees/edit/${employee.id}`}>
                                        Edit
                                    </Link>

                                    <button
                                        onClick={() => deleteEmployee(employee.id)}
                                        className="delete-btn"
                                    >
                                        Delete
                                    </button>
                                </td>
                            )}

                        </tr>

                    ))}

                    </tbody>

                </table>


                {filteredEmployees.length === 0 && (
                    <p className="empty-state">
                        {hasFilters
                            ? "No employees match these filters. Try adjusting your search."
                            : "No employees found yet."}
                    </p>

                )}

            </div>

        </div>
    );
}

export default Employees;