import { useState } from "react";
import { Link } from "react-router-dom";
import teamIllustration from "../assets/team-illustration.svg";
import authService from "../services/authService";

function Signup({ role = "USER" }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [approverUsername, setApproverUsername] = useState("");
    const [approverPassword, setApproverPassword] = useState("");
    const [error, setError] = useState("");
    const [registered, setRegistered] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const handleSignup = async (event) => {
        event.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setSubmitting(true);

        try {
            if (role === "ADMIN") {
                await authService.registerAdmin(
                    username,
                    password,
                    approverUsername,
                    approverPassword
                );
            } else {
                await authService.register(username, password);
            }
            setRegistered(true);
        } catch (error) {
            if (error.response?.status === 409) {
                setError("That username is already taken. Choose another one.");
            } else if (role === "ADMIN" && error.response?.status === 403) {
                setError("The approving admin username or password is incorrect.");
            } else if (error.response) {
                setError(`Unable to create account (HTTP ${error.response.status}).`);
            } else {
                setError("Unable to connect to server. Please try again.");
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
                    <h2>Build a stronger<br />team together.</h2>
                    <p>Get the people directory and tools you need to stay in sync.</p>
                </div>
                <img
                    className="auth-illustration"
                    src={teamIllustration}
                    alt="Illustration of coworkers collaborating around a laptop"
                />
                <span className="auth-aside-note">People operations, made simple.</span>
            </section>
            <div className="login-card">
                <span className="page-eyebrow">{role === "ADMIN" ? "MANAGEMENT ACCESS" : "GET STARTED"}</span>
                <h1>{role === "ADMIN" ? "Create admin account" : "Create account"}</h1>
                <p>
                    {role === "ADMIN"
                        ? "An existing admin must approve this new admin account."
                        : "Sign up for the Employee Dashboard"}
                </p>

                {registered ? (
                    <>
                        <p role="status">
                            {role === "ADMIN"
                                ? "The admin account was created. Sign in to continue."
                                : "Your account was created. Sign in to continue."}
                        </p>
                        <Link
                            to={role === "ADMIN" ? "/admin/login" : "/user/login"}
                            className="primary-btn login-btn"
                        >
                            Go to {role === "ADMIN" ? "admin" : "user"} login
                        </Link>
                    </>
                ) : (
                    <form onSubmit={handleSignup}>
                        {role === "ADMIN" && (
                            <>
                                <div className="form-group">
                                    <label htmlFor="approver-username">
                                        Existing admin username
                                    </label>
                                    <input
                                        id="approver-username"
                                        type="text"
                                        autoComplete="username"
                                        value={approverUsername}
                                        onChange={(event) =>
                                            setApproverUsername(event.target.value)
                                        }
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="approver-password">
                                        Existing admin password
                                    </label>
                                    <input
                                        id="approver-password"
                                        type="password"
                                        autoComplete="current-password"
                                        value={approverPassword}
                                        onChange={(event) =>
                                            setApproverPassword(event.target.value)
                                        }
                                        required
                                    />
                                </div>
                            </>
                        )}

                        <div className="form-group">
                            <label htmlFor="signup-username">
                                {role === "ADMIN" ? "New admin username" : "Username"}
                            </label>
                            <input
                                id="signup-username"
                                type="text"
                                autoComplete="username"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                                placeholder="Choose a username"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="signup-password">
                                {role === "ADMIN" ? "New admin password" : "Password"}
                            </label>
                            <input
                                id="signup-password"
                                type="password"
                                autoComplete="new-password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                placeholder="Create a password"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="signup-confirm-password">
                                Confirm password
                            </label>
                            <input
                                id="signup-confirm-password"
                                type="password"
                                autoComplete="new-password"
                                value={confirmPassword}
                                onChange={(event) =>
                                    setConfirmPassword(event.target.value)
                                }
                                placeholder="Enter your password again"
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
                            {submitting ? "Creating account..." : "Sign up"}
                        </button>
                    </form>
                )}

                {!registered && role === "USER" && (
                    <p className="auth-switch">
                        Already have an account? <Link to="/login">Log in</Link>
                    </p>
                )}
                {!registered && role === "ADMIN" && (
                    <p className="auth-switch">
                        <Link to="/admin/login">Back to admin login</Link>
                    </p>
                )}
            </div>
        </div>
    );
}

export default Signup;
