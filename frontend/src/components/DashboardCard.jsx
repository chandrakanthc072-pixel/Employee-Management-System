function DashboardCard({ title, value }) {

    return (
        <div className="card">
            <span>{title}</span>
            <h2>{value}</h2>
        </div>
    );
}

export default DashboardCard;