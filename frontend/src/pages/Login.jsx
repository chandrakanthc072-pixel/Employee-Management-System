import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import teamIllustration from "../assets/team-illustration.svg";
import authService from "../services/authService";

function Login({ role }) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const navigate = useNavigate();

    if (!role) {
        return (
            <div className="login-page">
                <section className="auth-aside">
                    <span className="auth-brand"><span className="brand-mark">E</span> EmployeeHub</span>
                    <div className="auth-message">
                        <span className="auth-eyebrow">A BETTER WAY TO WORK</span>
                        <h2>Your people.<br />All in <span>one place.</span></h2>
                        <p>A clear view of your team, wherever your work takes you.</p>
                    </div>
                    <img
                        className="auth-illustration"
                        src={teamIllustration}
                        alt="Illustration of coworkers collaborating around a laptop"
                    />
                    <span className="auth-aside-note">People operations, made simple.</span>
                </section>
                <div className="login-card">
                    <span className="page-eyebrow">WELCOME TO EMPLOYEEHUB</span>
                    <h1>Let&apos;s get you in</h1>
                    <p>Choose the sign-in experience that fits your role.</p>

                    <div className="login-options">
                        <Link to="/admin/login" className="primary-btn login-btn">
                            <span>Admin Login</span>
                            <span aria-hidden="true">→</span>
                        </Link>
                        <Link to="/user/login" className="secondary-btn login-btn">
                            <span>User Login</span>
                            <span aria-hidden="true">→</span>
                        </Link>
                    </div>

                    <p className="auth-switch">
                        Need a user account? <Link to="/signup">Sign up</Link>
                    </p>
                </div>
            </div>
        );
    }

    const handleLogin = async (e) => {

        e.preventDefault();

        setError("");
        setSubmitting(true);

        try {

            await authService.login(username, password, role);

            navigate("/");

        } catch (error) {

            if (error.code === "ROLE_MISMATCH") {
                setError(
                    `This account is not registered as ${role}. Choose the correct login page or contact an administrator.`
                );
            } else if (error.response?.status === 401) {
                setError("Invalid username or password");
            } else {
                setError("Unable to connect to server");
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="login-page">

            <section className="auth-aside">
                <span className="auth-brand"><span className="brand-mark">E</span> EmployeeHub</span>
                <div className="auth-message">
                    <span className="auth-eyebrow">A BETTER WAY TO WORK</span>
                    <h2>Your people.<br />All in <span>one place.</span></h2>
                    <p>A clear view of your team, wherever your work takes you.</p>
                </div>
                <img
                    className="auth-illustration"
                    src={teamIllustration}
                    alt="Illustration of coworkers collaborating around a laptop"
                />
                <span className="auth-aside-note">People operations, made simple.</span>
            </section>

            <div className="login-card">

                <span className="page-eyebrow">{role === "ADMIN" ? "MANAGEMENT ACCESS" : "DIRECTORY ACCESS"}</span>
                <h1>{role === "ADMIN" ? "Admin Login" : "User Login"}</h1>

                <p>
                    {role === "ADMIN"
                        ? "Sign in to manage employees."
                        : "Sign in to view employee information."}
                </p>

                <form onSubmit={handleLogin}>

                    <div className="form-group">

                        <label htmlFor="login-username">Username</label>

                        <input
                            id="login-username"
                            type="text"
                            value={username}
                            onChange={(e) =>
                                setUsername(e.target.value)
                            }
                            autoComplete="username"
                            placeholder="Enter username"
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label htmlFor="login-password">Password</label>

                        <input
                            id="login-password"
                            type="password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            autoComplete="current-password"
                            placeholder="Enter password"
                            required
                        />

                    </div>

                    {error && (
                        <p className="login-error" role="alert">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="primary-btn login-btn"
                        disabled={submitting}
                    >
                        {submitting ? "Signing in..." : `Login as ${role === "ADMIN" ? "Admin" : "User"}`}
                    </button>

                </form>

                <p className="auth-switch login-navigation">
                    <Link to="/login">Choose another login</Link>
                    {role === "ADMIN" && (
                        <>
                            {" · "}
                            <Link to="/admin/signup">Create admin account</Link>
                        </>
                    )}
                    {role === "USER" && (
                        <>
                            {" · "}
                            <Link to="/signup">Sign up</Link>
                        </>
                    )}
                </p>

            </div>

        </div>
    );
}

export default Login;
