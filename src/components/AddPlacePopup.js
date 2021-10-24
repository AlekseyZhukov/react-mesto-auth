import React from "react";
import PopupWithForm from "./PopupWithForm"

function AddPlacePopup(props) {
    const [name, setNamePlace] = React.useState('');
    const [link, setLinkPlace] = React.useState('');

    function handleAddNamePlace(e) {
        setNamePlace(e.target.value);
    }

    function handleAddLinkPlace(e) {
        setLinkPlace(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace({
            name, link
        });
        setNamePlace("");
        setLinkPlace("");
    }

    return (
        <PopupWithForm name="new-place"
            text="Новое место"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            btnText={props.isLoading ? "Сохранение..." : "Создать"}>
            <input type="text" className="form__input" id="place" name="name"
                minLength="2" maxLength="30" required autoComplete="off"
                placeholder="Новое место" onChange={handleAddNamePlace} value={name || ''} />
            <span className="form__input-error" id="place-error"></span>
            <input type="url" className="form__input" id="link" name="link" 
            required autoComplete="off" placeholder="Ссылка на картинку" 
            onChange={handleAddLinkPlace} value={link || ''}/>
            <span className="form__input-error" id="link-error"></span>
        </PopupWithForm>
    );

}
export default AddPlacePopup;