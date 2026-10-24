function Header() {
    return (
        <header className="header">
            <div>
                <h2>Employee Dashboard</h2>
                <p>Manage your employees efficiently</p>
            </div>

            <div className="profile">
                <div className="avatar">CK</div>

                <div>
                    <strong>Admin</strong>
                    <small>Administrator</small>
                </div>
            </div>
        </header>
    );
}

export default Header;