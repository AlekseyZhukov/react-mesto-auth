import PopupWithForm from "./PopupWithForm"
function ConfirmPopup(props) {
    return (
        <PopupWithForm name="new-place"
            text="Вы уверены?"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={props.onSubmit}
            btnText={props.isLoading ? "Удаление..." : "Да"}>
        </PopupWithForm>

    )

}
export default ConfirmPopup