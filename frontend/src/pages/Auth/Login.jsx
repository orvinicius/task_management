import styles from './Auth.module.css';

import Message from '../../components/Message'


// Components
import { Link } from "react-router-dom";

// Hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"

//Redux 
import { login, reset } from "../../slices/authSlice";



const Login = ({ startManagement }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.auth);


  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    console.log(user);

    dispatch(login(user));
  }

  // Clean all auth states
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);


  return (
    <div className={styles.container} >
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
          {!loading && <input type="submit" value="Entrar" />}
          {loading && <input type="submit" disabled value="Aguarde..." />}
          {error && <Message msg={error} type="error" />}
        </div>

      </form>
      <p className={styles.input}>
        Não tem uma conta? <Link to="/register">Clique aqui</Link>
      </p>

    </div>
  );
}


export default Login;

