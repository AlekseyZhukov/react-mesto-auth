function Spinner (props) {
    return (
        <div className ={props.isLoading? "spinner spinner_visible" : "spinner"}></div>
    )
}
export default Spinner