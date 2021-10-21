import authOK from "../images/authOK.png";
import authNoOK from "../images/authNoOK.png";
function InfoToolTip (props) {
    return (
        <div className={`popup popup_type_infoTool ${props.isInfoToolTipOpen && 'popup_opened'}`}>
        <div className="popup__container">
            <button className="popup__close" type="button" onClick={props.onClose}></button>
            <div className="popup__auth-container" >
                <img src = {props.isRegistered ? authOK : authNoOK} className = "popup__auth-image" alt = "OK or not OK"/>
                <p className="popup__auth-text">{props.isRegistered
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}</p>
                
            </div>
        </div>
    </div>
    )
}
export default InfoToolTip