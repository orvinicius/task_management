import styles from './Navbar.module.css';

//Components
import { NavLink, Link } from "react-router-dom";
import { Home, PieChart, User, List } from 'react-feather'


// Hooks
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Redux
import { logout, reset } from "../slices/authSlice";

const Navbar = () => {
    const { auth } = useAuth();
    const { user } = useSelector((state) => state.auth);

    // const [query, setQuery] = useState("");

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        dispatch(reset());

        navigate("/login");
    };

    // const handleSearch = (e) => {
    //     e.preventDefault();

    //     if (query) {
    //         return navigate(`/search?q=${query}`);
    //     }
    // };

    return (
        <nav className={styles.nav}>
            <div className={styles.title}>
                <Link to="/tasks" className={styles.link}><p>Task Management</p></Link>
            </div>
            {/* <form id="search-form" onSubmit={handleSearch}>
                <BsSearch />
                <input
                    type="text"
                    placeholder="Pesquisar"
                    onChange={(e) => setQuery(e.target.value)}
                />
            </form> */}
            <ul className={styles.navLinks}>
                {auth ? (
                    <>
                        <li>
                            <NavLink to="/tasks">
                                <Home />
                            </NavLink>
                        </li>
                        {user && (
                            <li>
                                <NavLink to="/tasks">
                                    < List />
                                </NavLink>
                            </li>
                        )}
                        {user && (
                            <li>
                                <NavLink to="/dashboard">
                                    <PieChart />
                                </NavLink>
                            </li>
                        )}
                        <li>
                            <NavLink to="/profile">
                                <User />
                            </NavLink>
                        </li>
                        <li>
                            <span onClick={handleLogout}>Sair</span>
                        </li>

                    </>
                ) : (
                    <>
                        <li>
                            <NavLink to="/login">Entrar</NavLink>
                        </li>
                        <li>
                            <NavLink to="/register">Cadastrar</NavLink>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
