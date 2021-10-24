import React from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from "./PopupWithForm"

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState(currentUser.name);
  const [description, setDescription] = React.useState(currentUser.about);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm name="edit"
      text="Редактировать профиль"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      btnText={props.isLoading ? "Сохранение..." : "Сохранить"}>
      <input type="text" value={name || ' '} onChange={handleChangeName} className="form__input" id="name" minLength="2" maxLength="40" name="name" required />
      <span className="form__input-error" id="name-error"></span>
      <input type="text" value={description || ' '} onChange={handleChangeDescription} className="form__input" id="job" minLength="2" maxLength="200" name="about" required />
      <span className="form__input-error" id="job-error"></span>
    </PopupWithForm>


  )
}
export default EditProfilePopup;