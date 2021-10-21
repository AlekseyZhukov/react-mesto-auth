import { Link, Switch, Route } from "react-router-dom";
function Header (props) {
    return (
        <header className="header">
        <div className="header__logo"></div>
        <Switch>
        <Route exact path="/">
          <div className="header__container">
            <p className="header__userEmail">{props.userEmail}</p>
            <Link
              className="header__link"
              onClick={props.onSingOut}
              to="/sign-in"
            >
              Выйти
            </Link>
          </div>
        </Route>
        <Route path="/sign-up">
          <Link className="header__link" to="/sign-in">
            Войти
          </Link>
        </Route>
        <Route path="/sign-in">
          <Link className="header__link" to="/sign-up">
            Регистрация
          </Link>
        </Route>
      </Switch>
    </header>
    )
}
export default Header