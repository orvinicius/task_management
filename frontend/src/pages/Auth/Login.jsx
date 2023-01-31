import styles from './Auth.module.css';


// Components
import { Link } from "react-router-dom";

// Hooks
import { useEffect, useState } from "react";




const Login = ({ startManagement }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");





  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    startManagement()
    console.log(user);
  }



  return (
    <div >
      <div className={styles.login}>
        <h2>Time Management</h2>
        <p className="subtitle">Faça o login para gerenciar suas tasks!</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className={styles.input}>
          <input
            type="text"
            placeholder="E-mail"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            type="password"
            placeholder="Senha"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <input type="submit" value="Entrar" />
        </div>

      </form>
      <p className={styles.input}>
        Não tem uma conta? <Link to="/register">Clique aqui</Link>
      </p>

    </div>
  );
}


export default Login;

