import styles from './Dashboard.module.css';

const Dashboard = ({ userName }) => {
    return (
        <div>
            <p>Bem vindo {userName}</p>
        </div>
    )
}

export default Dashboard