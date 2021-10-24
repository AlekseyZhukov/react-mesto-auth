import React from "react";
import PopupWithForm from "./PopupWithForm"


function EditAvatarPopup (props) {
    const avatarRef = React.useRef();
    function handleSubmit(e) {
        e.preventDefault();
      
        props.onUpdateAvatar({
          avatar: avatarRef.current.value
        });
      } 
    return (
      <PopupWithForm name="avatar"
      text ="Обновить аватар"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      btnText={props.isLoading ? "Сохранение..." : "Сохранить"}>
                    <input type="url" className="form__input" ref={avatarRef} id="avatar" name="avatar" required autoComplete="off" placeholder="Ссылка на картинку"/>
                    <span className="form__input-error" id="avatar-error"></span>
                 
   </PopupWithForm>
    
    )
}
export default EditAvatarPopup;