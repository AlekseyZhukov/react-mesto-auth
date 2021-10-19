function ConfirmPopup(props) {
    return (
        <div className={`popup popup_type_delete ${props.isOpen && 'popup_opened'}`}>
            <div className="popup__container">
                <button className="popup__close popup__close_avatar" type="button" onClick={props.onClose}></button>
                <form className="form" name="delete" onSubmit={props.onSubmit}>
                    <h2 className="form__title">Вы уверены?</h2>
                    <button className="form__save-button" type="submit">Да</button>
                </form>
            </div>
        </div>
    )

}
export default ConfirmPopup