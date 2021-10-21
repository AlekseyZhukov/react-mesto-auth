import React from "react";
import { Link } from "react-router-dom";


function Register(props) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onRegistration({ password, email });
    }
    return (
        <div className="login__container" >
            <form className="form" name='register' onSubmit={handleSubmit}>
                <h2 className="login__title">Регистрация</h2>
                <input type="email" className="login__input" id="register_email"
                    minLength="2" maxLength="40" name="register_email"
                    required placeholder="Email"
                    value={email} onChange={handleEmailChange} />
                <span className="form__input-error" id="email-error"></span>
                <input type="text" className="login__input" id="password"
                    minLength="2" maxLength="200" name="about"
                    required placeholder="Password"
                    value={password} onChange={handlePasswordChange} />
                <span className="form__input-error" id="password-error"></span>
                <button className="login__button" type="submit">Зарегистрироваться</button>
                <p className = "login__text">Уже зарегистрированы? <Link className="login__link" to="/sign-in">
            Войти
          </Link> </p>
            </form>
        </div>
    )
}

export default Register;