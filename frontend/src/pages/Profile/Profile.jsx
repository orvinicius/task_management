import styles from './Profile.module.css';

// Hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Redux
import { profile, updateProfile, resetMessage } from "../../slices/userSlice";

// Components
import Message from "../../components/Message";

const Profile = () => {
    const dispatch = useDispatch();

    const { user, message, error, loading } = useSelector((state) => state.user);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [_id, setId] = useState();

    // Load user data
    useEffect(() => {
        dispatch(profile());
    }, [dispatch]);

    // fill user form
    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setId(user._id)
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Gather user data from states
        const user = {
            name,
        };


        user.email = email;



        user.password = password;



        user._id = _id


        // build form data
        const formData = new FormData();

        const userFormData = Object.keys(user).forEach((key) =>
            formData.append(key, user[key])
        );

        formData.append("user", userFormData);

        await dispatch(updateProfile(formData));

        setTimeout(() => {
            dispatch(resetMessage());
        }, 2000);
    };

    return (
        <div className={styles.editProfile}>
            <h2>Edite seus dados</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nome"
                    onChange={(e) => setName(e.target.value)}
                    value={name || ""}
                />
                <label>
                    <input type="email" placeholder="E-mail" onChange={(e) => {
                        setEmail(e.target.value)
                        console.log(email)
                    }} value={email || ""} />
                </label>
                <label>
                    <span>Quer alterar sua senha?</span>
                    <input
                        type="password"
                        placeholder="Digite sua nova senha..."
                        onChange={(e) => setPassword(e.target.value)}
                        value={password || ""}
                    />
                </label>
                {!loading && <input type="submit" value="Atualizar" />}
                {loading && <input type="submit" disabled value="Aguarde..." />}
                {error && <Message msg={error} type="error" />}
                {message && <Message msg={message} type="success" />}
            </form>
        </div>
    );
};

export default Profile;
