import { useState } from "react";
import { useNavigate } from "react-router-dom";
import employeeService from "../services/employeeService";

function AddEmployees() {

    const navigate = useNavigate();

    const [employee, setEmployee] = useState({
        name: "",
        email: "",
        phone: "",
        department: "",
        designation: "",
        salary: "",
        joiningDate: "",
        status: "Active"
    });

    const [errorMessage, setErrorMessage] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        setEmployee({
            ...employee,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setSubmitting(true);

        try {
            await employeeService.createEmployee({
                ...employee,
                salary: Number(employee.salary)
            });

            alert("Employee added successfully!");
            navigate("/employees");
        } catch (error) {
            console.error(error);

            const status = error.response?.status;
            const responseMessage = error.response?.data?.message;
            const readableResponseMessage =
                typeof responseMessage === "string" ? responseMessage : "";

            if (status === 401 || status === 403) {
                setErrorMessage(
                    `The server denied this request (HTTP ${status}). Only ADMIN accounts can add employees. Ask an administrator to grant your account access, then sign in again.`
                );
            } else if (status === 409) {
                setErrorMessage(
                    readableResponseMessage || "An employee with these details already exists."
                );
            } else if (status === 400 || status === 422) {
                setErrorMessage(
                    readableResponseMessage || "Some employee details were rejected. Check the form and try again."
                );
            } else if (status) {
                setErrorMessage(
                    readableResponseMessage || `Unable to add employee (HTTP ${status}).`
                );
            } else {
                setErrorMessage(
                    "Unable to connect to the employee server. Make sure the backend is running."
                );
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div>

            <div className="page-title">
                <div>
                    <span className="page-eyebrow">PEOPLE DIRECTORY / NEW PROFILE</span>
                    <h1>Add Employee</h1>
                    <p>Create a new employee</p>
                </div>
            </div>

            <form className="form-card" onSubmit={handleSubmit}>

                {errorMessage && (
                    <p className="login-error" role="alert">
                        {errorMessage}
                    </p>
                )}

                <div className="form-grid">

                    <div className="form-group">
                        <label>Name</label>
                        <input
                            name="name"
                            value={employee.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={employee.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Phone</label>
                        <input
                            name="phone"
                            value={employee.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Department</label>
                        <select
                            name="department"
                            value={employee.department}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Department</option>
                            <option value="IT">IT</option>
                            <option value="HR">HR</option>
                            <option value="Finance">Finance</option>
                            <option value="Marketing">Marketing</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Designation</label>
                        <input
                            name="designation"
                            value={employee.designation}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Salary</label>
                        <input
                            type="number"
                            name="salary"
                            value={employee.salary}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Joining Date</label>
                        <input
                            type="date"
                            name="joiningDate"
                            value={employee.joiningDate}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Status</label>
                        <select
                            name="status"
                            value={employee.status}
                            onChange={handleChange}
                        >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>

                </div>

                <div className="form-actions">
                    <button
                        type="button"
                        onClick={() => navigate("/employees")}
                        className="secondary-btn"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="primary-btn"
                        disabled={submitting}
                    >
                        {submitting ? "Saving..." : "Save Employee"}
                    </button>
                </div>

            </form>

        </div>
    );
}

export default AddEmployees;