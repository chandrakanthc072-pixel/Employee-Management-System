import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import employeeService from "../services/employeeService";

function EditEmployee() {

    const { id } = useParams();
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

    const [loading, setLoading] = useState(true);

    // Get employee from backend
    useEffect(() => {

        const loadEmployee = async () => {
            try {
                const data = await employeeService.getEmployeeById(id);

                setEmployee({
                    name: data.name || "",
                    email: data.email || "",
                    phone: data.phone || "",
                    department: data.department || "",
                    designation: data.designation || "",
                    salary: data.salary || "",
                    joiningDate: data.joiningDate || "",
                    status: data.status || "Active"
                });

            } catch (error) {
                console.error(error);
                alert("Unable to load employee");
                navigate("/employees");
            } finally {
                setLoading(false);
            }
        };

        loadEmployee();

    }, [id, navigate]);


    const handleChange = (e) => {
        setEmployee({
            ...employee,
            [e.target.name]: e.target.value
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            await employeeService.updateEmployee(id, {
                ...employee,
                salary: Number(employee.salary)
            });

            alert(`Employee ${id} updated successfully!`);

            navigate("/employees");

        } catch (error) {
            console.error(error);
            alert("Unable to update employee");
        }
    };


    if (loading) {
        return <h2>Loading employee...</h2>;
    }


    return (
        <div>

            <div className="page-title">
                <div>
                    <span className="page-eyebrow">PEOPLE DIRECTORY / UPDATE PROFILE</span>
                    <h1>Edit Employee</h1>
                    <p>Update employee information</p>
                </div>
            </div>


            <form className="form-card" onSubmit={handleSubmit}>

                <div className="form-grid">

                    <div className="form-group">
                        <label>Employee ID</label>
                        <input value={id} disabled />
                    </div>


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
                        className="secondary-btn"
                        onClick={() => navigate("/employees")}
                    >
                        Cancel
                    </button>


                    <button
                        type="submit"
                        className="primary-btn"
                    >
                        Update Employee
                    </button>

                </div>

            </form>

        </div>
    );
}

export default EditEmployee;