import React from "react";
function Login(props) {
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
    props.handleLogin(password, email);
  }
    return (


        <div className="login__container" >
            <form className="form" name='login' onSubmit={handleSubmit}>
                <h2 className="login__title">Вход</h2>
                <input type="email" className="login__input" id="email" 
                minLength="2" maxLength="40" name="name" 
                required placeholder="Email"
                 value={email} onChange={handleEmailChange}/>
                <span className="form__input-error" id="email-error"></span>
                <input type="text" className="login__input" id="password"
                 minLength="2" maxLength="200" name="about"
                required placeholder="Password"
                 value={password} onChange={handlePasswordChange}/>
                <span className="form__input-error" id="password-error"></span>
                <button className="login__button" type="submit">Войти</button>
            </form>
        </div>


    )
}
export default Login;