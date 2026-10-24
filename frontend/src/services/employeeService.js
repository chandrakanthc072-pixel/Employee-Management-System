import axios from "axios";

const API_URL = "http://localhost:8080/api/employees";

const getAuthHeader = () => {
    const token = localStorage.getItem("token");

    return {
        Authorization: `Bearer ${token}`
    };
};

const getAllEmployees = async () => {
    const response = await axios.get(API_URL, {
        headers: getAuthHeader()
    });

    return response.data;
};

const getEmployeeById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`, {
        headers: getAuthHeader()
    });

    return response.data;
};

const createEmployee = async (employee) => {
    const response = await axios.post(
        API_URL,
        employee,
        {
            headers: getAuthHeader()
        }
    );

    return response.data;
};

const updateEmployee = async (id, employee) => {
    const response = await axios.put(
        `${API_URL}/${id}`,
        employee,
        {
            headers: getAuthHeader()
        }
    );

    return response.data;
};

const deleteEmployee = async (id) => {
    const response = await axios.delete(
        `${API_URL}/${id}`,
        {
            headers: getAuthHeader()
        }
    );

    return response.data;
};

export default {
    getAllEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee
};