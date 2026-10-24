import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import employeeService from "../services/employeeService";

function EmployeeDetails() {

    const { id } = useParams();
    const navigate = useNavigate();
    const isAdmin = localStorage.getItem("role") === "ADMIN";

    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const loadEmployee = async () => {

            try {

                const data = await employeeService.getEmployeeById(id);

                setEmployee(data);

            } catch (error) {

                console.error(error);
                setError("Unable to load employee details");

            } finally {

                setLoading(false);

            }
        };

        loadEmployee();

    }, [id]);


    if (loading) {
        return (
            <div>
                <h2>Loading employee details...</h2>
            </div>
        );
    }


    if (error) {
        return (
            <div>
                <h2>{error}</h2>

                <button
                    className="secondary-btn"
                    onClick={() => navigate("/employees")}
                >
                    Back to Employees
                </button>
            </div>
        );
    }


    if (!employee) {
        return (
            <div>
                <h2>Employee not found</h2>

                <Link
                    to="/employees"
                    className="secondary-btn"
                >
                    Back to Employees
                </Link>
            </div>
        );
    }


    return (
        <div>

            <div className="page-title">

                <div>
                    <span className="page-eyebrow">PEOPLE DIRECTORY / PROFILE</span>
                    <h1>Employee Details</h1>
                    <p>View employee information</p>
                </div>

                <Link
                    to="/employees"
                    className="secondary-btn"
                >
                    Back to Employees
                </Link>

            </div>


            <div className="details-card">

                <div className="details-hero">
                    <div className="profile-avatar" aria-hidden="true">
                        {(employee.name || "?").slice(0, 1).toUpperCase()}
                    </div>
                    <div>
                        <h2>{employee.name}</h2>
                        <p>{employee.designation} <span>·</span> {employee.department}</p>
                    </div>
                    <span className={`status ${employee.status.toLowerCase()}`}>
                        {employee.status}
                    </span>
                </div>

                <div className="details-grid">

                    <div className="detail-item">
                        <label>ID</label>
                        <strong>#{employee.id}</strong>
                    </div>


                    <div className="detail-item">
                        <label>Name</label>
                        <strong>{employee.name || "—"}</strong>
                    </div>


                    <div className="detail-item">
                        <label>Email</label>
                        <strong>{employee.email || "—"}</strong>
                    </div>


                    <div className="detail-item">
                        <label>Phone</label>
                        <strong>{employee.phone || "—"}</strong>
                    </div>


                    <div className="detail-item">
                        <label>Department</label>
                        <strong>{employee.department || "—"}</strong>
                    </div>


                    <div className="detail-item">
                        <label>Designation</label>
                        <strong>{employee.designation || "—"}</strong>
                    </div>


                    <div className="detail-item">
                        <label>Salary</label>
                        <strong>₹{Number(employee.salary || 0).toLocaleString()}</strong>
                    </div>


                    <div className="detail-item">
                        <label>Joining Date</label>
                        <strong>{employee.joiningDate || "—"}</strong>
                    </div>


                    <div className="detail-item">
                        <label>Status</label>
                        <strong>{employee.status || "—"}</strong>
                    </div>

                </div>


                <div className="form-actions">

                    {isAdmin && (
                        <Link
                            to={`/employees/edit/${employee.id}`}
                            className="primary-btn"
                        >
                            Edit Employee
                        </Link>
                    )}

                    <Link
                        to="/employees"
                        className="secondary-btn"
                    >
                        Back
                    </Link>

                </div>

            </div>

        </div>
    );
}

export default EmployeeDetails;