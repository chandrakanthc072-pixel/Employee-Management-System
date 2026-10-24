import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

const register = async (username, password) => {
    const response = await axios.post(`${API_URL}/register`, {
        username,
        password,
        role: "USER"
    });

    return response.data;
};

const registerAdmin = async (
    username,
    password,
    approverUsername,
    approverPassword
) => {
    const response = await axios.post(`${API_URL}/admin/register`, {
        username,
        password,
        approverUsername,
        approverPassword
    });

    return response.data;
};

const login = async (username, password, expectedRole) => {
    const response = await axios.post(
        `${API_URL}/login`,
        null,
        {
            params: {
                username,
                password
            }
        }
    );

    if (response.data.role !== expectedRole) {
        const error = new Error(
            `This account does not have the ${expectedRole} role.`
        );
        error.code = "ROLE_MISMATCH";
        throw error;
    }

    localStorage.setItem("token", response.data.token);
    localStorage.setItem("username", response.data.username);
    localStorage.setItem("role", response.data.role);
    return response.data;
};

const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
};

const isLoggedIn = () => {
    return localStorage.getItem("token") !== null;
};

export default {
    register,
    registerAdmin,
    login,
    logout,
    isLoggedIn
};